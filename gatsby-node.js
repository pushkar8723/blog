const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const pageComponent = path.resolve(`./src/templates/page.js`);
  return graphql(
    `
        {
            blog: allMdx(
                filter: {fileAbsolutePath: {regex: "//blog//"}}
                sort: { fields: [frontmatter___date], order: DESC }
                limit: 1000
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            },
            page: allMdx(
                filter: {
                    fileAbsolutePath: {regex: "//page//"},
                    frontmatter: {parent: {eq: null}}
                },
                sort: { fields: [frontmatter___priority], order: DESC }
                limit: 1000
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            },
            subPage: allMdx(
                filter: {
                    fileAbsolutePath: {regex: "//page//"},
                    frontmatter: {parent: {ne: null}}
                
                },
                sort: { fields: [frontmatter___priority], order: DESC }
                limit: 1000
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            parent
                        }
                    }
                }
            }
        }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.blog.edges

    posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        createPage({
            path: `${post.node.fields.slug}`,
            component: blogPost,
            context: {
                slug: post.node.fields.slug,
                previous,
                next,
            },
        })
    });

    const pages = result.data.page.edges

    pages.forEach((page, index) => {
        const previous = index === pages.length - 1 ? null : pages[index + 1].node
        const next = index === 0 ? null : pages[index - 1].node

        createPage({
            path: `${page.node.fields.slug}`,
            component: pageComponent,
            context: {
                slug: page.node.fields.slug,
                previous,
                next
            },
        })
    });

    const subPages = result.data.subPage.edges

    subPages.forEach((page, index) => {
        let previous = index === subPages.length - 1 ? null : subPages[index + 1].node
        if (previous && previous.frontmatter.parent !== page.node.frontmatter.parent) {
            previous = null;
        }
        let next = index === 0 ? null : subPages[index - 1].node
        if (next && next.frontmatter.parent !== page.node.frontmatter.parent) {
            next = null;
        }

        createPage({
            path: `${page.node.fields.slug}`,
            component: pageComponent,
            context: {
                slug: page.node.fields.slug,
                previous,
                next
            },
        })
    });

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const page = path.resolve(`./src/templates/page.js`);
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
                filter: {fileAbsolutePath: {regex: "//page//"}}
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

    pages.forEach((post, index) => {

        createPage({
            path: `${post.node.fields.slug}`,
            component: page,
            context: {
                slug: post.node.fields.slug,
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

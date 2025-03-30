/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      blog: allMdx(
        filter: {internal: {contentFilePath: {regex: "//blog//"}}}
        sort: {frontmatter: {date: DESC}}
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
          internal {
            contentFilePath
          }
        }
      }
      page: allMdx(
        filter: {internal: {contentFilePath: {regex: "//page//"}}, frontmatter: {parent: {eq: null}}}
        sort: {frontmatter: {priority: DESC}}
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
          internal {
            contentFilePath
          }
        }
      }
      subPage: allMdx(
        filter: {internal: {contentFilePath: {regex: "//page//"}}, frontmatter: {parent: {ne: null}}}
        sort: {frontmatter: {priority: DESC}}
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
            parent
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.blog.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  const pages = result.data.page.nodes

  pages.forEach((page, index) => {
    const previous = index === pages.length - 1 ? null : pages[index + 1]
    const next = index === 0 ? null : pages[index - 1]

    console.log(pages);

    createPage({
      path: `${page.fields.slug}`,
      component: `${blogPost}?__contentFilePath=${page.internal.contentFilePath}`,
      context: {
        id: page.id,
        previousPostId: previous?.id,
        nextPostId: next?.id,
      },
    })
  });

  const subPages = result.data.subPage.nodes

  subPages.forEach((page, index) => {
    let previous = index === 0 ? null : subPages[index - 1]
    if (previous?.frontmatter.parent !== page.frontmatter.parent) {
      previous = null;
    }
    let next = index === subPages.length - 1 ? null : subPages[index + 1]
    if (next?.frontmatter.parent !== page.frontmatter.parent) {
        next = null;
    }

    createPage({
      path: `${page.fields.slug}`,
      component: `${blogPost}?__contentFilePath=${page.internal.contentFilePath}`,
      context: {
        id: page.id,
        previousPostId: previous?.id,
        nextPostId: next?.id,
      },
    })
  });
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      github: String
      parent: String
      priority: Int
    }

    type Fields {
      slug: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
    }
  `)
}

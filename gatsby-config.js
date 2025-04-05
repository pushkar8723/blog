/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Abstracted.in`,
    author: {
      name: `Pushkar Anand`,
      summary: `Passionate JS Developer.`,
    },
    description: `Life from the eyes of a JS dev.`,
    siteUrl: `https://abstracted.in/`,
    social: {
      twitter: `pushkar8723`,
      github: `pushkar8723`,
      linkedin: `in/pushkar8723`,
      instagram: `pushkar8723`,
      facebook: `pushkar8723`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.body }],
                })
              })
            },
            query: `{
              allMdx(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  body
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Abstracted.in RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
                className: 'anchor-link'
            }
          },
          {
            resolve: `gatsby-remark-twitter-cards`,
            options: {
              titleFontSize: 96,
              background: require.resolve('./content/assets/base.png'),
              fontColor: '#ffffff',
            },
          },
        ],
        mdxOptions: {
          remarkPlugins: [
            [require('gatsby-remark-vscode').remarkPlugin, {
              theme: {
                default: 'Default Light+',
                dark: 'Default Dark+'
              }
            }]
          ]
        }
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/page`,
        name: `page`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
          defaults: {
              formats: [`auto`, `webp`],
          },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Abstracted.in`,
        short_name: `Abstracted.in`,
        start_url: `/`,
        background_color: `#FFF4EC`,
        theme_color: `#007acc`,
        display: `standalone`,
        icon: `content/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              urlPattern: /(\.js$|\.css$|static\/)/,
              handler: `CacheFirst`,
            },
            {
              urlPattern: /^https?:.*\/page-data\/.*\.json$/,
              handler: `NetworkFirst`,
            },
            {
              urlPattern: /^https?:.*\.(json|png|jpg|jpeg|webp|svg|gif|tiff|bmp|ico|woff|woff2|eot|ttf|otf)$/,
              handler: `StaleWhileRevalidate`,
            },
          ],
        },
      },
    },
  ],
}

import React from 'react';
import { graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import PostLinks from '../components/PostLinks';

function BlogIndex({ data, location }) {
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const posts = data.blog.nodes;

    if (posts.length === 0) {
        return (
            <Layout location={location} title={siteTitle}>
                <Bio />
                <p>
                    No blog posts found. Add markdown posts to `content/blog`
                    (or the directory you specified for the
                    `gatsby-source-filesystem` plugin in gatsby-config.js).
                </p>
            </Layout>
        );
    }

    return (
        <Layout location={location} title={siteTitle}>
            <Bio />
            <PostLinks posts={posts} />
        </Layout>
    );
}

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export function Head() {
    return <Seo title="All posts" />;
}

export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                title
            }
        }
        blog: allMdx(
            sort: { frontmatter: { date: DESC } }
            filter: { internal: { contentFilePath: { regex: "//blog//" } } }
        ) {
            nodes {
                excerpt
                fields {
                    slug
                }
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    title
                    description
                }
            }
        }
    }
`;

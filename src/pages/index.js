import React from "react";
import { graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostLink from "../components/postLink";

class Blog extends React.Component {
    render() {
        const { data } = this.props;
        const siteTitle = data.site.siteMetadata.title;
        const posts = data.blog.edges;

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="All posts" />
                <Bio />
                <div style={{ margin: "20px 0 40px" }}>
                    {posts.map(PostLink)}
                </div>
            </Layout>
        )
    }
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
        siteMetadata {
            title
        }
    }
    blog: allMdx(
        sort: {
            fields: [frontmatter___date],
            order: DESC,
        },
        filter: {fileAbsolutePath: {regex: "//blog//"}}
    ) {
        edges {
            node {
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
    },
    page: allMdx(filter: {fileAbsolutePath: {regex: "//page//"}}, sort: {fields: [frontmatter___priority], order: ASC}) {
        edges {
            node {
                fields {
                    slug
                }
                frontmatter {
                    title
                    description
                }
            }
        }
    }
  }
`

import React from "react";
import { graphql } from "gatsby";
import PageTemplate from "../components/pageTemplate";

class Page extends React.Component {
    render() {
        const page = this.props.data.page;
        const siteTitle = this.props.data.site.siteMetadata.title
        const subpage = this.props.data.subpage.edges;
        const location = this.props.location;

        return (
            <PageTemplate
                {...{
                    page,
                    siteTitle,
                    subpage,
                    location
                }}
            />
        )
    }
}

export default Page;

export const pageQuery = graphql`
    query PageBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        page: mdx(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            body
            frontmatter {
                title
                description
            }
        }
        subpage: allMdx(filter: {frontmatter: {parent: {eq: $slug }}}) {
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

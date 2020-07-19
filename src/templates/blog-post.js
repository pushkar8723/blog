import React from "react";
import { graphql } from "gatsby";
import PageTemplate from "../components/pageTemplate";

class BlogPostTemplate extends React.Component {
  render() {
    const page = this.props.data.mdx;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next, slug } = this.props.pageContext;
    const location = this.props.location;

    return (
      <PageTemplate
        {...{
            page,
            siteTitle,
            previous,
            next,
            location,
            slug
        }}
      />
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`

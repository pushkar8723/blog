import * as React from "react"
import { MDXProvider } from '@mdx-js/react';
import { Link, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ExternalLink from "../components/ExternalLink"
import PostLinks from "../components/PostLinks"

const PageTemplate = ({
  data: { previous, next, site, mdx: post, subPage },
  children,
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div>{post.frontmatter.description || post.excerpt}</div>
          <div>{post.frontmatter.date}</div>
        </header>
        <section
          itemProp="articleBody"
        >
          <MDXProvider
              components={{
                  a: ExternalLink
              }}
            >
              {children}
            </MDXProvider>
            {subPage?.nodes.length > 0 && <PostLinks posts={subPage.nodes} />}
        </section>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <FontAwesomeIcon style={{ heigth: '16px', marginRight: '5px' }} icon={faChevronLeft} />
                {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title}
                <FontAwesomeIcon style={{ heigth: '16px', marginLeft: '5px' }} icon={faChevronRight} />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { mdx: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default PageTemplate;

export const pageQuery = graphql`
  query PageById($id: String!, $slug: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    mdx(id: {eq: $id}) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        github
      }
      tableOfContents
    }
    subPage: allMdx(
      filter: {frontmatter: {parent: {eq: $slug}}}
      sort:{
        frontmatter: {
          priority: DESC
        }
      }
    ) {
      nodes {
        id
        frontmatter {
          title
          description
          github
        }
        fields {
          slug
        }
      }
    }
    previous: mdx(id: {eq: $previousPostId}) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: {eq: $nextPostId}) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

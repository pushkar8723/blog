import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Link, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import ExternalLink from "../components/ExternalLink";
import TableOfContents from "../components/TableOfContents";

const ArticleBody = styled.section.attrs({
  itemProp: "articleBody",
})`
  margin-top: 30px;
`;

const DateContainer = styled.div`
  font-size: 12px;
  color: var(--color-text-light);
`;

const BlogPostTemplate = ({
  data: { previous, next, site, mdx: post },
  children,
  location,
  pageContext: { previousPostId, nextPostId },
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <TableOfContents items={post.tableOfContents.items}/>
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div>{post.frontmatter.description || post.excerpt}</div>
          <DateContainer>{post.frontmatter.date}</DateContainer>
        </header>
        <ArticleBody>
          <MDXProvider
              components={{
                  a: ExternalLink
              }}
            >
              {children}
            </MDXProvider>
        </ArticleBody>
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
            {previousPostId && (
              <Link to={previous.fields.slug} rel="prev">
                <FontAwesomeIcon style={{ height: '16px', marginRight: '5px' }} icon={faChevronLeft} />
                {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {nextPostId && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title}
                <FontAwesomeIcon style={{ height: '16px', marginLeft: '5px' }} icon={faChevronRight} />
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

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById($id: String!, $previousPostId: String, $nextPostId: String) {
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
      }
      tableOfContents
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

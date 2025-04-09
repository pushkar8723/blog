import * as React from "react";
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { Link, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ExternalLink from "../components/ExternalLink"
import PostLinks from "../components/PostLinks"

const ArticleBody = styled.section.attrs({
  itemProp: "articleBody",
})`
  margin-top: 30px;
`;

const PageTemplate = ({
  data: { previous, next, site, mdx: post, subPage },
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
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div>{post.frontmatter.description || post.excerpt}</div>
          <div>{post.frontmatter.date}</div>
        </header>
        <ArticleBody>
          <MDXProvider
              components={{
                  a: ExternalLink
              }}
            >
              {children}
            </MDXProvider>
            {subPage?.nodes.length > 0 && <PostLinks posts={subPage.nodes} />}
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

PageTemplate.propTypes = {
  data: PropTypes.shape({
    previous: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        date: PropTypes.string.isRequired,
      }),
    }),
    subPage: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
          }),
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }),
        })
      ),
    }),
  }).isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    previousPostId: PropTypes.string,
    nextPostId: PropTypes.string,
  }).isRequired,
};

export const Head = ({ data: { mdx: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

Head.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
      }),
    }),
  }).isRequired,
};

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

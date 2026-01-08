import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Link, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import ExternalLink from '../components/ExternalLink';
import TableOfContents from '../components/TableOfContents';

const ArticleBody = styled.section.attrs({
    itemProp: 'articleBody',
})`
    margin-top: 30px;

    & p + ol,
    & p + ul {
        margin-top: -20px;
    }

    & li {
        margin-bottom: 5px;
    }

    & li > ul,
    & li > ol {
        margin-top: 5px;
        margin-bottom: 20px;
    }

    & h1 svg,
    & h2 svg,
    & h3 svg,
    & h4 svg,
    & h5 svg,
    & h6 svg {
        fill: currentColor;
    }
`;

const DateContainer = styled.div`
    font-size: 12px;
    color: var(--color-text-light);
`;

function BlogPostTemplate({
    data: { previous, next, site, mdx: post },
    children,
    location,
    pageContext: { previousPostId, nextPostId },
}) {
    const siteTitle = site.siteMetadata?.title || `Title`;

    return (
        <Layout location={location} title={siteTitle}>
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                <TableOfContents items={post.tableOfContents.items} />
                <header>
                    <h1 itemProp="headline">{post.frontmatter.title}</h1>
                    <div>{post.frontmatter.description || post.excerpt}</div>
                    <DateContainer>{post.frontmatter.date}</DateContainer>
                </header>
                <ArticleBody>
                    <MDXProvider
                        components={{
                            a: ExternalLink,
                        }}
                    >
                        {children}
                    </MDXProvider>
                </ArticleBody>
                <hr />
                <footer>
                    <Bio />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <iframe
                            title="Subscribe to my blog"
                            src="https://pushkar8723.substack.com/embed"
                            width="480"
                            height="150"
                            style={{ border: 'none', borderRadius: '5px' }}
                        />
                    </div>
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
                                <FontAwesomeIcon
                                    style={{
                                        height: '16px',
                                        marginRight: '5px',
                                    }}
                                    icon={faChevronLeft}
                                />
                                {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {nextPostId && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title}
                                <FontAwesomeIcon
                                    style={{
                                        height: '16px',
                                        marginLeft: '5px',
                                    }}
                                    icon={faChevronRight}
                                />
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </Layout>
    );
}

export function Head({ data: { mdx: post, site }, location }) {
    const twitterCardImage = `${site.siteMetadata.siteUrl}${location.pathname}twitter-card.jpg`;

    return (
        <Seo
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
            twitterCard="summary_large_image"
            image={twitterCardImage}
        />
    );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostById(
        $id: String!
        $previousPostId: String
        $nextPostId: String
    ) {
        site {
            siteMetadata {
                title
                siteUrl
                author {
                    name
                }
            }
        }
        mdx(id: { eq: $id }) {
            id
            excerpt(pruneLength: 160)
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
            }
            tableOfContents
        }
        previous: mdx(id: { eq: $previousPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
        next: mdx(id: { eq: $nextPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
    }
`;

import * as React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link, StaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTwitter,
    faGithub,
    faLinkedinIn,
    faFacebook,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faRss } from '@fortawesome/free-solid-svg-icons';
import styled, { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line no-underscore-dangle
const __PATH_PREFIX__ = '';

const GlobalStyle = createGlobalStyle`
  img {
    max-width: 100%;
  }

  iframe {
    max-width: 100%;
  }

  p, li, h1, h2, h3, h4, h5, h6 {
    & code {
      background-color: var(--color-accent);
      border-radius: var(--spacing-1);
      padding: var(--spacing-0) var(--spacing-1);
    }
  }
  
  code {
    width: 100%;
  }

  pre {
    border: 1px solid var(--color-accent);
  }
`;

const HomeLink = styled.div`
    font-size: 24px;
    font-weight: 900;
    font-family: var(--font-heading);

    & > a {
        text-decoration: none;
    }
`;

const Navbar = styled.nav`
    display: flex;
    margin-bottom: 1rem;
    justify-content: center;
`;

const PageLink = styled.a`
    padding: 5px 0;
    margin-right: 15px;
    box-shadow: none;
`;

const Links = styled.div`
    flex: 1;
`;

const Footer = styled.footer`
    margin: 24px 0;
    display: flex;
`;

const Social = styled.div`
    flex: 1;

    & > a {
        text-decoration: none;
        box-shadow: none;
    }
`;

const pageQuery = graphql`
    query Pages {
        pages: allMdx(
            filter: {
                internal: { contentFilePath: { regex: "//page//" } }
                frontmatter: { parent: { eq: null } }
            }
            sort: { frontmatter: { priority: ASC } }
        ) {
            edges {
                node {
                    frontmatter {
                        title
                    }
                    fields {
                        slug
                    }
                    id
                }
            }
        }
        site {
            siteMetadata {
                social {
                    github
                    twitter
                    linkedin
                    facebook
                    instagram
                }
                siteUrl
            }
        }
    }
`;

function Layout({ location, title, children }) {
    const rootPath = `${__PATH_PREFIX__}/`;
    const isRootPath = location.pathname === rootPath;
    let header;

    if (isRootPath) {
        header = (
            <h1 className="main-heading">
                <Link to="/">{title}</Link>
            </h1>
        );
    } else {
        header = (
            <Link className="" to="/">
                {title}
            </Link>
        );
    }

    return (
        <StaticQuery
            query={pageQuery}
            render={data => {
                const { twitter, github, linkedin, facebook, instagram } =
                    data.site.siteMetadata.social;
                const pages = data.pages.edges;
                return (
                    <>
                        <GlobalStyle />
                        <Helmet>
                            {isRootPath ? (
                                <meta name="twitter:card" content="summary" />
                            ) : (
                                [
                                    <meta
                                        name="twitter:card"
                                        content="summary_large_image"
                                    />,
                                    <meta
                                        name="twitter:image:src"
                                        content={`${data.site.siteMetadata.siteUrl}${location.pathname}twitter-card.jpg`}
                                    />,
                                    <meta
                                        name="og:image"
                                        content={`${data.site.siteMetadata.siteUrl}${location.pathname}twitter-card.jpg`}
                                    />,
                                ]
                            )}
                        </Helmet>
                        <div
                            className="global-wrapper"
                            data-is-root-path={isRootPath}
                        >
                            <header className="global-header">
                                <HomeLink>{header}</HomeLink>
                                <Navbar>
                                    <Links>
                                        {pages.map(({ node }) => (
                                            <PageLink
                                                key={node.id}
                                                href={node.fields.slug}
                                            >
                                                {node.frontmatter.title}
                                            </PageLink>
                                        ))}
                                    </Links>
                                </Navbar>
                            </header>
                            <main>{children}</main>
                            <Footer>
                                <Social>
                                    {facebook && (
                                        <>
                                            <a
                                                href={`https://facebook.com/${facebook}`}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faFacebook}
                                                    style={{
                                                        width: '16px',
                                                        height: '16px',
                                                    }}
                                                />
                                            </a>
                                            {' | '}
                                        </>
                                    )}
                                    {instagram && (
                                        <>
                                            <a
                                                href={`https://instagram.com/${instagram}`}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faInstagram}
                                                    style={{
                                                        width: '16px',
                                                        height: '16px',
                                                    }}
                                                />
                                            </a>
                                            {' | '}
                                        </>
                                    )}
                                    {twitter && (
                                        <>
                                            <a
                                                href={`https://twitter.com/${twitter}`}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTwitter}
                                                    style={{
                                                        width: '16px',
                                                        height: '16px',
                                                    }}
                                                />
                                            </a>
                                            {' | '}
                                        </>
                                    )}
                                    {github && (
                                        <>
                                            <a
                                                href={`https://github.com/${github}`}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faGithub}
                                                    style={{
                                                        width: '16px',
                                                        height: '16px',
                                                    }}
                                                />
                                            </a>
                                            {' | '}
                                        </>
                                    )}
                                    {linkedin && (
                                        <>
                                            <a
                                                href={`https://www.linkedin.com/${linkedin}`}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faLinkedinIn}
                                                    style={{
                                                        width: '16px',
                                                        height: '16px',
                                                    }}
                                                />
                                            </a>
                                            {' | '}
                                        </>
                                    )}
                                    <a href="/rss.xml">
                                        <FontAwesomeIcon
                                            icon={faRss}
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                            }}
                                        />
                                    </a>
                                </Social>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faCopyright}
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                        }}
                                    />{' '}
                                    {new Date().getFullYear()}
                                </div>
                            </Footer>
                        </div>
                    </>
                );
            }}
        />
    );
}

Layout.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Layout;

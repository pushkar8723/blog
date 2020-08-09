import React from "react";
import { Link } from "gatsby";
import styled, { createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faRss } from '@fortawesome/free-solid-svg-icons';
import { StaticQuery, graphql } from "gatsby";
import { rhythm } from "../utils/typography";
import Toggle from "../components/toggle";

const GlobalStyles = createGlobalStyle`
    html {
        scroll-behavior: smooth;
    }

    code {
        color: var(--link-color);
        font-size: 1rem;
    }

    .anchor-link {
        box-shadow: none;
        margin-left: -20px;
        margin-right: 4px;
    }

    .anchor-link svg {
        fill: var(--primary-color);
    }

    blockquote {
        color: var(--bockquote-color);
        border-left: var(--bockquote-border);

        & a {
            color: var(--bockquote-color);
        }
    }

    .task-list-item {
        list-style: none;
    }

    .vscode-highlight-line-highlighted {
        background-color: rgba(192, 192, 192, 0.05) !important;
    }
`;

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Footer = styled.footer`
    margin: 24px;
    display: flex;
`;

const Social = styled.div`
    flex: 1;

    & > a {
        text-decoration: none;
        box-shadow: none;
    }
`;

const PageLink = styled.a`
    padding: 5px 0;
    margin-right: 15px;
    box-shadow: none;
`;

const Navbar = styled.nav`
    margin-top: -1.5rem;
    display: flex;
    margin-bottom: 1rem;
    justify-content: center;
`;

const Links = styled.div`
    flex: 1;
`;

const ToggleContainer = styled.div`
    display: flex;
    align-items: center;
`;

const pageQuery = graphql`
    query Pages {
        pages: allMdx(
            filter: {fileAbsolutePath: {regex: "//page//"},
            frontmatter: {parent: {eq: null}}}
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
                }
            }
        }
    }
`;

function Layout(props) {
    const { location, title, children } = props;
    const rootPath = `${__PATH_PREFIX__}/`;
    const blogPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath || location.pathname === blogPath) {
        header = (
            <h1
                style={{
                    marginBottom: rhythm(1.2),
                    marginTop: 0,
                }}
            >
                <Link
                    style={{
                        boxShadow: `none`,
                        textDecoration: `none`,
                        color: `inherit`,
                    }}
                    to='/'
                >
                    {title}
                </Link>
            </h1>
        )
    } else {
        header = (
            <h3
                style={{
                    fontFamily: `Montserrat, sans-serif`,
                    marginTop: 0,
                }}
            >
                <Link
                    style={{
                        boxShadow: `none`,
                        textDecoration: `none`,
                        color: `inherit`,
                    }}
                    to='/'
                >
                    {title}
                </Link>
            </h3>
        )
    }
    return (
        <StaticQuery
            query={pageQuery}
            render={data => {
                const { twitter, github } = data.site.siteMetadata.social;
                const pages = data.pages.edges;
                const width = rhythm(30);
                return (
                    <>
                    <GlobalStyles />
                    <Wrapper>
                        <div
                            style={{
                                marginLeft: `auto`,
                                marginRight: `auto`,
                                width,
                                maxWidth: '100%',
                                padding: `${rhythm(4 / 4)}`,
                                flex: 1
                            }}
                        >
                            <header>{header}</header>
                            <Navbar>
                                <Links>
                                {
                                    pages.map(({ node }) => (
                                        <PageLink
                                            key={node.id}
                                            href={node.fields.slug}
                                        >
                                            {node.frontmatter.title}
                                        </PageLink>
                                    ))
                                }
                                </Links>
                                <ToggleContainer><Toggle /></ToggleContainer>
                            </Navbar>
                            <main>{children}</main>
                        </div>
                        <Footer
                            style={{
                                marginLeft: `auto`,
                                marginRight: `auto`,
                                width,
                                maxWidth: '100%',
                                padding: `0 ${rhythm(4 / 4)}`,
                            }}
                        >
                            <Social>
                                <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer noopener">
                                    <FontAwesomeIcon icon={faTwitter} style={{ width: '16px', height: '16px' }} /> Twitter
                                </a>{` | `}
                                <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer noopener">
                                    <FontAwesomeIcon icon={faGithub} style={{ width: '16px', height: '16px' }} /> Github
                                </a>{` | `}
                                <a href="/rss.xml">
                                    <FontAwesomeIcon icon={faRss} style={{ width: '16px', height: '16px' }} /> RSS
                                </a>
                            </Social>
                            <div>
                                <FontAwesomeIcon icon={faCopyright} style={{ width: '16px', height: '16px' }} /> {new Date().getFullYear()}
                            </div>
                        </Footer>
                    </Wrapper>
                    </>
                );
            }}
        >
        </StaticQuery>
    );
}

export default Layout

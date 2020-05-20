import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { StaticQuery, graphql } from "gatsby";
import { rhythm, scale } from "../utils/typography";

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

const footerQuery = graphql`
    query FooterQuery {
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
                    ...scale(1.2),
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
            query={footerQuery}
            render={data => {
                const { twitter, github } = data.site.siteMetadata.social;
                return (
                    <Wrapper>
                        <div
                            style={{
                                marginLeft: `auto`,
                                marginRight: `auto`,
                                width: rhythm(24),
                                maxWidth: '100%',
                                padding: `${rhythm(3 / 4)}`,
                                flex: 1
                            }}
                        >
                            <header>{header}</header>
                            <main>{children}</main>
                        </div>
                        <Footer
                            style={{
                                marginLeft: `auto`,
                                marginRight: `auto`,
                                width: rhythm(24),
                                maxWidth: '100%',
                                padding: `0 ${rhythm(3 / 4)}`,
                            }}
                        >
                            <Social>
                                <a href={`https://twitter.com/${twitter}`}>
                                    <FontAwesomeIcon icon={faTwitter} /> Twitter
                                </a>{` | `}
                                <a href={`https://github.com/${github}`}>
                                    <FontAwesomeIcon icon={faGithub} /> Github
                                </a>
                            </Social>
                            <div>
                                <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()}
                            </div>
                        </Footer>
                    </Wrapper>
                );
            }}
        >
        </StaticQuery>
    );
}

export default Layout

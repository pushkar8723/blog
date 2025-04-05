import * as React from "react";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faRss } from '@fortawesome/free-solid-svg-icons';
import styled, { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  img {
    max-width: 100%;
  }

  iframe {
    max-width: 100%;
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
    pages: allMdx(filter: {internal: { contentFilePath: {regex: "//page//"} }, frontmatter: {parent: {eq: null}}}) {
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
        }
      }
    }
  }
`;

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="" to="/">
        {title}
      </Link>
    )
  }

  return (
    <StaticQuery
      query={pageQuery}
      render={data => {
        const { twitter, github, linkedin } = data.site.siteMetadata.social;
        const pages = data.pages.edges;
        return (
          <>
            <GlobalStyle />
            <Helmet>
              {
                isRootPath ?
                <meta name="twitter:card" content="summary" />
              : (
                [
                  <meta name="twitter:card" content="summary_large_image" />,
                  <meta
                    name="twitter:image"
                    content={`${location.pathname}twitter-card.jpg`}
                  />,
                  <meta
                    name="og:image"
                    content={`${location.pathname}twitter-card.jpg`}
                  />
                ]  
              )}
            </Helmet>
            <div className="global-wrapper" data-is-root-path={isRootPath}>
              <header className="global-header">
                <HomeLink>{header}</HomeLink>
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
              </Navbar>
              </header>
              <main>{children}</main>
              <Footer>
                <Social>
                  <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer noopener">
                    <FontAwesomeIcon icon={faTwitter} style={{ width: '16px', height: '16px' }} />
                  </a>{` | `}
                  <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer noopener">
                    <FontAwesomeIcon icon={faGithub} style={{ width: '16px', height: '16px' }} />
                  </a>{` | `}
                  <a href={`https://www.linkedin.com/${linkedin}`} target="_blank" rel="noreferrer noopener">
                    <FontAwesomeIcon icon={faLinkedinIn} style={{ width: '16px', height: '16px' }} />
                  </a>{` | `}
                  <a href="/rss.xml">
                    <FontAwesomeIcon icon={faRss} style={{ width: '16px', height: '16px' }} />
                  </a>
                </Social>
                <div>
                  <FontAwesomeIcon icon={faCopyright} style={{ width: '16px', height: '16px' }} /> {new Date().getFullYear()}
                </div>
              </Footer>
            </div>
          </>
        );
      }}
    />
  )
}

export default Layout

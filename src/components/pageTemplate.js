import React from 'react';
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostLink from "../components/postLink";
import TableOfContent from '../components/TableOfContent';
import { rhythm, scale } from "../utils/typography";
import styled from 'styled-components';
import GithubBtns from '../components/githbubBtns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SubPostContainer = styled.div`
    margin-bottom: 1.45rem;
`;

const PageNav = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const NavLink = styled.li`
    flex: 1;
    display: flex;
    align-items: center;

    & a {
        box-shadow: none;
    }
`;

const PageTemplate = ({ location, siteTitle, page, subpage, previous, next, slug }) => {
    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={page.frontmatter.title}
                description={page.frontmatter.description || page.excerpt}
                slug={slug}
            />
            <TableOfContent items={page.tableOfContents.items} />
            <h1>{page.frontmatter.title}</h1>
            <div
                style={{
                    marginTop: rhythm(-1),
                }}
            >
                {page.frontmatter.description || page.excerpt}
            </div>
            {page.frontmatter.github && <GithubBtns repo={page.frontmatter.github} />}
            <p
                style={{
                    ...scale(-1 / 5),
                    display: `block`,
                    marginBottom: rhythm(1),
                }}
            >
                {page.frontmatter.date}
            </p>
            <MDXRenderer>{page.body}</MDXRenderer>
            <SubPostContainer>
                {subpage && subpage.map(PostLink)}
            </SubPostContainer>
            <hr
                style={{
                    marginBottom: rhythm(1),
                }}
            />
            <Bio />
            <PageNav>
                <NavLink>
                    {previous && (
                        <>
                        <FontAwesomeIcon style={{ heigth: '16px', marginRight: '5px' }} icon={faChevronLeft} />
                        <Link to={`${previous.fields.slug}`} rel="prev">
                            {previous.frontmatter.title}
                        </Link>
                        </>
                    )}
                </NavLink>
                <NavLink style={{ textAlign: 'right', justifyContent: 'flex-end' }}>
                    {next && (
                        <>
                        <Link to={`${next.fields.slug}`} rel="next">
                            {next.frontmatter.title}
                        </Link>
                        <FontAwesomeIcon style={{ heigth: '16px', marginLeft: '5px' }} icon={faChevronRight} />
                        </>
                    )}
                </NavLink>
            </PageNav>
        </Layout>
    )
}

export default PageTemplate;

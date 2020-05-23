import React from 'react';
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostLink from "../components/postLink";
import { rhythm, scale } from "../utils/typography";
import styled from 'styled-components';
import GithubBtns from '../components/githbubBtns';

const SubPostContainer = styled.div`
    margin-bottom: 1.45rem;
`;

const PageTemplate = ({ location, siteTitle, page, subpage, previous, next }) => {
    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={page.frontmatter.title}
                description={page.frontmatter.description || page.excerpt}
            />
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
                        <Link to={`${previous.fields.slug}`} rel="prev">
                            ← {previous.frontmatter.title}
                        </Link>
                    )}
                </li>
                <li>
                    {next && (
                        <Link to={`${next.fields.slug}`} rel="next">
                            {next.frontmatter.title} →
                        </Link>
                    )}
                </li>
            </ul>
        </Layout>
    )
}

export default PageTemplate;

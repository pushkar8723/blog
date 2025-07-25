import React from 'react';
import { Link } from "gatsby";
import { rhythm } from "../utils/typography";
import GithubBtns from '../components/githbubBtns';

const PostLink = ({ node }) => {
    const title = node.frontmatter.title || node.fields.slug
    return (
        <article key={node.fields.slug}>
            <h3
                style={{
                    marginBottom: rhythm(1 / 4),
                }}
            >
            <Link
                style={{ boxShadow: `none` }}
                to={`${node.fields.slug}`}
            >
                {title}
            </Link>
            </h3>
            <div
                dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                }}
            />
            {node.frontmatter.date && <small>{node.frontmatter.date}</small>}
            {node.frontmatter.github && <GithubBtns repo={node.frontmatter.github} />}
        </article>
    )
}

export default PostLink;

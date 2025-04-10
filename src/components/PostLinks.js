import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import StarButton from 'octo-buttons/lib/components/StarButton';

export default function PostLinks(props) {
    const { posts } = props;

    return (
        <ol style={{ listStyle: 'none' }}>
            {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug;

                return (
                    <li key={post.fields.slug}>
                        <article
                            className="post-list-item"
                            itemScope
                            itemType="http://schema.org/Article"
                        >
                            <header>
                                <h2>
                                    <Link to={post.fields.slug} itemProp="url">
                                        <span itemProp="headline">{title}</span>
                                    </Link>
                                </h2>
                                <div>
                                    {post.frontmatter.description ||
                                        post.excerpt}
                                </div>
                                <small>{post.frontmatter.date}</small>
                                {post.frontmatter.github && (
                                    <StarButton
                                        repo={post.frontmatter.github}
                                    />
                                )}
                            </header>
                        </article>
                    </li>
                );
            })}
        </ol>
    );
}

PostLinks.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            frontmatter: PropTypes.shape({
                title: PropTypes.string.isRequired,
                description: PropTypes.string,
                date: PropTypes.string.isRequired,
                github: PropTypes.string,
            }),
            fields: PropTypes.shape({
                slug: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,
};

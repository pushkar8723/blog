/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

function Seo({ description, title, children, twitterCard = 'summary', image }) {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    siteUrl
                    social {
                        twitter
                    }
                }
            }
        }
    `);

    const metaDescription = description || site.siteMetadata.description;
    const defaultTitle = site.siteMetadata?.title;

    return (
        <>
            <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
            <meta name="description" content={metaDescription} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content={twitterCard} />
            <meta
                name="twitter:creator"
                content={site.siteMetadata?.social?.twitter || ``}
            />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />
            {image && (
                <>
                    <meta name="twitter:image:src" content={image} />
                    <meta property="og:image" content={image} />
                </>
            )}
            {children}
        </>
    );
}

export default Seo;

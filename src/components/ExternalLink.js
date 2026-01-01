import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

export default function ExternalLink(props) {
    const { href, children, ...rest } = props;
    if (href.startsWith('/')) {
        return (
            <Link to={href} {...rest}>
                {children}
            </Link>
        );
    }
    return (
        <a href={href} {...rest} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
}

ExternalLink.propTypes = {
    href: PropTypes.string.isRequired,
};

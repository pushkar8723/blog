import React from 'react';
import PropTypes from 'prop-types';

export default function ExternalLink(props) {
    if (props.href.includes(window.location.host)) {
        return <a {...props} />;
    }
    return <a {...props} target="_blank" rel="noopener noreferrer"/>;
}

ExternalLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

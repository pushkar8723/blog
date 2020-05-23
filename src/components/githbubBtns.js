import React from 'react';
import GitHubButton from 'react-github-btn';

const GithubBtns = ({ repo }) => {
    return (
        <>
        <GitHubButton
            href={`https://github.com/${repo}`}
            data-color-scheme="no-preference: light; light: dark; dark: light;"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label={`Star ${repo} on GitHub`}
        >
            Star
        </GitHubButton>
        {` `}
        <GitHubButton
            href={`https://github.com/${repo}/fork`}
            data-color-scheme="no-preference: light; light: dark; dark: light;"
            data-icon="octicon-repo-forked"
            data-show-count="true"
            aria-label={`Fork ${repo} on GitHub`}
        >
            Fork
        </GitHubButton>
        </>
    );
}

export default GithubBtns;

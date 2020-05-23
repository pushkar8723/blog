import React from 'react';

const MagicScriptTag = () => {
    const codeToRunOnClient = `
        (function() {
            const theme = localStorage.getItem('theme');
            window.__darkTheme = theme
                ? theme === 'dark'
                : window.matchMedia('(prefers-color-scheme: dark)').matches
            const root = window.document.documentElement;
            if (window.__darkTheme) {
                root.style.setProperty('--background-color', "#31313c");
                root.style.setProperty('--primary-color', "#FFF4EC");
                root.style.setProperty('--link-color', "#64baff");
            } else {
                root.style.setProperty('--background-color', "#FFF4EC");
                root.style.setProperty('--primary-color', "hsla(0,0%,0%,0.9)");
                root.style.setProperty('--link-color', "#1a73af");
            }
        })()
    `;
    // eslint-disable-next-line react/no-danger
    return (
        <script
            dangerouslySetInnerHTML={{ __html: codeToRunOnClient }}
        />
    );
};

export const onRenderBody = ({ setPreBodyComponents }) => {
    setPreBodyComponents(<MagicScriptTag />);
};  
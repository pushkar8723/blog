import React from 'react';

const MagicScriptTag = () => {
    const codeToRunOnClient = `
        window.__setDarkTheme = function() {
            const root = window.document.documentElement;
            root.style.setProperty('--background-color', "#31313c");
            root.style.setProperty('--primary-color', "#FFF4EC");
            root.style.setProperty('--link-color', "#64baff");
            root.style.setProperty('--bockquote-border', "0.3rem solid #8b8b90");
            root.style.setProperty('--bockquote-color', "#8b8b90");
        };

        window.__setLightTheme = function() {
            const root = window.document.documentElement;
            root.style.setProperty('--background-color', "#FFF4EC");
            root.style.setProperty('--primary-color', "hsla(0,0%,0%,0.9)");
            root.style.setProperty('--link-color', "#1a73af");
            root.style.setProperty('--bockquote-border', "0.3rem solid #898480");
            root.style.setProperty('--bockquote-color', "#898480");
        };

        (function() {
            const theme = localStorage.getItem('theme');
            window.__darkTheme = theme
                ? theme === 'dark'
                : window.matchMedia('(prefers-color-scheme: dark)').matches
            if (window.__darkTheme) {
                window.__setDarkTheme();
            } else {
                window.__setLightTheme();
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
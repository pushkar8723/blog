import React from 'react';

const MagicScriptTag = () => {
    const codeToRunOnClient = `
        window.__setDarkTheme = function() {
            const root = window.document.documentElement;
            root.style.setProperty('--background-color', "#31313c");
            root.style.setProperty('--primary-color', "#FFF4EC");
            root.style.setProperty('--link-color', "#64baff");
            root.style.setProperty('--bockquote-border', "0.3rem solid rgba(255, 255, 255, 0.5)");
            root.style.setProperty('--bockquote-color', "rgba(255, 255, 255, 0.4)");
        };

        window.__setLightTheme = function() {
            const root = window.document.documentElement;
            root.style.setProperty('--background-color', "#FFF4EC");
            root.style.setProperty('--primary-color', "hsla(0,0%,0%,0.9)");
            root.style.setProperty('--link-color', "#1a73af");
            root.style.setProperty('--bockquote-border', "0.3rem solid rgba(0, 0, 0, 0.6)");
            root.style.setProperty('--bockquote-color', "rgba(0, 0, 0, 0.5)");
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
import Typography from "typography";
import Wordpress2016 from "typography-theme-wordpress-2016";

export const isDarkTheme = () => {
    const theme = localStorage.getItem('theme');
    return theme
        ? theme === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const getTheme = () => {
    if (isDarkTheme()) {
        return {
            "html": {
                overflow: "auto",
            },
            "body": {
                backgroundColor: "#31313c",
                color: "#FFF4EC",
                transition: "background-color 0.4s ease",
            },
            "a": {
                color: "#64baff",
            },
            "a.gatsby-resp-image-link": {
                boxShadow: `none`,
            },
            "hr": {
                backgroundColor: "#FFF4EC",
            }
        }
    }
    return {
        "html": {
            overflow: "auto",
        },
        "body": {
            backgroundColor: "#FFF4EC",
            transition: "background-color 0.4s ease",
        },
        "a.gatsby-resp-image-link": {
            boxShadow: `none`,
        },
    }
}

Wordpress2016.overrideThemeStyles = () => {
    return getTheme();
}

delete Wordpress2016.googleFonts;

const typography = new Typography();

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
    typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

export const resetTheme = () => {
    const typography = new Typography(Wordpress2016);
    typography.injectStyles();
}

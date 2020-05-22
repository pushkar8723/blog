import Typography from "typography";
import Wordpress2016 from "typography-theme-wordpress-2016";

const getTheme = () => {
    return {
        "html": {
            overflow: "auto",
        },
        "body": {
            backgroundColor: "var(--background-color)",
            color: "var(--primary-color)",
            transition: "background-color 0.4s ease",
        },
        "a": {
            color: "var(--link-color)",
        },
        "a.gatsby-resp-image-link": {
            boxShadow: `none`,
        },
        "hr": {
            backgroundColor: "var(--primary-color)",
        }
    }
}

Wordpress2016.overrideThemeStyles = () => {
    return getTheme();
}

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
    typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

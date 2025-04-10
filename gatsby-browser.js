// custom typefaces
import '@fontsource-variable/montserrat';
import '@fontsource/merriweather';
// normalize CSS across browsers
import './src/normalize.css';
// custom CSS styles
import './src/style.css';

// Highlighting for code blocks
import 'prismjs/themes/prism.css';

export const onServiceWorkerUpdateReady = () => {
    // eslint-disable-next-line no-alert
    const answer = window.confirm(
        'This site has been updated. Reload to display the latest version?'
    );
    if (answer === true) {
        window.location.reload();
    }
};

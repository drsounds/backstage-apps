import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { stitchAppBridge } from 'backstage-stitch-app-bridge';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        // Notify parent about navigation
        const handleRouteChange = (url) => {
            // Remove the leading slash as the bridge might expect relative or we handle it
            // Actually, let's send the full path and let parent decide
            stitchAppBridge.navigate(url);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        // Listen for params from parent
        stitchAppBridge.on('params', (data) => {
            if (data.params) {
                // Check if we need to navigate
                // This is tricky because params might map to a route
                // For now, let's assume params[0] is the sub-path
                // e.g. /app/testapp/foo -> params=['foo'] -> /foo
                const newPath = '/' + (data.params.join('/') || '');
                if (router.asPath !== newPath) {
                    router.replace(newPath);
                }
            }
        });

        // Notify ready
        stitchAppBridge.ready();

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;

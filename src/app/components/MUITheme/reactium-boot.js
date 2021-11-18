import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import op from 'object-path';

/**
 *
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&family=Rubik:wght@300;400;500&display=swap" rel="stylesheet"></link>
 */

ReactiumBoot.Hook.registerSync(
    'Server.AppStyleSheets',
    (req, AppStyleSheets) => {
        AppStyleSheets.register('GoogleFontsAPI', {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
        });
        AppStyleSheets.register('GoogleFontsGstatic', {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: 'anonymous',
        });
        AppStyleSheets.register('GoogleFonts', {
            rel: 'stylesheet',
            href:
                'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&family=Rubik:wght@300;400;500&display=swap',
        });
    },
    ReactiumBoot.Enums.priority.high,
    'GOOGLE_FONTS_LINK',
);

ReactiumBoot.Hook.register(
    'ssr-before-render',
    async ({ data, route, req }) => {
        const value = (req.cache = createCache({ key: 'css' }));
        req.emotionServer = createEmotionServer(req.cache);

        ReactiumBoot.AppContext.register(
            'EmotionCacheProvider',
            {
                provider: CacheProvider,
                value,
            },
            ReactiumBoot.Enums.priority.lowest,
        );
    },
);

ReactiumBoot.Hook.register(
    'ssr-after-render',
    async ({ data, route, req }) => {
        const { extractCriticalToChunks, constructStyleTagsFromChunks } = req.emotionServer;
        const styles = constructStyleTagsFromChunks(extractCriticalToChunks(req.content))
        req.styles = styles + req.styles;
    },
);

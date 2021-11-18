/**
 * -----------------------------------------------------------------------------
 * Reactium Plugin MuiTest
 * -----------------------------------------------------------------------------
 */

import Component from './index';
import Reactium from 'reactium-core/sdk';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

(async () => {
    await Reactium.Plugin.register('MUI-Theme');

    await Reactium.Hook.register('app-context-provider', async () => {
        const theme = createTheme({
            palette: {
                primary: {
                    // Purple and green play nicely together.
                    main: purple[500],
                },
                secondary: {
                    // This is green.A700 as hex.
                    main: '#11cb5f',
                },
            },
        });

        Reactium.AppContext.register('ThemeProvider', {
            provider: ThemeProvider,
            theme,
        });
    })

    Reactium.Component.register('MuiTest', Component);
})();

// Reactium.Plugin.unregister('MUI-Theme')

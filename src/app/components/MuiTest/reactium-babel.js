try {
    if (require.resolve('@emotion/babel-plugin')) {
        ReactiumBabel.Hook.registerSync('plugins', Plugins => {
            Plugins.register('@emotion', {
                plugin: [
                    '@emotion',
                ],
                envs: ['default', 'test', 'library'],
                order: ReactiumBabel.Enums.priority.highest,
            });
        });
    }
} catch (error) {
    WARN('Skipping load of @emotion/babel-plugin. Not found.');
}

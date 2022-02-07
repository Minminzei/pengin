module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'relay',
      'macros',
      [
        'module-resolver',
        {
          'root': ['./src'],
          'alias': {
            '@components': './src/components',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@hooks': './src/hooks',
            '@lib': './src/lib',
            '@constants': './src/constants',
          },
        },
      ],
    ],
  };
};
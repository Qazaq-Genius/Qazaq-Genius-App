module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  safelist: [
    {
      pattern: /bg-(highlight)-*/
    },
  ],
  media: 'media',
  theme: {
    extend: {
      colors: {
        'highlight-green':        '#d7ff63',
        'highlight-pink':         '#ffacd6',
        'highlight-blue':         '#aedef8',
        'highlight-yellow':       '#ffff4f',
        'highlight-dark-yellow':  '#ffff0077',
        'background':             '#90B9D7'
      },
      margin: {
        '30%':   '30%',
        '25%':   '25%',
        '12.5%': '12.5%',
        '5%':    '5%',
        '0.5%':  '0.5%',
      },
      fontSize: {
        '75xl': ['5.25rem', '1'],
        '77xl': ['5.5rem', '1'],
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

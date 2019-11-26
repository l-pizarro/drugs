module.exports = {
  theme: {
    extend: {
      colors: {
        scroll: {
          '100': '#F2F5F7'
        }
      },
      padding: {
        '7': '1.75rem'
      },
      width: {
        '60': '15rem',
        '80': '20rem',
        'elements': 'calc(100vw - 608px)',
        // the following widths are only for the element's table on de the medicine's section
        'm33': '33%',
        'm21': '21%',
        'm37': '37%',
        'm9': '9%'
      },
      height: {
        '30': '7.5rem',
        'isp': '49px',
        'scroll': 'calc(100vh - 180px)',
      },
      fontSize: {
        'big': '1.626rem'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
    fontFamily: ['responsive', 'hover', 'focus'],
  },
  plugins: []
}

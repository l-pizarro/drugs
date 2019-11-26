module.exports = {
  theme: {
    screens: {
      'sm': {'min': '640px'},
      'md': {'min': '768px'},
      'lg': {'min': '1024px'},
      'xl': {'min': '1280px'},
      'xxl': {'min': '1440px'},
      'xxxl': {'min': '1680px'},
      'XXl': {'min': '1920px'},
    },
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

        // 1440px
        'm1': '260px',
        'm2': '205px',
        'm3': '311px',
        'm4': '56px',

        // 1680px
        'm5': '240px',

      },
      height: {
        '30': '7.5rem',
        'isp': '49px',
        'scroll': 'calc(100vh - 164px)',
        'scroll2': 'calc(100vh - 187px)',
        'scroll3': 'calc(100vh - 228px)',
        // the following widths are only for the element's table on de the medicine's section
        'elements': 'calc(100vh - 260px)',
        'elements2': 'calc(100vh - 274px)',
        'elements3': 'calc(100vh - 296px)'
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

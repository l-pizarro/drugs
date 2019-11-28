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
        },
        bar: {
          '100': '#F587B3',
          '200': '#E08BBF',
          '300': '#D38EC7',
          '400': '#C390D0',
          '500': '#B592D7',
          '600': '#A595E0',
          '700': '#9698E9',
          '800': '#869AF1',
        }
      },
      margin: {
        '7': '1.75rem',
        '18': '4.5rem'
      },
      padding: {
        '7': '1.75rem',
        '11': '2.75rem',
        '18': '4.5rem'
      },
      width: {
        '60': '15rem',
        '80': '20rem',
        'elements': 'calc(100vw - 608px)',
        'alert': 'calc(100vw - 240px)',
        // the following widths are only for the element's table on de the medicine's section
        // 1440px
        'm1': '260px',
        'm2': '205px',
        'm3': '311px',
        'm4': '56px',
        // 1680px
        'm5': '240px',

        // the following widths are only for the element's table on de the alert's section
        'a1': '280px',
        'a2': '211px',
        'a3': '218px',

        // the following widths are only for the status bars on de the alert's section
        's1': '20px',
        's2': '34px',
        's3': '49px',
        's4': '68px',
        's5': '93px',
        's6': '125px',
        's7': '166px',
        's8': '210px',
      },
      height: {
        '30': '7.5rem',
        'isp': '54px',
        'isp2': '54px',
        'scroll': 'calc(100vh - 164px)',
        'scroll2': 'calc(100vh - 187px)',
        'scroll3': 'calc(100vh - 228px)',

        // the following widths are only for the element's table on de the medicine's section
        'elements': 'calc(100vh - 260px)',
        'elements2': 'calc(100vh - 274px)',
        'elements3': 'calc(100vh - 296px)',

        // the following widths are only for the element's table on de the alert's section
        'alert': 'calc(100vh - 300px)',
        'alert2': 'calc(100vh - 338px)',
        'alert3': 'calc(100vh - 300px)',


      },
      fontSize: {
        'big': '1.626rem',
        'tall': '2rem'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
    fontFamily: ['responsive', 'hover', 'focus'],
  },
  plugins: []
}

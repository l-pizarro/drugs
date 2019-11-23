module.exports = {
  theme: {
    extend: {
      colors: {
        scroll: {
          '100': '#F2F5F7'
        }
      },
      width: {
        '60': '15rem',
        '80': '20rem',
      },
      height: {
        'scroll': 'calc(100vh - 180px)'
      },
      fontSize: {
        
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
    fontFamily: ['responsive', 'hover', 'focus'],
  },
  plugins: []
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '53': 'repeat(53, minmax(0, 1fr))'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        // 'wiggle': 'wiggle 1s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s ease-in-out forwards',
        'slide-out': 'slideOut 0.5s ease-in-out forwards'
      },
      keyframes: {
        slideIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-100px)'
          },
          '85%': {
            opacity: 1,
            transform: 'translateY(2px)'
          },
          '95%': {
            opacity: 1,
            transform: 'translateY(-1px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        slideOut: {
          '0%': {
            opacity: 1,
            transform: 'translateY(0)'
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(-100px)'
          }
        }
        // wiggle: {
        //   '0%, 100%': { transform: 'rotate(-3deg)' },
        //   '50%': { transform: 'rotate(3deg)' },
        // },
        // upBounce: {
        //   '0%, 100%': {
        //     transform: 'translateY(-25%)',
        //     animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
        //   },
        //   '50%': {
        //     transform: 'translateY(0)',
        //     animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
        //   }
        // }
      }
    },
  },
}
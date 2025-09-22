// module.exports = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       textShadow: {
//         'glow-sm': '0 0 2px #fff, 0 0 10px #0ff, 0 0 15px #0ff',
//         'glow-lg': '0 0 5px #fff, 0 0 20px #0ff, 0 0 30px #0ff, 0 0 40px #0ff',
//       },
//       keyframes: {
//         'spin-slow': {
//           '0%': { transform: 'rotate(0deg)' },
//           '100%': { transform: 'rotate(360deg)' },
//         },
//       },
//       animation: {
//         'spin-slow': 'spin-slow 60s linear infinite',
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/postcss'),
//   ],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'test-color': '#a3e635',
      },
      textShadow: {
        'glow-sm': '0 0 2px #fff, 0 0 10px #0ff, 0 0 15px #0ff',
        'glow-lg': '0 0 5px #fff, 0 0 20px #0ff, 0 0 30px #0ff, 0 0 40px #0ff',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 60s linear infinite',
      },
    },
  },
};
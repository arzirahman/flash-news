/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient': "radial-gradient(circle at top right, theme('colors.primary') 5%, theme('colors.accent') 40%, theme('colors.accent') 70%, theme('colors.primary') 100%)"
      },
      screens: {
        lg: '1150px'
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FBE4DD",
          secondary: "#B87A6E",
          accent: "#F9F4ED",
          'base-content': '#000000',
          'base-100': '#FFFFFF',
          'base-300': '#D2D3D8'
        },
      },
      {
        dark: {
          primary: "#60514E",
          secondary: "#905B50",
          accent: "#2A2A2A",
          'base-100': "#F9F4ED",
          'base-content': '#FFFFFF',
          'base-300': '#5C5C5C'
        },
      }
    ]
  }
}
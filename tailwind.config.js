/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: '#FE6400',
          white: '#fff',
          green: '#388B24'
        }
      },
    },
    plugins: [],
  }
  
  
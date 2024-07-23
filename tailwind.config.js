/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
  './views/*.ejs',
  "./views/**/*.ejs",
 ],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss:{},
      autoprefixer:{}
    }
  ],
}


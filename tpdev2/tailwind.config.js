/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        carbon: {
          bg: '#161616',
          layer1: '#262626',
          layer2: '#393939',
          layer3: '#525252',
          hover: '#353535',
          active: '#393939',
          border: '#393939',
          borderStrong: '#6f6f6f',
          text: '#f4f4f4',
          textSecondary: '#c6c6c6',
          textHelper: '#8d8d8d',
          blue: '#0f62fe',
          blueHover: '#0353e9',
          blueActive: '#002d9c',
          success: '#24a148',
          error: '#da1e28',
          warning: '#f1c21b',
          cyan: '#1192e8',
          teal: '#009d9a',
          magenta: '#ee5396',
          purple: '#be95ff',
        }
      }
    },
  },
  plugins: [],
}

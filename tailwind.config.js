/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3370FF',
          'blue-hover': '#245BDB',
          'blue-soft': '#E8F1FF',
          purple: '#7E5CFF',
          green: '#00B96B',
          orange: '#FF8800',
          red: '#F54A45',
        },
        ink: {
          900: '#1F2329',
          700: '#2B2F36',
          500: '#646A73',
          300: '#8F959E',
          200: '#BBBFC4',
          100: '#DEE0E3',
          50: '#F5F6F7',
        },
      },
      fontFamily: {
        sans: [
          '"PingFang SC"',
          '"HarmonyOS Sans SC"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft:
          '0 4px 12px rgba(31,35,41,0.06), 0 2px 4px rgba(31,35,41,0.04)',
        'soft-lg':
          '0 12px 32px rgba(31,35,41,0.08), 0 4px 12px rgba(31,35,41,0.05)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at 50% 0%, rgba(51,112,255,0.08), transparent 60%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#2563eb',
        secondary: '#1d4ed8',
        indigo: '#172554',
        white: '#fff',
        neutralWeak: '#fafafa',
        neutral: '#f4f4f5',
        neutralText: '#e4e4e7',
        border: '#d4d4d8',
        textLight: '#72727e',
        text: '#52525b',
        textDark: '#38383e',
      },
      keyframes: {
        loading: {
          '0%': { transform: 'translateX(-10%)' },
          '50%, 100%': { transform: ' translateX(120%)' },
        },
      },
      animation: {
        loading: 'loading 1.5s infinite linear;',
      },
    },
  },
  plugins: [],
};
export default config;

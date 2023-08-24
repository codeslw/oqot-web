import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      breakPoints : {
        "xs" : "375px",
        "sm" : "640px",
        "md": "820px",
        "lg" : "1024px",
        "xl" : "1210px"
      },
      colors : {
        'black-primary' : '#0C0C1B',
        'gray-primary' : '#616176',
        'gray-primary-dark' : '#74748C',
        'gray-secondary' : '#A4A4B5',
        'gray-secondary-dark' : '#585868',
        'blue-default' : '#C2E0FF',
        'blue-focus' : '#87C2FF',
        'blue-disabled' : '#D0E7FF',
        'blue-ghost' : '#E3F1FF',
        'blue-text' : '#399BFF',
        'gray-default' : '#D7D9E2',
        'gray-default-dark' : '#3B3B47',
        'gray-focus' : '#CACCD6',
        'gray-focus-dark' : '#464655',
        'gray-disabled' : '#EBEBEB',
        'gray-disabled-dark' : '#2C2C36',
        'gray-background' : '#F1F4F6',
        'gray-background-dark' : '#20202C',
        'gray-background-focus' : '#E3E6E9',
        'gray-background-focus-dark' : '#2C2C3B',
        'red-default' : '#FF2C45',
        'red-focus' : '#E81D35',
        'red-disabled' : '#FFBCBC',
        'red-background' : '#FBECEC',
        'orange-default' : '#FF7A00',
        'orange-focus' : '#FF5C00',
        'green-background' : '#B3B700',
        'green-text' : '#537000',
        'green-background-light' : '#537000'
      }
    },
  },
  plugins: [],
}
export default config

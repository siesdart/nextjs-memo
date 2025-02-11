import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sansKr: ['var(--font-ibm-flex-sans-kr)'],
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;

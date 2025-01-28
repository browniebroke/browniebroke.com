export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cabin Condensed", "georgia", "sans-serif"],
        heading: ["Patua One", "serif"],
      },
      fontSize: {
        base: "1.25rem",
      },
      letterSpacing: {
        wide: ".03em",
      },
      colors: {
        blue: {
          300: "#63B3ED",
          600: "#2B6CB0",
        },
        orange: {
          100: "#FEEBC8",
          300: "#F6AD55",
        },
      },
      spacing: {
        "1e": "1em",
        "0.75e": "0.75em",
        "0.25e": "0.25em",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                cinder: {
                    50: "#e7e9ef",
                    100: "#dbdee6",
                    200: "#c0c6d3",
                    300: "#98a2b9",
                    400: "#6d7b97",
                    500: "#505b71",
                    600: "#424b61",
                    700: "#2a2f3c",
                    800: "#1e212a",
                    900: "#16171d",
                    950: "#0b0c0f",
                },
            },
        },
    },
    plugins: [],
};

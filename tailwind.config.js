/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "custom-gradient":
                    "radial-gradient(circle, #3f2f73, #36276a, #2c1f60, #221757, #180f4e, #130c4a, #0f0846, #0b0442, #0b0542, #0c0543, #0c0643, #0d0644)",
            },
            colors: {
                blueish_gray: "#E3F4F6",
                my_green: "#399097",
                my_blue: "#6F6DF6",
                my_white: "#ffeeff",
                my_purple: "#735ea7",
                my_navy_blue: "#2a4965",
                my_gray: "#9facbd",
            },
            keyframes: {
                slideIn: {
                    "0%": { transform: "translateY(-550%)" },
                    "100%": { transform: "translateY(0)" },
                },
                slideOut: {
                    "0%": { transform: "translateY(0)" },
                    "100%": { transform: "translateY(-550%)" },
                },
            },
            animation: {
                slideIn: "slideIn 0.5s ease-out forwards",
                slideOut: "slideOut 0.5s ease-out forwards",
            },
        },
    },
    plugins: [require("daisyui")],
};


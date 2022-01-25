const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                primary: ['Inter', ...fontFamily.sans],
                kanit: ['kanitbold', ...fontFamily.sans],
            },
            colors: {
                primary: {
                    100: '#eb5d73',
                    400: '#ffc500',
                    500: '#e31837',
                },
                dark: '#150f0f',
            },
            height: {
                128: 'calc(100vh - 80px)',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};

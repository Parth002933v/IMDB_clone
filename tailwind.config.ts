import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindAspectRatio from '@tailwindcss/aspect-ratio';

import flowbite from 'flowbite-react/tailwind';

export default {
	darkMode: ['class'],
	content: [
		'./index.html',
		'./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}',
		flowbite.content(),
	],
	theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				'Inter',
    				'ui-sans-serif',
    				'system-ui',
    				'sans-serif',
    				'Apple Color Emoji',
    				'Segoe UI Emoji',
    				'Segoe UI Symbol',
    				'Noto Color Emoji'
    			]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	corePlugins: {
		aspectRatio: false,
	},
	plugins: [
		function ({ addUtilities }: { addUtilities: any }) {
			const newUtilitis = {
				'.no-scrollbar::-webkit-scrollbar': {
					display: 'none',
				},
				'.no-scrollbar': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
				},
			};

			addUtilities(newUtilitis);
		},

		tailwindcssAnimate,
		tailwindScrollbar,
		tailwindAspectRatio,
		flowbite.plugin(),
        require("tailwindcss-animate")
    ],
} satisfies Config;

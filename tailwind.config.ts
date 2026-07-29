import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { ink: "#151119", violet: "#8737ff", lime: "#d7ff48" } } }, plugins: [] };
export default config;

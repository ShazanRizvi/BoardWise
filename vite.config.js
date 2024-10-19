import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import tailwindcss from "tailwindcss"; // Import Tailwind CSS
// import autoprefixer from "autoprefixer"; // Import Autoprefixer
// import plugin from "tailwindcss/plugin"; // Import plugin helper for custom plugin

// export default defineConfig({
//   plugins: [
//     react(),
//     // Add Tailwind and other PostCSS plugins if needed
//     {
//       name: 'tailwindcss',
//       config: () => ({
//         plugins: [
//           tailwindcss(),
//           autoprefixer(),
//           plugin(function ({ addBase, theme }) {
//             const allColors = theme("colors");
//             const newVars = Object.fromEntries(
//               Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
//             );
//             addBase({
//               ":root": newVars,
//             });
//           })
//         ],
//       }),
//     },
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"), // Add alias for `src` directory
//     },
//   },
//   css: {
//     postcss: {
//       plugins: [tailwindcss, autoprefixer], // Include PostCSS plugins
//     },
//   },
//   server: {
//     port: 3000, // Set the server port to 3000
//   },
// });

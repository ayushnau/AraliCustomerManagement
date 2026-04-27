/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        mono: ["SF Mono", "Fira Code", "Fira Mono", "Menlo", "Consolas", "monospace"],
      },
      colors: {
        surface: "var(--surface)",
        border: "var(--border)",
        text: "var(--text)",
        "text-2": "var(--text-2)",
        "text-3": "var(--text-3)",
        "hover-row": "var(--hover-row)",
        stripe: "var(--stripe)",
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        "accent-hover": "var(--accent-hover)",
        "accent-text": "var(--accent-text)",
        "input-bg": "var(--input-bg)",
        "input-border": "var(--input-border)",
        "kbd-bg": "var(--kbd-bg)",
        "kbd-border": "var(--kbd-border)",
        danger: "var(--danger)",
        "danger-light": "var(--danger-light)",
        "toast-bg": "var(--toast-bg)",
        "toast-text": "var(--toast-text)",
        "topbar-bg": "var(--topbar-bg)",
        "topbar-border": "var(--topbar-border)",
      },
      backgroundColor: {
        app: "var(--bg)",
      },
      animation: {
        "fade-in": "fadeIn 0.15s ease",
        "slide-up": "slideUp 0.2s ease",
        "slide-left": "slideLeft 0.2s ease",
        pulse: "pulse 1s infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(16px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        slideLeft: { from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } },
      },
    },
  },
  plugins: [],
};

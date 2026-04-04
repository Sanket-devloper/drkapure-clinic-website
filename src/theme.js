/*
 * File: theme.js
 * Version: v1.0
 * Changelog:
 * - v1.0 - initial theme
 * - v1.1 - aligned tokens with existing rose website theme
 * Note: Only one developer should edit this file. Re-download from Drive before each session.
 */

export const theme = {
  colors: {
    primary: "#C07878",
    secondary: "#DBA8A0",
    background: "#F9FAFB",
    surface: "#F1F3F5",
    textPrimary: "#2D3442",
    textMuted: "#5A6578",
    accent: "#D4A8A0",
    danger: "#B76A6A",
    success: "#6F9B88",
    warning: "#C78B5E",
  },
  typography: {
    fontFamily: {
      heading: '"Playfair Display", "Georgia", serif',
      body: '"Inter", "Segoe UI", sans-serif',
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(26, 32, 48, 0.08)",
    md: "0 8px 16px rgba(26, 32, 48, 0.12)",
    lg: "0 16px 32px rgba(26, 32, 48, 0.16)",
  },
};

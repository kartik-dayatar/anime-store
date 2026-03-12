/**
 * Central Theme Tokens
 * Light theme applied globally by default via :root CSS variables.
 * Dark theme applied via [data-theme="dark"] on <html> — used only for New Arrivals page.
 */

export const lightTheme = {
    name: 'light',

    // Accent system (shared across both themes)
    colorPrimary: '#4f46e5',
    colorPrimaryLight: '#6366f1',
    colorPrimaryDark: '#3730a3',
    colorSecondary: '#7c3aed',
    colorSecondaryLight: '#8b5cf6',
    colorAccent: '#a78bfa',
    colorAccentGlow: 'rgba(99, 102, 241, 0.2)',

    // Surfaces
    colorBg: '#fafafa',
    colorBgSecondary: '#f0f0f5',
    colorBgTertiary: '#e8e8ef',
    colorSurface: '#ffffff',
    colorSurfaceHover: '#f5f5fa',
    colorSurfaceActive: '#ebebf0',
    colorBorder: 'rgba(0, 0, 0, 0.08)',
    colorBorderHover: 'rgba(0, 0, 0, 0.14)',

    // Text
    colorText: '#1a1a2e',
    colorTextSecondary: '#4a4a5e',
    colorTextMuted: '#8a8a9e',
    colorTextInverse: '#fafafa',

    // Shadows
    shadowSm: '0 2px 8px rgba(0, 0, 0, 0.06)',
    shadowMd: '0 4px 16px rgba(0, 0, 0, 0.08)',
    shadowLg: '0 8px 32px rgba(0, 0, 0, 0.1)',
    shadowGlow: '0 0 20px rgba(79, 70, 229, 0.15)',
    shadowGlowLg: '0 0 40px rgba(124, 58, 237, 0.12)',

    // Gradients
    gradientHero: 'linear-gradient(135deg, #f0edff 0%, #fafafa 40%, #eef2ff 70%, #fafafa 100%)',
    gradientCard: 'linear-gradient(145deg, rgba(79,70,229,0.04), rgba(124,58,237,0.02))',
    gradientGlow: 'radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 70%)',
};

export const darkTheme = {
    name: 'dark',

    // Accent system
    colorPrimary: '#4f46e5',
    colorPrimaryLight: '#818cf8',
    colorPrimaryDark: '#3730a3',
    colorSecondary: '#7c3aed',
    colorSecondaryLight: '#a78bfa',
    colorAccent: '#c4b5fd',
    colorAccentGlow: 'rgba(139, 92, 246, 0.35)',

    // Surfaces
    colorBg: '#0f0f15',
    colorBgSecondary: '#141420',
    colorBgTertiary: '#1c1c2a',
    colorSurface: '#18182a',
    colorSurfaceHover: '#222238',
    colorSurfaceActive: '#2a2a40',
    colorBorder: 'rgba(255, 255, 255, 0.06)',
    colorBorderHover: 'rgba(255, 255, 255, 0.12)',

    // Text
    colorText: '#f1f1f4',
    colorTextSecondary: '#a1a1b5',
    colorTextMuted: '#6b6b80',
    colorTextInverse: '#0f0f15',

    // Shadows
    shadowSm: '0 2px 8px rgba(0, 0, 0, 0.4)',
    shadowMd: '0 4px 16px rgba(0, 0, 0, 0.5)',
    shadowLg: '0 8px 32px rgba(0, 0, 0, 0.6)',
    shadowGlow: '0 0 20px rgba(79, 70, 229, 0.35)',
    shadowGlowLg: '0 0 40px rgba(124, 58, 237, 0.3)',

    // Gradients
    gradientHero: 'linear-gradient(135deg, #1a0533 0%, #0f0a2e 25%, #0f0f15 50%, #0d1a2e 75%, #0a0f1a 100%)',
    gradientCard: 'linear-gradient(145deg, rgba(79,70,229,0.08), rgba(124,58,237,0.04))',
    gradientGlow: 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)',
};

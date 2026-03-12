import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => { },
});

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState('light');

    const setTheme = useCallback((newTheme) => {
        setThemeState(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }, []);

    // Set initial theme on mount
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'light');
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

export default ThemeContext;

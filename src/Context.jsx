import { createContext, useContext, useEffect, useState } from "react";

export const WeatherContext = createContext();

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    //get the theme from localStorage or default to light when initializing the theme
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light"
    );

    //any time the theme changes, update the body attribute and localStorage
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        console.log('theme switched')
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};


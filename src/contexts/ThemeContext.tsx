import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

type ThemeProvider = {
    children: ReactNode;
};

type ThemeContext = {
    theme: Theme;
    toggleTheme: () => void;
};

type Theme = 'light' | 'dark' | null;

const ThemeContext = createContext({} as ThemeContext);

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: ThemeProvider) {
    const [theme, setTheme] = useState<Theme>(null);
    const isLight = theme === 'light';

    const toggleTheme = () => {
        setTheme(isLight ? 'dark' : 'light');
    };

    useEffect(() => {
        if (theme === null) {
            const theme = localStorage.getItem('theme') as Theme;
            if (theme === null) return setTheme('light');
            return setTheme(theme);
        } else {
            localStorage.setItem('theme', theme);
            document.body.classList.remove('light', 'dark');
            document.body.classList.toggle(theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

import { createContext, useContext, useEffect } from 'react';

// Custom hook
import { useLocalStorageState } from '../hooks/useLocalStorageState';

// Context (Provider)
const DarkModeContext = createContext();

// 1) Provider component
function DarkModeProvider({ children }) {
	// window.matchMedia('(prefers-color-scheme: dark)').matches (Setting app mode based on the user system mode if user system is set to dark then app will be dark)
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(
		window.matchMedia('(prefers-color-scheme: dark)').matches,
		'isDarkMode'
	);

	// Adding the class
	useEffect(
		function () {
			if (isDarkMode) {
				document.documentElement.classList.add('dark-mode');
				document.documentElement.classList.remove('light-mode');
			} else {
				document.documentElement.classList.add('light-mode');
				document.documentElement.classList.remove('dark-mode');
			}
		},
		[isDarkMode]
	);

	// Custom function
	function toggleDarkMode() {
		setIsDarkMode((isDark) => !isDark);
	}

	// 2) Provide value to child components
	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

// Custom corresponding hook (Basicaly to Consum the context value)
function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (context === undefined)
		throw new Error('DarkModeContext was used outside the DarkModeProvider');

	return context;
}

export { DarkModeProvider, useDarkMode };

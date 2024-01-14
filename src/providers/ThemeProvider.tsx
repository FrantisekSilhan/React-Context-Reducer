import { createContext, useState } from "react";

type ThemeProviderType = {
  theme: "Light" | "Dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeProviderType>({theme: "Dark", toggleTheme: () => {}})

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<"Light" | "Dark">("Light");


  const toggleTheme = () => {
    setTheme(x => x == "Light" ? "Dark" : "Light");
  }
  //setTheme(theme => theme == "light" ? "dark" : "light")


  return (
    <>
      <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

export default ThemeProvider;
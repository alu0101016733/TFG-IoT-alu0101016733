import React, {
  useContext,
  createContext,
  ReactNode,
  FC,
  useState,
} from "react";

export type ThemeType = {
  background: string;
  backgroundCard: string;
  color: string;
  disabledText: string;
  baseColor: {
    dark: string;
    middle: string;
    light: string;
  };
  chart: {
    colorRange: "sep" | "group";
  };
};

const dark: ThemeType = {
  background: "#121212",
  backgroundCard: "#1f1f1f",
  disabledText: "#aaaaaa",
  baseColor: {
    dark: "#1D2D50",
    middle: "#133B5C",
    light: "#1E5F74",
  },
  color: "#ffffff",
  chart: {
    colorRange: "group",
  },
};

const light: ThemeType = {
  background: "#e5e5e5",
  backgroundCard: "#ffffff",
  color: "#000000",
  disabledText: "#777777",
  baseColor: {
    dark: "#626EEF",
    middle: "#09A8FA",
    light: "#41C5D3",
  },
  chart: {
    colorRange: "sep",
  },
};

type availableThemesType = "dark" | "light";

const themeMap: { [key in availableThemesType]: ThemeType } = {
  dark: dark,
  light: light,
};

export type themeContextType = {
  activeTheme: availableThemesType;
  theme: ThemeType;
};

const ThemeContext = createContext({
  activeTheme: "dark",
  theme: dark,
} as themeContextType);
const ThemeUpdateContext = createContext((theme: availableThemesType) => {});

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
  return useContext(ThemeUpdateContext);
};

export const ThemeProvider: FC<{ children: ReactNode }> = ({
  children,
  ...props
}) => {
  const [currentTheme, setCurrentTheme] = useState(
    "dark" as availableThemesType
  );

  const changeTheme = (theme: availableThemesType) => {
    setCurrentTheme(() => theme);
  };

  return (
    <ThemeContext.Provider
      value={{ activeTheme: currentTheme, theme: themeMap[currentTheme] }}
    >
      <ThemeUpdateContext.Provider value={changeTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};


import { colors } from "@/theme/colors";
import { createContext } from "react";

export const ThemeContext = createContext<{
    theme: "light" | "dark";
    toggleTheme: () => void;
    COLORS: typeof colors.dark | typeof colors.light;
}>({
    theme: "light",
    toggleTheme: () => { },
    COLORS: colors.light,
});
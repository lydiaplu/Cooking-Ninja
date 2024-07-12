import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export const useTheme = () => {
    const theme = useContext(ThemeContext)

    if (theme === undefined) {
        throw new Error("useTheme() must be used inside a ThemeProvider")
    }

    return theme;
}
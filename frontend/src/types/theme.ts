import type { Theme as NavigationTheme } from "@react-navigation/native";

/** React Navigation's theme (which includes fonts since v7) plus the app's extra colours. */
export type Theme = Omit<NavigationTheme, "colors"> & {
  colors: NavigationTheme["colors"] & {
    blue: string;
    darkText: string;
    statusbar_background?: string;
    panel: string;
    headerText: string;
    headerIcon: string;
    statusbar: string;
    inputBorder: string;
    white: string;
    black: string;
    green: string;
    lightText?: string;
    iconCard?: string;
    dots?: string;
  };
};

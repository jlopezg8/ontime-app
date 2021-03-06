import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useTheme as _useTheme } from 'react-native-paper';

import useColorScheme from "./useColorScheme";

export default function useTheme() {
  const NavigationTheme = useColorScheme() === 'dark' ? DarkTheme : DefaultTheme;
  const PaperTheme = _useTheme();
  return {
    ...NavigationTheme,
    ...PaperTheme,
    colors: {
      ...NavigationTheme.colors,
      ...PaperTheme.colors,
    },
  }
}

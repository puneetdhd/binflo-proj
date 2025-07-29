import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { useState } from "react";
import ThemeContext from "./src/components/Theme/ThemeContext";
import theme from "./src/components/Theme/Theme";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={darkMode ? theme.dark : theme.light}>
      <NavigationContainer>
        <StatusBar
          style={darkMode ? "light" : "dark"}
          backgroundColor={darkMode ? "#46007C" : "white"}
          animated={true}
        />
        <AppNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
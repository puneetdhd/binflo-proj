import { useContext, useMemo } from "react";
import { StyleSheet } from "react-native";
import ThemeContext from "../components/Theme/ThemeContext";

const useGlobalStyles = () => {
  console.log('=== DEBUG useGlobalStyles ===');
  console.log('ThemeContext imported:', ThemeContext);
  
  const theme = useContext(ThemeContext);
  console.log('Theme from context:', theme);
  console.log('Theme type:', typeof theme);
  
  if (!theme) {
    console.error('❌ THEME IS UNDEFINED - Check ThemeProvider setup');
    // Return basic fallback styles
    return StyleSheet.create({
      container: { 
        flex: 1, 
        alignItems: "center",
        paddingTop: "20%",
        backgroundColor: '#fff' 
      },
      contents: {
        paddingTop: "10%",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
      },
      colorBG: {
        backgroundColor: '#fff',
      },
      absoluteBTN: {
        position: "absolute",
        bottom: 20,
        width: "95%",
        alignSelf: "center",
      },
      mainLogo: {
        flexDirection: "row",
        alignItems: "flex-end",
      },
      scrollView: {
        flex: 1,
        backgroundColor: '#fff',
      },
      miniButton: {
        backgroundColor: "#FC4F72",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
        paddingVertical: 2,
        paddingHorizontal: 10,
      },
      miniButtonText: {
        color: "white",
        textAlign: "center",
      },
      headingOne: {
        fontSize: 26,
        fontWeight: "700",
        color: '#000',
      },
      headingFour: {
        fontSize: 20,
        lineHeight: 34,
        fontWeight: "700",
        color: '#000',
      },
      headingFive: {
        fontSize: 16,
        lineHeight: 34,
        fontWeight: "700",
        color: '#000',
      },
      paragraph: {
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 26,
        width: "100%",
        color: '#000',
      },
      absoluteContents: {
        position: "absolute",
        bottom: 0,
      },
      yellowText: {
        color: "#FBBB00",
        fontWeight: "500",
      },
      yellowTextWithUnderline: {
        color: "#FBBB00",
        textDecorationLine: "underline",
      },
      violetText: {
        color: "#46007C",
        fontWeight: "600",
        fontSize: 16,
      },
      violetTextWithUnderline: {
        color: "#46007C",
        textDecorationLine: "underline",
      },
      redText: {
        color: "#FC4F72",
      },
      redTextwithWeight: {
        color: "#FC4F72",
        fontWeight: "600",
      },
      input: {
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: "grey",
        backgroundColor: "white",
      },
    });
  }

  // Better fallback handling
  const safeTheme = useMemo(() => {
    const result = {
      background: theme?.background || "#fff",
      color: theme?.color || "#000"
    };
    console.log('Safe theme created:', result);
    return result;
  }, [theme]);

  const styles = useMemo(() => {
    console.log('Creating styles with safeTheme:', safeTheme);
    
    try {
      const createdStyles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: "center",
          paddingTop: "20%",
          backgroundColor: safeTheme.background,
        },
        contents: {
          paddingTop: "10%",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 20,
        },
        colorBG: {
          backgroundColor: safeTheme.background,
        },
        absoluteBTN: {
          position: "absolute",
          bottom: 20,
          width: "95%",
          alignSelf: "center",
        },
        mainLogo: {
          flexDirection: "row",
          alignItems: "flex-end",
        },
        scrollView: {
          flex: 1,
          backgroundColor: safeTheme.background,
        },
        miniButton: {
          backgroundColor: "#FC4F72",
          alignItems: "center",
          borderRadius: 10,
          justifyContent: "center",
          paddingVertical: 2,
          paddingHorizontal: 10,
        },
        miniButtonText: {
          color: "white",
          textAlign: "center",
        },
        headingOne: {
          fontSize: 26,
          fontWeight: "700",
          color: safeTheme.color,
        },
        headingFour: {
          fontSize: 20,
          lineHeight: 34,
          fontWeight: "700",
          color: safeTheme.color,
        },
        headingFive: {
          fontSize: 16,
          lineHeight: 34,
          fontWeight: "700",
          color: safeTheme.color,
        },
        paragraph: {
          fontSize: 16,
          fontWeight: "400",
          lineHeight: 26,
          width: "100%",
          color: safeTheme.color,
        },
        absoluteContents: {
          position: "absolute",
          bottom: 0,
        },
        yellowText: {
          color: "#FBBB00",
          fontWeight: "500",
        },
        yellowTextWithUnderline: {
          color: "#FBBB00",
          textDecorationLine: "underline",
        },
        violetText: {
          color: "#46007C",
          fontWeight: "600",
          fontSize: 16,
        },
        violetTextWithUnderline: {
          color: "#46007C",
          textDecorationLine: "underline",
        },
        redText: {
          color: "#FC4F72",
        },
        redTextwithWeight: {
          color: "#FC4F72",
          fontWeight: "600",
        },
        input: {
          borderWidth: 0.5,
          borderRadius: 30,
          borderColor: "grey",
          backgroundColor: "white",
        },
      });
      
      console.log('✅ Styles created successfully');
      console.log('Available style keys:', Object.keys(createdStyles));
      return createdStyles;
      
    } catch (error) {
      console.error('❌ Error creating styles:', error);
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
      
      // Return basic fallback styles
      return StyleSheet.create({
        container: { 
          flex: 1, 
          backgroundColor: '#fff' 
        },
        paragraph: { 
          fontSize: 16, 
          color: '#000' 
        },
        headingFour: { 
          fontSize: 20, 
          color: '#000' 
        }
      });
    }
  }, [safeTheme.background, safeTheme.color]);

  console.log('=== END DEBUG useGlobalStyles ===');
  return styles;
};

export default useGlobalStyles;
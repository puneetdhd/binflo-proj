import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useGlobalStyles from "../../styles/globalStyles";

const Logo = () => {
  const globalStyles = useGlobalStyles();
  return (
    <View style={globalStyles.mainLogo}>
      <Text style={styles.head}>SaitCBR.nl</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  head:{
    color: '#2fa75f',
    fontSize: 40,
    fontWeight: 'bold',
  }
});

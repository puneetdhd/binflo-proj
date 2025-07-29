import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useGlobalStyles from "../../styles/globalStyles";
import CommonButton from "../../components/commonbutton/CommonButton";
import { signInData, singinTextInput } from "../../utils/mockData";
import { Checkbox, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../../components/Theme/ThemeContext";
import Logo from "../../components/logo/Logo";

const SignIn = () => {
  const [checked, setChecked] = useState(false);
  const handleToggle = () => setChecked(!checked);

  const navigation = useNavigation();
  const globalStyles = useGlobalStyles();
  const theme = useContext(ThemeContext);

  return (
    <ScrollView
      style={globalStyles.scrollView}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.contents}>
        <Logo />

        <View style={styles.childContents}>
          <Text style={globalStyles.headingOne}>Let's Sign In</Text>
          <Text style={globalStyles.paragraph}>
            Login to Your Account to Continue your Courses
          </Text>

          <View style={{ marginTop: 30, gap: 20, marginBottom: 20 }}>
            {singinTextInput.map((item) => (
              <TextInput
                key={item.id}
                placeholder={item.placeholder}
                style={globalStyles.input}
                left={<TextInput.Icon icon={item.icon} />}
                right={<TextInput.Icon icon={item.rightIcon} />}
                underlineColor="transparent"
                theme={{
                  colors: {
                    primary: "transparent",
                    underlineColor: "transparent",
                  },
                }}
                secureTextEntry={item.securetext}
              />
            ))}
          </View>

          <View style={styles.checkBox}>
            <View style={styles.rememberMe}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={handleToggle}
                uncheckedColor="#FFB322"
                color="#FFB322"
                uncheckedIcon="check"
              />
              <Text style={{ color: theme.color }}>Remember me</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("forgotpassword")}>
              <Text style={{ color: theme.color }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <CommonButton
            label="Sign In"
            onPress={() => navigation.navigate("home")}
          />

          <View style={styles.continueWith}>
            <Text style={{ color: theme.color }}>Or Continue With</Text>
            <View style={styles.icons}>
              {signInData.map((item) => (
                <TouchableOpacity key={item.id} style={styles.socialIcons}>
                  {typeof item.icon === "function" ? item.icon() : item.icon}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.register}>
          <Text style={{ textAlign: "center", color: theme.color }}>
            Don’t have an Account?{" "}
          </Text>
          <TouchableOpacity>
            <Text style={[globalStyles.yellowText, { fontWeight: "500" }]}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contents: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  childContents: {
    width: "100%",
  },
  checkBox: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  continueWith: {
    paddingTop: 40,
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingTop: 24,
  },
  socialIcons: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 50,
  },
  register: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 40,
  },
});

export default SignIn;

import React, { useContext, useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking 
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);

  const [loginotp, setLoginOtp] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showResendButton, setShowResendButton] = useState(false);

  const handleToggle = () => setChecked(!checked);

  const navigation = useNavigation();
  const globalStyles = useGlobalStyles();
  const theme = useContext(ThemeContext);

  // Timer effect for OTP resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setShowResendButton(true);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent]);

  const handleSendOtp = async () => {
    // Basic validation
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.0.2.2:5000/api/users/send-login-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setTimer(30); // Start 30 second timer
        setShowResendButton(false);
        // Note: You might want to get userId from the response if your backend provides it
        // For now, we'll handle it in the verify step
        Alert.alert("Success", "OTP sent to your email address!");
      } else {
        Alert.alert("Error", data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      Alert.alert(
        "Network Error",
        "Unable to connect to server. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    // Basic validation
    if (!otp || !email) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.0.2.2:5000/api/users/verify-login-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(), // Include email to find user
          otp,
          platform: "app",
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data and token if needed
        // await AsyncStorage.setItem("userToken", data.token);
        // await AsyncStorage.setItem("userData", JSON.stringify(data.userData));

        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("home"),
          },
        ]);
      } else {
        Alert.alert("Verification Failed", data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      Alert.alert(
        "Network Error",
        "Unable to connect to server. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.0.2.2:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password,
          platform: "app",
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("home"),
          },
        ]);
      } else {
        Alert.alert("Login Failed", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Network Error",
        "Unable to connect to server. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address first");
      return;
    }

    setResendLoading(true);

    try {
      const response = await fetch("http://10.0.2.2:5000/api/users/send-login-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTimer(30); // Start 30 second timer again
        setShowResendButton(false);
        Alert.alert("Success", "OTP resent to your email address!");
      } else {
        Alert.alert("Error", data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      Alert.alert("Network Error", "Unable to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleSignIn = () => {
    if (loginotp) {
      if (!otpSent) {
        handleSendOtp();
      } else {
        handleVerifyOtp();
      }
    } else {
      handlePasswordLogin();
    }
  };

  const handleToggleLoginMethod = () => {
    setLoginOtp(!loginotp);
    setOtpSent(false);
    setOtp("");
    setPassword("");
    setTimer(0);
    setShowResendButton(false);
  };

  return (
    <ScrollView
      style={globalStyles.scrollView}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.contents}>
        <Logo />

        <View style={styles.childContents}>
          <Text style={globalStyles.headingOne}>Sign In</Text>
          <Text style={globalStyles.paragraph}>
            Login to Your Account 
          </Text>

          <View style={{ marginTop: 30, gap: 20, marginBottom: 20 }}>
            <TextInput
              placeholder="Email"
              style={[globalStyles.input, styles.textInput]}
              value={email}
              onChangeText={setEmail}
              left={<TextInput.Icon icon="email" />}
              underlineColor="transparent"
              mode="outlined"
              theme={{
                colors: {
                  primary: "#FFB322",
                  outline: "#E0E0E0",
                  background: "white",
                },
                roundness: 12,
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              contentStyle={styles.inputContent}
              editable={!otpSent || !loginotp} // Disable email input after OTP is sent
            />
            
            {loginotp && otpSent && (
              <TextInput
                placeholder="Enter your OTP"
                style={[globalStyles.input, styles.textInput]}
                value={otp}
                onChangeText={setOtp}
                left={<TextInput.Icon icon="shield-key" />}
                underlineColor="transparent"
                mode="outlined"
                theme={{
                  colors: {
                    primary: "#FFB322",
                    outline: "#E0E0E0",
                    background: "white",
                  },
                  roundness: 12,
                }}
                autoCapitalize="none"
                keyboardType="numeric"
                contentStyle={styles.inputContent}
                maxLength={6} // Assuming OTP is 6 digits
              />
            )}

            {!loginotp && (
              <TextInput
                placeholder="Password"
                style={[globalStyles.input, styles.textInput]}
                value={password}
                onChangeText={setPassword}
                left={<TextInput.Icon icon="lock" />}
                right={<TextInput.Icon icon="eye" />}
                underlineColor="transparent"
                mode="outlined"
                theme={{
                  colors: {
                    primary: "#FFB322",
                    outline: "#E0E0E0",
                    background: "white",
                  },
                  roundness: 12,
                }}
                secureTextEntry={true}
                autoCapitalize="none"
                contentStyle={styles.inputContent}
              />
            )}
          </View>

          {/* Show timer and resend button when in OTP mode and OTP has been sent */}
          {loginotp && otpSent && (
            <View style={styles.otpActions}>
              {timer > 0 ? (
                <Text style={styles.timerText}>
                  Resend OTP in {timer} seconds
                </Text>
              ) : showResendButton ? (
                <TouchableOpacity 
                  onPress={handleResendOtp}
                  disabled={resendLoading}
                  style={styles.resendButton}
                >
                  <Text style={styles.resendButtonText}>
                    {resendLoading ? "Resending..." : "Resend OTP"}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}

          {!loginotp && (
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
          )}

          <TouchableOpacity 
            onPress={handleToggleLoginMethod}
            style={{ marginBottom: 10 }}
          >
            {loginotp ? (
              <Text style={[globalStyles.yellowText, { fontWeight: "500" }]}>
                Login with password
              </Text>
            ) : (
              <Text style={[globalStyles.yellowText, { fontWeight: "500" }]}>
                Login with OTP
              </Text>
            )}
          </TouchableOpacity>
        
          <CommonButton
            label={
              loading 
                ? (loginotp && !otpSent ? "Sending OTP..." : loginotp ? "Verifying..." : "Signing In...")
                : (loginotp && !otpSent ? "Send OTP" : "Sign In")
            }
            onPress={handleSignIn}
            disabled={loading || resendLoading}
          />
        </View>

        <View style={styles.register}>   
          <Text style={{ textAlign: "center", color: theme.color }}>
            Don't have an Account?{" "}
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate("register")}
          >
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
    gap: 20,
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
  spacer: {
    height: 60, 
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
  textInput: {
    backgroundColor: "white",
    borderRadius: 12,
  },
  inputContent: {
    paddingHorizontal: 10,
  },
  otpActions: {
    alignItems: "center",
    marginBottom: 15,
  },
  timerText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#2fa75f",
    borderRadius: 8,
  },
  resendButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default SignIn;
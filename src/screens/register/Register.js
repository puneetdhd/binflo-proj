import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView } from "react-native";
import useGlobalStyles from "../../styles/globalStyles";
import CommonButton from "../../components/commonbutton/CommonButton";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../../components/Theme/ThemeContext";
import Logo from "../../components/logo/Logo";
import { TextInput } from "react-native-paper";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const globalStyles = useGlobalStyles();
  const theme = useContext(ThemeContext);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repassword: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSignUp = async () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.password || !formData.repassword || !formData.phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.repassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://10.0.2.2:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          platform: 'mobile'
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Registration successful!', [
          { text: 'OK', onPress: () => navigation.navigate('signin') }
        ]);
      } else {
        Alert.alert('Error', result.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={globalStyles.scrollView}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.contents} >
        <Logo />
        
        {/* Added spacing container */}
        <View style={styles.spacer} />
        
        <View style={styles.childContents}>
          <Text style={globalStyles.headingOne}>Create Account</Text>
          <Text style={globalStyles.paragraph}>
            Sign up to get started
          </Text>
          
          <View style={styles.formContainer}>
            {/* First Name Input */}
            <TextInput
              placeholder="First Name"
              style={[globalStyles.input, styles.textInput]}
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
              left={<TextInput.Icon icon="account" />}
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
              autoCapitalize="words"
              contentStyle={styles.inputContent}
            />

            {/* Last Name Input */}
            <TextInput
              placeholder="Last Name"
              style={[globalStyles.input, styles.textInput]}
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
              left={<TextInput.Icon icon="account" />}
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
              autoCapitalize="words"
              contentStyle={styles.inputContent}
            />

            {/* Email Input */}
            <TextInput
              placeholder="Email"
              style={[globalStyles.input, styles.textInput]}
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
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
            />

            {/* Phone Input */}
            <TextInput
              placeholder="Phone Number"
              style={[globalStyles.input, styles.textInput]}
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              left={<TextInput.Icon icon="phone" />}
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
              keyboardType="phone-pad"
              contentStyle={styles.inputContent}
            />

            {/* Password Input */}
            <TextInput
              placeholder="Password"
              style={[globalStyles.input, styles.textInput]}
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
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

            {/* Confirm Password Input */}
            <TextInput
              placeholder="Confirm Password"
              style={[globalStyles.input, styles.textInput]}
              value={formData.repassword}
              onChangeText={(text) => handleInputChange('repassword', text)}
              left={<TextInput.Icon icon="lock-check" />}
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
          </View>

          <CommonButton
            label={loading ? "Creating Account..." : "Create Account"}
            onPress={handleSignUp}
            disabled={loading}
          />
        </View>

        <View style={styles.register}>   
          <Text style={{ textAlign: "center", color: theme.color }}>
            Already have an Account?{" "}
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate("signin")}>
            <Text style={[globalStyles.yellowText, { fontWeight: "500" }]}>
              SIGN IN
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
    paddingTop: 60, // Reduced from 80
    paddingBottom: 60,
    paddingHorizontal: 20,
    marginHorizontal: 50, // Only horizontal margin
    marginBottom: 50,     // Bottom margin only
  },
  childContents: {
    width: "100%",
  },
  // Added spacer style
  spacer: {
    height: 60, // Adjust this value to increase/decrease space
  },
  formContainer: {
    marginTop: 30,
    gap: 20,
    marginBottom: 20,
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
});

export default RegisterScreen;
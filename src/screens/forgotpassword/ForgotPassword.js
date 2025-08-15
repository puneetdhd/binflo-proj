import React, { useContext, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Alert, 
  Modal,
  TextInput
} from "react-native";
import useGlobalStyles from "../../styles/globalStyles";
import Header from "../../components/header/Header";
import { forgotPassData } from "../../utils/mockData";
import CommonButton from "../../components/commonbutton/CommonButton";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../../components/Theme/ThemeContext";

const ForgotPassword = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const globalStyles = useGlobalStyles();
  const theme = useContext(ThemeContext);

  const handleContactSelect = (item) => {
    setSelectedMethod(item);
    // If the selected method is email, show email input modal
    if (item.title.toLowerCase().includes('email') || item.title.toLowerCase().includes('mail')) {
      setShowEmailInput(true);
    } else {
      // For SMS/Phone, you might want to handle differently
      Alert.alert("Info", "SMS reset is not implemented yet. Please use email option.");
    }
  };

  const handleForgotPassword = async () => {
    // Validate email
    if (!email || !email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.0.2.2:5000/api/users/forgot-password", {
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
        setShowEmailInput(false);
        setEmail("");
        Alert.alert(
          "Success", 
          "Password reset link has been sent to your email address. Please check your inbox and follow the instructions.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("signin"), // or wherever you want to redirect
            },
          ]
        );
      } else {
        Alert.alert("Error", data.message || "Failed to send reset email");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      Alert.alert(
        "Network Error",
        "Unable to connect to server. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedMethod) {
      Alert.alert("Error", "Please select a contact method");
      return;
    }
    
    // If email method is selected, show the email input
    if (selectedMethod.title.toLowerCase().includes('email') || selectedMethod.title.toLowerCase().includes('mail')) {
      setShowEmailInput(true);
    } else {
      // Handle other methods or navigate to next screen
      navigation.navigate("entercode");
    }
  };

  return (
    <View style={globalStyles.container}>
      <Header label="Forgot password" />
      <View style={globalStyles.contents}>
        <Text style={globalStyles.paragraph}>
          Select which contact details should we use to Reset Your Password
        </Text>
        <View style={{ gap: 15, width: "100%", marginTop: "7%" }}>
          {forgotPassData.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.contact,
                selectedMethod?.title === item.title && styles.selectedContact
              ]}
              onPress={() => handleContactSelect(item)}
            >
              {item.icon}
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "500", color: theme.color }}>
                  {item.title}
                </Text>
                <Text style={{ color: theme.color, opacity: 0.7 }}>
                  {item.para}
                </Text>
              </View>
              {selectedMethod?.title === item.title && (
                <View style={styles.selectedIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View
        style={[
          globalStyles.absoluteContents,
          { width: "90%", bottom: 30, gap: 20 },
        ]}
      >
        <CommonButton
          label="Continue"
          onPress={handleContinue}
          disabled={!selectedMethod}
        />
        <Text style={{ textAlign: "center", color: theme.color }}>
          By continuing, you agree to Smartup{" "}
          <Text style={globalStyles.yellowTextWithUnderline}>
            Terms and Conditions of Use
          </Text>{" "}
          and
          <Text style={globalStyles.yellowTextWithUnderline}>
            {" "}
            Privacy Policy.
          </Text>
        </Text>
      </View>

      {/* Email Input Modal */}
      <Modal
        visible={showEmailInput}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEmailInput(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Your Email</Text>
            <Text style={styles.modalSubtitle}>
              We'll send you a password reset link
            </Text>
            
            <TextInput
              style={styles.emailInput}
              placeholder="Enter your email address"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowEmailInput(false);
                  setEmail("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.sendButton]}
                onPress={handleForgotPassword}
                disabled={loading}
              >
                <Text style={styles.sendButtonText}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  contact: {
    backgroundColor: "#FFE7EC",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedContact: {
    borderColor: "#FFB322",
    backgroundColor: "#FFF8E7",
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFB322",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  emailInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: "#F9F9F9",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
  },
  sendButton: {
    backgroundColor: "#FFB322",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "500",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default ForgotPassword;
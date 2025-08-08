import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWhatsApp = async () => {
    const phoneNumber = '31970-10285156';
    const url = `whatsapp://send?phone=${phoneNumber}`;
    
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        // Fallback to web WhatsApp
        await Linking.openURL(`https://wa.me/${phoneNumber}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open WhatsApp');
    }
  };

  const handleEmail = async () => {
    const email = 'info@saitcbr.nl';
    const url = `mailto:${email}`;
    
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open email client');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open email client');
    }
  };

  const handleLocation = async () => {
    const address = 'Leonard Springerlaan 153, Haarlem 2033 ST, Netherlands';
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Unable to open maps');
    }
  };

  const scrollToTop = () => {
    // In a real implementation, you'd use a ref to the ScrollView
    console.log('Scroll to top');
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert('Success', 'Thank you for your message! We will get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      telephone: '',
      message: ''
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Need more help section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need more help?</Text>
          
          {/* WhatsApp */}
          <TouchableOpacity style={styles.contactItem} onPress={handleWhatsApp}>
            <View style={styles.iconContainer}>
              <Ionicons name="logo-whatsapp" size={24} color="#333" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>WhatsApp now</Text>
              <Text style={styles.contactDetail}>(+31) 970-10285156</Text>
            </View>
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail" size={24} color="#333" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Email address</Text>
              <Text style={styles.contactDetail}>info@saitcbr.nl</Text>
            </View>
          </TouchableOpacity>

          {/* Location */}
          <TouchableOpacity style={styles.contactItem} onPress={handleLocation}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={24} color="#333" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Location</Text>
              <Text style={styles.contactDetail}>
                Leonard Springerlaan 153,{'\n'}Haarlem 2033 ST,{'\n'}Netherlands.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Contact form section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact us.</Text>

          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter name..."
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-mail</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter email address..."
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
          </View>

          {/* Telephone Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Telephone</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your WhatsApp number..."
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={formData.telephone}
              onChangeText={(text) => handleInputChange('telephone', text)}
            />
          </View>

          {/* Message Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Message</Text>
            <TextInput
              style={[styles.textInput, styles.messageInput]}
              placeholder="Ask your question..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={formData.message}
              onChangeText={(text) => handleInputChange('message', text)}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Scroll to top button */}
      <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
        <Ionicons name="arrow-up" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 16,
    color: '#666',
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 0,
  },
  messageInput: {
    borderRadius: 15,
    height: 120,
    paddingTop: 15,
  },
  submitButton: {
    backgroundColor: '#333',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
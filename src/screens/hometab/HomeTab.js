import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import {
  homeSliderData,
  homeTabCategories,
  hometabPorfileHeader,
  mentorsData,
  popularCategoriesTab,
  popularCoursesAllTab,
  processCarousalTab,
} from "../../utils/mockData";
import { Video } from 'expo-av';
import useGlobalStyles from "../../styles/globalStyles";
import CategoryCarousel from "../../components/categorycarousal/CategoryCarousal";
import PopularCourseAllTabCarousal from "../../components/popularcoursesAllTabCarousal/PopularCourseAllTabCarousal";
import ProcessCarousal from "../../components/processcarousal/ProcessCarousal";
import { useNavigation } from "@react-navigation/native";
import MentorCarousal from "../../components/mentorcarousal/MentorCarousal";

// Bottom Tab Navigation Component
const BottomTabNavigation = ({ activeTab, onTabPress }) => {
  const tabs = [
    {
      id: 'home',
      name: 'Home',
      icon: '🏠',
    },
    {
      id: 'courses',
      name: 'Courses',
      icon: '📚',
    },
    {
      id: 'search',
      name: 'Search',
      icon: '🔍',
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: '❤️',
    },
    {
      id: 'profile',
      name: 'Profile',
      icon: '👤',
    },
  ];

  return (
    <View style={styles.bottomTabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tabItem}
          onPress={() => onTabPress(tab.id)}
        >
          <Text
            style={[
              styles.tabIcon,
              activeTab === tab.id && styles.activeTabIcon
            ]}
          >
            {tab.icon}
          </Text>
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.id && styles.activeTabLabel
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const HomeTab = () => {
  const [popularCourseTab, setPopularCourseTab] = useState("All");
  const [activeBottomTab, setActiveBottomTab] = useState("home");
  const globalStyles = useGlobalStyles();

  const navigation = useNavigation();

  const handleTab = (item) => {
    setPopularCourseTab(item);
  };

  const handleBottomTabPress = (tabId) => {
    setActiveBottomTab(tabId);
    
    // Navigate to different screens based on tab selection
    switch (tabId) {
      case 'home':
        // Already on home, maybe scroll to top
        break;
      case 'courses':
        navigation.navigate("popularcourses");
        break;
      case 'search':
        // Navigate to search screen
        // navigation.navigate("search");
        break;
      case 'contact':
        // Navigate to favorites screen
        navigation.navigate("contact");
        break;
      case 'profile':
        navigation.navigate("profile");
        break;
      default:
        break;
    }
  };

  const renderPopularCourseTabs = () => {
    switch (popularCourseTab) {
      case "All":
        return <PopularCourseAllTabCarousal data={popularCoursesAllTab} />;
      default:
        return <PopularCourseAllTabCarousal data={popularCoursesAllTab} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate("profile")}>
              <Image source={require("../../assets/images/profileIcon.png")} />
            </TouchableOpacity>
            <View style={{ gap: 10 }}>
              <Text style={globalStyles.headingFour}>Johnny Cage</Text>
              <View style={[globalStyles.miniButton, { width: "70%" }]}>
                <Text style={globalStyles.miniButtonText}>Learner</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerIcons}>
            {hometabPorfileHeader.map((item) => (
              <TouchableOpacity key={item.id}>{item.icon}</TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView style={styles.scrollContent}>
          <View>
            {/* You can create a slider carousel here if needed */}
            <View style={{ height: 200, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', margin: 20 }}>
              <Video
                source={require('../../../assets/videos/autotheorie1.mp4')}
                style={styles.video}
                resizeMode="cover"
                shouldPlay={true}
                isLooping={true}
                isMuted={true}
                useNativeControls={false}
              />
            </View>
          </View>


          <View style={styles.headAndBTN}>
            <Text style={globalStyles.headingFour}>Popular Courses</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("popularcourses")}
            >
              {/* <View style={globalStyles.miniButton}>
                <Text style={globalStyles.miniButtonText}>View all</Text>
              </View> */}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
              alignSelf: "center",
              marginVertical: "5%",
            }}
          >
            {popularCategoriesTab.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleTab(item.title)}
              >
                <Text
                  style={
                    popularCourseTab === item.title
                      ? styles.actveTab
                      : styles.inactiveTab
                  }
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {renderPopularCourseTabs()}
          <View style={[styles.headAndBTN, { marginTop: "5%" }]}>
            <Text style={globalStyles.headingFour}>In process</Text>
            <TouchableOpacity>
              <View style={globalStyles.miniButton}>
                <Text style={globalStyles.miniButtonText}>View all</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <ProcessCarousal data={processCarousalTab} />
          </View>
          <View>
            <ProcessCarousal data={processCarousalTab} />
          </View>
          <View>
            <ProcessCarousal data={processCarousalTab} />
          </View>
          <View style={[styles.headAndBTN, { marginTop: "5%" }]}>
            <Text style={globalStyles.headingFour}>Top Mentors</Text>
            <TouchableOpacity onPress={() => navigation.navigate("topmentors")}>
              <View style={globalStyles.miniButton}>
                <Text style={globalStyles.miniButtonText}>See all</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: "5%", marginBottom: "7%" }}>
            <MentorCarousal data={mentorsData} />
          </View>
        </ScrollView>

        <BottomTabNavigation 
          activeTab={activeBottomTab} 
          onTabPress={handleBottomTabPress} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // Match your app's background color
    paddingTop: 20, // Extra padding from the notch/status bar
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    marginBottom: 80, // Space for bottom tab navigation
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "6%",
    paddingVertical: "2%",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headAndBTN: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actveTab: {
    backgroundColor: "#FC4F72",
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
  inactiveTab: {
    backgroundColor: "#f1f1f1",
    color: "black",
    fontWeight: "500",
    textAlign: "center",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  // Bottom Tab Navigation Styles
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingBottom: 20, // Extra padding for iOS safe area
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
    opacity: 0.6,
  },
  activeTabIcon: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '400',
  },
  activeTabLabel: {
    color: '#FC4F72',
    fontWeight: '600',
  },
});

export default HomeTab;
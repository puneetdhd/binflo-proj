// src/navigation/MainTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from "../screens/hometab/HomeTab";
import Categories from "../screens/categories/Categories";
import PopularCourses from "../screens/popularcourses/PopularCourses";
import TopMentors from "../screens/topmentors/TopMentors";
import Notifications from "../screens/notificationsScreen/Notifications";
import Profile from "../screens/profile/Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack navigators for each tab
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeTab} />
    <Stack.Screen name="popularcourses" component={PopularCourses} />
    <Stack.Screen name="topmentors" component={TopMentors} />
  </Stack.Navigator>
);

const CategoriesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CategoriesMain" component={Categories} />
  </Stack.Navigator>
);

const NotificationsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="NotificationsMain" component={Notifications} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={Profile} />
  </Stack.Navigator>
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Categories') iconName = 'grid-outline';
          else if (route.name === 'Notifications') iconName = 'notifications-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="Categories" component={CategoriesStack} options={{ title: 'Categories' }} />
      <Tab.Screen name="Notifications" component={NotificationsStack} options={{ title: 'Notifications' }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default MainTabs;
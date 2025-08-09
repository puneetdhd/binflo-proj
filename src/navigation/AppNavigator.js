import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignUpScreen from "../screens/signup/SignUpScreen";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import SignIn from "../screens/signin/SignIn";
import LetsSingup from "../screens/letsSingUp/LetsSingup";
import FillProfile from "../screens/fillprofile/FillProfile";
import CreatePin from "../screens/createpin/CreatePin";
import ForgotPassword from "../screens/forgotpassword/ForgotPassword";
import EnterCode from "../screens/entercode/EnterCode";
import NewPassword from "../screens/newpassword/NewPassword";
import TabScreens from "../screens/tabscreens/TabScreens";
import Categories from "../screens/categories/Categories";
import PopularCourses from "../screens/popularcourses/PopularCourses";
import TopMentors from "../screens/topmentors/TopMentors";
import SearchScreen from "../screens/searchscreen/SearchScreen";
import FilterScreen from "../screens/filerScreen/FilterScreen";
import CourseDetails from "../screens/coursedetails/CourseDetails";
import Notifications from "../screens/notificationsScreen/Notifications";
import MentorDetails from "../screens/mentordetails/MentorDetails";
import CheckOut from "../screens/checkout/CheckOut";
import Confirmation from "../screens/confirmation/Confirmation";
import MyCourses from "../screens/mycourses/MyCourses";
import CourseComplete from "../screens/certificate/CourseComplete";
import MessageScreen from "../screens/message/MessageScreen";
import PersonalMessageScreen from "../screens/personalmessagescreen/PersonalMessageScreen";
import CallingScreen from "../screens/callingscreen/CallingScreen";
import CertificateDownload from "../screens/certificatedownload/CertificateDownload";
import Profile from "../screens/profile/Profile";
import LanguageScreen from "../screens/language/LanguageScreen";
import AddNewCard from "../screens/addnewcard/AddNewCard";
import TermsNConditions from "../screens/terms&conditions/TermsNConditions";
import InviteFriends from "../screens/invitefriends/InviteFriends";
import DarkMode from "../screens/darkmode/DarkMode";
import HomeTab from "../screens/hometab/HomeTab";
import Contact from "../screens/contact/Contact";
const AppNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" component={OnboardingScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="signin" component={SignIn} />
     <Stack.Screen name="letssignUp" component={LetsSingup} />
      <Stack.Screen name="fillprofile" component={FillProfile} />
      <Stack.Screen name="home" component={HomeTab} />
      <Stack.Screen name="createpin" component={CreatePin} />
      <Stack.Screen name="forgotpassword" component={ForgotPassword} />
      <Stack.Screen name="entercode" component={EnterCode} />
      <Stack.Screen name="newpassword" component={NewPassword} />
      <Stack.Screen name="tabscreens" component={TabScreens} />
      <Stack.Screen name="categories" component={Categories} />
      <Stack.Screen name="popularcourses" component={PopularCourses} />
      <Stack.Screen name="topmentors" component={TopMentors} />
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="filterscreen" component={FilterScreen} />
      <Stack.Screen name="coursedetails" component={CourseDetails} />
      <Stack.Screen name="notifcations" component={Notifications} />
      <Stack.Screen name="mentordetails" component={MentorDetails} />
      <Stack.Screen name="checkout" component={CheckOut} />
      <Stack.Screen name="confirmation" component={Confirmation} />
      <Stack.Screen name="mycourses" component={MyCourses} />
      <Stack.Screen name="certificate" component={CourseComplete} />
      <Stack.Screen name="message" component={MessageScreen} />
      <Stack.Screen name="personalmessage" component={PersonalMessageScreen} />
      <Stack.Screen name="callingscreen" component={CallingScreen} />
      <Stack.Screen
        name="certificatedownload"
        component={CertificateDownload}
      />
      <Stack.Screen name="contact" component={Contact} />

      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="language" component={LanguageScreen} />
      <Stack.Screen name="addcard" component={AddNewCard} />
      <Stack.Screen name="termsnconditions" component={TermsNConditions} />
      <Stack.Screen name="invitefriends" component={InviteFriends} />
      <Stack.Screen name="darkmode" component={DarkMode} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

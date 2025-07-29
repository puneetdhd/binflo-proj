import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import useGlobalStyles from "../../styles/globalStyles";
import CategoryCarousel from "../../components/categorycarousal/CategoryCarousal";
import PopularCourseAllTabCarousal from "../../components/popularcoursesAllTabCarousal/PopularCourseAllTabCarousal";
import ProcessCarousal from "../../components/processcarousal/ProcessCarousal";
import { useNavigation } from "@react-navigation/native";
import MentorCarousal from "../../components/mentorcarousal/MentorCarousal";

const HomeTab = () => {
  const [popularCourseTab, setPopularCourseTab] = useState("All");
  const globalStyles = useGlobalStyles();

  const navigation = useNavigation();

  const handleTab = (item) => {
    setPopularCourseTab(item);
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
    <>
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

      <ScrollView style={{ marginBottom: "18%" }}>
        <View>
          {/* You can create a slider carousel here if needed */}
          <View style={{ height: 200, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', margin: 20 }}>
            <Text>Slider Placeholder</Text>
          </View>
        </View>
        <View style={styles.headAndBTN}>
          <Text style={globalStyles.headingFour}>Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate("categories")}>
            <View style={globalStyles.miniButton}>
              <Text style={globalStyles.miniButtonText}>View all</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: "5%", marginBottom: "7%" }}>
          <CategoryCarousel data={homeTabCategories} />
        </View>
        <View style={styles.headAndBTN}>
          <Text style={globalStyles.headingFour}>Popular Courses</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("popularcourses")}
          >
            <View style={globalStyles.miniButton}>
              <Text style={globalStyles.miniButtonText}>View all</Text>
            </View>
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
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default HomeTab;
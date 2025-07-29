import React, { useContext } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CommonButton from "../../components/commonbutton/CommonButton";
import { OnBoardingData } from "../../utils/mockData";
import useGlobalStyles from "../../styles/globalStyles";
import ThemeContext from "../../components/Theme/ThemeContext";

const slideWidth = Dimensions.get("window").width;

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const globalStyles = useGlobalStyles();
  const theme = useContext(ThemeContext) || {};

  // Add fallback values for theme properties
  const safeTheme = {
    background: theme.background || "#fff",
    reverseBG: theme.reverseBG || "#46007C",
    reversewhiteOrBlack: theme.reversewhiteOrBlack || "#fff",
    ...theme
  };

  const ref = React.useRef(null);

  const Slide = ({ item }) => {
    if (!item) return null; // Add safety check
    
    return (
      <View
        style={[componentStyles.slideContainer, { backgroundColor: safeTheme.background }]}
      >
        {item.image}
        <View
          style={[componentStyles.blueContainer, { backgroundColor: safeTheme.reverseBG }]}
        >
          <Text
            style={[
              globalStyles.headingFour,
              { textAlign: "center", color: safeTheme.reversewhiteOrBlack },
            ]}
          >
            {item.title || ""}
          </Text>
          <Text
            style={[
              globalStyles.paragraph,
              { textAlign: "center", color: safeTheme.reversewhiteOrBlack },
            ]}
          >
            {item.para || ""}
          </Text>
        </View>
      </View>
    );
  };

  const handleNext = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    const offset = nextSlideIndex * slideWidth;
    if (nextSlideIndex < OnBoardingData.length) {
      ref?.current?.scrollToOffset({ offset });
    } else {
      setCurrentSlideIndex(nextSlideIndex - 1);
    }
  };

  const renderDotNotifier = (index) => {
    return (
      <View
        key={`dot-${index}`}
        style={[
          componentStyles.dot,
          {
            backgroundColor:
              currentSlideIndex === index ? "#FFB322" : "#f1f1f1",
          },
        ]}
      />
    );
  };

  // Add safety check for OnBoardingData
  if (!OnBoardingData || OnBoardingData.length === 0) {
    return (
      <View style={globalStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        ref={ref}
        data={OnBoardingData}
        contentContainerStyle={componentStyles.flatListContainer}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <Slide item={item} />}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            setCurrentSlideIndex(viewableItems[0].index || 0);
          }
        }}
        getItemLayout={(data, index) => ({
          length: slideWidth,
          offset: slideWidth * index,
          index,
        })}
        style={{ zIndex: 2 }}
      />
      <View style={[componentStyles.btns, { zIndex: 2 }]}>
        {currentSlideIndex === OnBoardingData.length - 1 ? (
          <CommonButton
            label="Get Started"
            style={componentStyles.buttonCls}
            onPress={() => navigation.navigate("signup")}
          />
        ) : (
          <CommonButton
            label="Next"
            style={componentStyles.buttonCls}
            onPress={handleNext}
          />
        )}
      </View>
      <View style={componentStyles.dotContainer}>
        {OnBoardingData.map((_, index) => (
          <View key={`dot-container-${index}`}>
            {renderDotNotifier(index)}
          </View>
        ))}
      </View>
    </>
  );
};

// Renamed to avoid confusion with globalStyles
const componentStyles = StyleSheet.create({
  slideContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: slideWidth,
    paddingBottom: 60,
  },
  blueContainer: {
    backgroundColor: "#46007C",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingTop: 35,
    paddingHorizontal: 30,
    gap: 10,
    paddingBottom: "38%",
  },
  flatListContainer: {
    flexGrow: 1,
  },
  btns: {
    position: "absolute",
    bottom: "2%",
    right: 15,
    width: "40%",
    alignSelf: "flex-end",
  },
  buttonCls: {
    marginTop: 100,
  },
  dotContainer: {
    position: "absolute",
    bottom: "5%",
    left: 15,
    zIndex: 100,
    flexDirection: "row",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default OnboardingScreen;
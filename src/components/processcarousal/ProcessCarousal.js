import React, { useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import useGlobalStyles from "../../styles/globalStyles";
import * as Progress from "react-native-progress";
import LessonIcon from "../../assets/svg/lessonIcon.svg";
import ThemeContext from "../Theme/ThemeContext";

const ProcessCarousal = ({ data = [], autoplay = true, autoplayInterval = 3000 }) => {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth - 50;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  const globalStyles = useGlobalStyles();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (autoplay && data.length > 1) {
      const interval = setInterval(() => {
        currentIndex.current = (currentIndex.current + 1) % data.length;
        flatListRef.current?.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }, autoplayInterval);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval, data.length]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.slide, { width: itemWidth }]}>
      <View style={{ padding: "5%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "70%",
            gap: 15,
          }}
        >
          {item.icon}
          <Text style={[globalStyles.paragraph, { color: theme.black }]}>
            {item.title}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: "5%",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          alignSelf: "center",
        }}
      >
        <Progress.Bar
          progress={item.progress || 0.5}
          width={200}
          height={8}
          color="#FFB322"
          animated={true}
          unfilledColor="#FFEAC2"
          borderColor="transparent"
        />
        <Text style={styles.percentage}>{item.percentage || "30%"}</Text>
      </View>
      <View style={styles.dottedLine} />
      <View style={styles.lesson}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <LessonIcon />
          <Text>{item.lesson}</Text>
        </View>
        <Text style={styles.learnNow}>Learn now</Text>
      </View>
    </TouchableOpacity>
  );

  const onScrollToIndexFailed = (info) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + 20} // item width + margin
        snapToAlignment="start"
        decelerationRate="fast"
        keyExtractor={(item, index) => `process-item-${index}`}
        contentContainerStyle={styles.flatListContent}
        onScrollToIndexFailed={onScrollToIndexFailed}
        getItemLayout={(data, index) => ({
          length: itemWidth + 20,
          offset: (itemWidth + 20) * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  slide: {
    elevation: 5,
    backgroundColor: "white",
    marginBottom: "5%",
    height: 230,
    marginRight: 20,
    marginTop: "5%",
    borderRadius: 15,
  },
  dottedLine: {
    borderWidth: 2,
    marginVertical: "5%",
    borderColor: "#A4A4A4",
    borderStyle: "dashed",
    borderRadius: 1,
    width: "100%",
  },
  percentage: {
    backgroundColor: "#FFB322",
    color: "white",
    paddingVertical: "1%",
    paddingHorizontal: "3%",
    borderRadius: 10,
  },
  lesson: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
  },
  learnNow: {
    backgroundColor: "#46007C",
    color: "white",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    borderRadius: 15,
  },
});

export default ProcessCarousal;
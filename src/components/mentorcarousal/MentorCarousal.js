import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import useGlobalStyles from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";

const MentorCarousal = ({ data = [], autoplay = true, autoplayInterval = 3000 }) => {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 4;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  const globalStyles = useGlobalStyles();
  const navigation = useNavigation();

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
    <TouchableOpacity
      style={[styles.slide, { width: itemWidth }]}
      onPress={() =>
        navigation.navigate("mentordetails", {
          data: {
            name: item.title,
            image: item.image,
            designation: item.designation,
          },
        })
      }
    >
      <Image source={item.image} style={styles.image} />
      <Text style={[globalStyles.headingFive, { textAlign: "center" }]}>
        {item.title}
      </Text>
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
        snapToInterval={itemWidth}
        snapToAlignment="start"
        decelerationRate="fast"
        keyExtractor={(item, index) => `mentor-${index}`}
        contentContainerStyle={styles.flatListContent}
        onScrollToIndexFailed={onScrollToIndexFailed}
        getItemLayout={(data, index) => ({
          length: itemWidth,
          offset: itemWidth * index,
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});

export default MentorCarousal;
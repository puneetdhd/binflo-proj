import React, { useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SaveIcon from "../../assets/svg/saveIcon.svg";
import useGlobalStyles from "../../styles/globalStyles";
import RatingIcon from "../../assets/svg/ratingIcon.svg";
import ThemeContext from "../Theme/ThemeContext";

const PopularCourseAllTabCarousal = ({ data = [], autoplay = true, autoplayInterval = 3000 }) => {
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
      <Image source={item.image} style={styles.image} />
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            paddingTop: "5%",
          }}
        >
          <Text style={globalStyles.redTextwithWeight}>{item.category}</Text>
          <SaveIcon />
        </View>

        <Text
          style={[
            globalStyles.headingFive,
            { fontWeight: "500", color: theme.black },
          ]}
        >
          {item.title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={globalStyles.violetText}>${item.price}/-</Text>
          <Text> | </Text>
          <RatingIcon />
          <Text style={{ fontWeight: "500" }}>{item.rating}</Text>
          <Text> | </Text>
          <Text>{item.std} Std</Text>
        </View>
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
        snapToInterval={itemWidth + 10} // item width + margin
        snapToAlignment="start"
        decelerationRate="fast"
        keyExtractor={(item, index) => `popular-course-${index}`}
        contentContainerStyle={styles.flatListContent}
        onScrollToIndexFailed={onScrollToIndexFailed}
        getItemLayout={(data, index) => ({
          length: itemWidth + 10,
          offset: (itemWidth + 10) * index,
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
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 300,
    elevation: 3,
    marginHorizontal: 5,
    paddingBottom: "8%",
    overflow: "hidden",
    marginBottom: "5%",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default PopularCourseAllTabCarousal;
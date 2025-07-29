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

const InprocessCarousal = ({ data = [], autoplay = true, autoplayInterval = 3000 }) => {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth - 50;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

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
      {/* Add your content here based on what should be displayed in the in-process carousel */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title || "In Progress Course"}</Text>
        <Text style={styles.description}>{item.description || "Course description"}</Text>
        {item.image && <Image source={item.image} style={styles.image} />}
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
        keyExtractor={(item, index) => `inprocess-${index}`}
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
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default InprocessCarousal;
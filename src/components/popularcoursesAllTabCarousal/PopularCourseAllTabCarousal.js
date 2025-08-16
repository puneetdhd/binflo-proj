import React, { useContext, useRef, useEffect, useState } from "react";
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
import ThemeContext from "../Theme/ThemeContext";

const PopularCourseAllTabCarousal = ({ data = [], autoplay = true, autoplayInterval = 3000 }) => {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth - 50;
  const flatListRef = useRef(null);
  const theoryNavRef = useRef(null);
  const currentIndex = useRef(0);
  const globalStyles = useGlobalStyles();
  const theme = useContext(ThemeContext);

  // State for selected theory filter
  const [selectedTheory, setSelectedTheory] = useState('All');

  // Complete theory options with all details from SubscriptionPricing component
  const theoryOptions = {
    'Dutch Car Theory': {
      emoji: '🚗',
      color: '#4ADE80',
      bgColor: '#F0FDF4',
      image: require("../../assets/images/advertisementIMG.png"),
      features: [
        'Updated CBR exam 2025',
        'Hazard recognition & risk',
        'Traffic rules & right-of-way rules',
        'Traffic signs & road markings',
        'Speeds & alcohol limits',
        'Vehicle technology & environment'
      ],
      pricing: {
        day: { discount: '60% discount', price: '9', cents: '99', originalPrice: '€25', duration: '1 day access', title: 'Car day' },
        week: { discount: '67% discount', price: '14', cents: '99', originalPrice: '€45', duration: '7 days access', title: 'Car week' },
        month: { discount: '73% discount', price: '19', cents: '99', originalPrice: '€75', duration: '30 days access', title: 'Car month' }
      }
    },
    'Boating license 1 Theory': {
      emoji: '⛵',
      color: '#60A5FA',
      bgColor: '#EFF6FF',
      image: require("../../assets/images/advertisementIMG.png"),
      features: [
        'Updated CBR exam 2025',
        'Inland Navigation Regulations (BPR)',
        'Markings & beacons',
        'Right-of-way rules on water',
        'Safe sailing & maneuvering',
        'Maritime radio & emergency procedures'
      ],
      pricing: {
        day: { discount: '60% discount', price: '9', cents: '99', originalPrice: '€25', duration: '1 day access', title: 'Boating license 1 day' },
        week: { discount: '67% discount', price: '14', cents: '99', originalPrice: '€45', duration: '7 days access', title: 'Boating license 1 week' },
        month: { discount: '73% discount', price: '19', cents: '99', originalPrice: '€75', duration: '30 days access', title: 'Boating license 1 month' }
      }
    },
    'Motor Theory': {
      emoji: '🏍️',
      color: '#F87171',
      bgColor: '#FEF2F2',
      image: require("../../assets/images/advertisementIMG.png"),
      features: [
        'Updated CBR exam 2025',
        'Motor Vehicle Control (AVB)',
        'Road Traffic Participation (AVD)',
        'Risk perception when riding a motorcycle',
        'Equipment & safety',
        'Specific traffic situations'
      ],
      pricing: {
        day: { discount: '60% discount', price: '9', cents: '99', originalPrice: '€25', duration: '1 day access', title: 'Motorcycle day' },
        week: { discount: '67% discount', price: '14', cents: '99', originalPrice: '€45', duration: '7 days access', title: 'Motor week' },
        month: { discount: '73% discount', price: '19', cents: '99', originalPrice: '€75', duration: '30 days access', title: 'Motor month' }
      }
    },
    'Moped Theory': {
      emoji: '🛵',
      color: '#A78BFA',
      bgColor: '#F5F3FF',
      image: require("../../assets/images/advertisementIMG.png"),
      features: [
        'Updated CBR exam 2025',
        'Basic traffic rules',
        'Road signs & markings',
        'Safety equipment',
        'Traffic participation',
        'Risk awareness'
      ],
      pricing: {
        day: { discount: '60% discount', price: '9', cents: '99', originalPrice: '€25', duration: '1 day access', title: 'Moped day' },
        week: { discount: '67% discount', price: '14', cents: '99', originalPrice: '€45', duration: '7 days access', title: 'Moped week' },
        month: { discount: '73% discount', price: '19', cents: '99', originalPrice: '€75', duration: '30 days access', title: 'Moped month' }
      }
    },
    'Taxi Theory': {
      emoji: '🚕',
      color: '#FBBF24',
      bgColor: '#FFFBEB',
      image: require("../../assets/images/advertisementIMG.png"),
      features: [
        'Updated CBR exam 2025',
        'Professional driving regulations',
        'Customer service standards',
        'Route optimization',
        'Safety protocols',
        'Legal requirements'
      ],
      pricing: {
        day: { discount: '60% discount', price: '9', cents: '99', originalPrice: '€25', duration: '1 day access', title: 'Taxi day' },
        week: { discount: '67% discount', price: '14', cents: '99', originalPrice: '€45', duration: '7 days access', title: 'Taxi week' },
        month: { discount: '73% discount', price: '19', cents: '99', originalPrice: '€75', duration: '30 days access', title: 'Taxi month' }
      }
    },
    'Belgium Car Theory': {
      emoji: '🚚',
      color: '#FB923C',
      bgColor: '#FFF7ED',
      image: require("../../assets/images/advertisementIMG.png"),
      features: [
        'Updated Belgian exam 2025',
        'Belgian traffic regulations',
        'Road signs & markings',
        'Safety requirements',
        'Emergency procedures',
        'Environmental regulations'
      ],
      pricing: {
        day: { discount: '60% discount', price: '9', cents: '99', originalPrice: '€25', duration: '1 day access', title: 'Belgium Car day' },
        week: { discount: '67% discount', price: '14', cents: '99', originalPrice: '€45', duration: '7 days access', title: 'Belgium Car week' },
        month: { discount: '73% discount', price: '19', cents: '99', originalPrice: '€75', duration: '30 days access', title: 'Belgium Car month' }
      }
    }
  };

  // Theory navigation items
  const theoryNavItems = [
    'All',
    'Dutch Car Theory',
    'Boating license 1 Theory',
    'Motor Theory',
    'Moped Theory'
  ];

  // Create course cards for all theory options
  const createTheoryCards = () => {
    const theoryCourses = [];
    Object.keys(theoryOptions).forEach((theoryType, index) => {
      const theory = theoryOptions[theoryType];
      Object.keys(theory.pricing).forEach((duration, priceIndex) => {
        const pricing = theory.pricing[duration];
        theoryCourses.push({
          id: `theory-${index}-${priceIndex}`,
          title: `${theoryType.replace(' Theory', '')} ${duration.charAt(0).toUpperCase() + duration.slice(1)} Course`,
          category: theoryType,
          image: theory.image,
          std: duration === 'day' ? '1' : duration === 'week' ? '7' : '30',
          theoryType: theoryType,
          pricingType: duration
        });
      });
    });
    return theoryCourses;
  };

  // Get course details for both original data and theory cards
  const getCourseDetails = (item) => {
    // If it's a theory card, use direct mapping
    if (item.theoryType && item.pricingType) {
      const theory = theoryOptions[item.theoryType];
      const pricing = theory.pricing[item.pricingType];
      return {
        ...theory,
        ...pricing,
        fullPrice: `€${pricing.price}.${pricing.cents}`,
        theoryImage: theory.image,
        theoryType: item.theoryType
      };
    }

    // For original data items, map based on category or title
    let theoryType = 'Dutch Car Theory'; // default
    let pricingType = 'day'; // default
    
    const category = item.category?.toLowerCase() || '';
    const title = item.title?.toLowerCase() || '';
    
    if (category.includes('ui') || category.includes('ux')) {
      theoryType = 'Dutch Car Theory';
      pricingType = 'day';
    } else if (category.includes('graphic')) {
      theoryType = 'Motor Theory';
      pricingType = 'week';
    } else if (title.includes('boating') || category.includes('boating')) {
      theoryType = 'Boating license 1 Theory';
      pricingType = 'month';
    } else if (title.includes('motor') || category.includes('motor')) {
      theoryType = 'Motor Theory';
      pricingType = 'week';
    } else if (title.includes('moped') || category.includes('moped')) {
      theoryType = 'Moped Theory';
      pricingType = 'day';
    } else if (title.includes('taxi') || category.includes('taxi')) {
      theoryType = 'Taxi Theory';
      pricingType = 'week';
    } else if (title.includes('belgium') || category.includes('belgium')) {
      theoryType = 'Belgium Car Theory';
      pricingType = 'month';
    }

    const theory = theoryOptions[theoryType];
    const pricing = theory.pricing[pricingType];

    return {
      ...theory,
      ...pricing,
      fullPrice: `€${pricing.price}.${pricing.cents}`,
      theoryImage: theory.image,
      theoryType: theoryType
    };
  };

  // Combine original data with theory cards
  const allCourseData = [...data, ...createTheoryCards()];

  // Filter data based on selected theory
  const filteredCourseData = selectedTheory === 'All' 
    ? allCourseData 
    : allCourseData.filter(item => {
        const courseDetails = getCourseDetails(item);
        return courseDetails.theoryType === selectedTheory || item.theoryType === selectedTheory;
      });

  useEffect(() => {
    if (autoplay && filteredCourseData.length > 1) {
      const interval = setInterval(() => {
        currentIndex.current = (currentIndex.current + 1) % filteredCourseData.length;
        flatListRef.current?.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }, autoplayInterval);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval, filteredCourseData.length]);

  const handleTheorySelect = (theory) => {
    setSelectedTheory(theory);
    currentIndex.current = 0;
    // Reset to first item when changing theory
    if (flatListRef.current && filteredCourseData.length > 0) {
      flatListRef.current.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
  };

  const renderTheoryTab = ({ item }) => {
    const isSelected = item === selectedTheory;
    
    return (
      <TouchableOpacity
        style={[
          styles.theoryTab,
          isSelected && styles.selectedTheoryTab
        ]}
        onPress={() => handleTheorySelect(item)}
      >
        <Text style={[
          styles.theoryTabText,
          isSelected && styles.selectedTheoryTabText
        ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    const courseDetails = getCourseDetails(item);

    return (
      <View style={[styles.slide, { width: itemWidth }]}>
        <TouchableOpacity activeOpacity={0.8}>
          {/* Image Block */}
          <Image source={item.image} style={styles.image} />
          
          {/* All Details Below Image */}
          <View style={styles.detailsContainer}>
            {/* Header with Category and Save Icon */}
            <View style={styles.headerRow}>
              <View style={styles.categoryContainer}>
                <Text style={styles.itemCategoryEmoji}>{courseDetails.emoji}</Text>
                <Text style={globalStyles.redTextwithWeight}>
                  {item.theoryType ? item.theoryType : item.category}
                </Text>
              </View>
              <SaveIcon />
            </View>

            {/* Course Title */}
            <Text style={[
              globalStyles.headingFive,
              { fontWeight: "500", color: theme.black, marginBottom: 8 }
            ]}>
              {item.title}
            </Text>

            {/* Course Type */}
            <Text style={[styles.courseTypeText, { color: courseDetails.color }]}>
              {courseDetails.title}
            </Text>

            {/* First Line: Discount and Study Hours */}
            <View style={styles.firstInfoLine}>
              <View style={[styles.discountBadge, { backgroundColor: courseDetails.color }]}>
                <Text style={styles.discountText}>{courseDetails.discount}</Text>
              </View>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.studyHours}>{item.std} Std</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.duration}>{courseDetails.duration}</Text>
            </View>

            {/* Features Description */}
            <View style={styles.featuresContainer}>
              {courseDetails.features.slice(0, 3).map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <View style={[styles.bullet, { backgroundColor: courseDetails.color }]} />
                  <Text style={styles.featureText} numberOfLines={1}>{feature}</Text>
                </View>
              ))}
              {courseDetails.features.length > 3 && (
                <Text style={[styles.moreFeatures, { color: courseDetails.color }]}>
                  +{courseDetails.features.length - 3} more features
                </Text>
              )}
            </View>

            {/* Pricing */}
            <View style={styles.pricingContainer}>
              <Text style={styles.originalPrice}>{courseDetails.originalPrice}</Text>
              <Text style={[styles.currentPrice, { color: courseDetails.color }]}>
                {courseDetails.fullPrice}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
      {/* Theory Navigation */}
      <View style={styles.theoryNavContainer}>
        <FlatList
          ref={theoryNavRef}
          data={theoryNavItems}
          renderItem={renderTheoryTab}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.theoryNavContent}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          bounces={false}
          decelerationRate="fast"
        />
      </View>

      {/* Course Cards FlatList */}
      <FlatList
        ref={flatListRef}
        data={filteredCourseData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + 10} // item width + margin
        snapToAlignment="start"
        decelerationRate="fast"
        keyExtractor={(item, index) => `course-${item.id || index}`}
        contentContainerStyle={styles.flatListContent}
        onScrollToIndexFailed={onScrollToIndexFailed}
        scrollEnabled={true}
        nestedScrollEnabled={true}
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
  // Theory Navigation Styles
  theoryNavContainer: {
    marginBottom: 15,
    height: 50,
  },
  theoryNavContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  theoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 15,
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTheoryTab: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  theoryTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedTheoryTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Existing Course Card Styles
  flatListContent: {
    paddingHorizontal: 10,
  },
  slide: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  detailsContainer: {
    padding: 15,
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemCategoryEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  courseTypeText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  firstInfoLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  separator: {
    marginHorizontal: 8,
    color: "#9CA3AF",
    fontSize: 12,
  },
  studyHours: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  duration: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  featuresContainer: {
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginRight: 8,
    marginTop: 6,
  },
  featureText: {
    fontSize: 11,
    color: "#374151",
    flex: 1,
    lineHeight: 16,
  },
  moreFeatures: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 4,
    marginLeft: 11,
  },
  pricingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  originalPrice: {
    fontSize: 13,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default PopularCourseAllTabCarousal;
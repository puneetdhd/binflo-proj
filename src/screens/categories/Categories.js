import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import useGlobalStyles from "../../styles/globalStyles";
import Header from "../../components/header/Header";
import SearchBar from "../../components/searchbar/SearchBar";
import { homeTabCategories } from "../../utils/mockData";

const Categories = () => {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 60) / 2; // 2 cards per row with spacing
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('Programming');

  const globalStyles = useGlobalStyles();

  // Enhanced categories with emojis and colors - no background colors
  const enhancedCategories = [
    { id: 1, name: 'Programming', emoji: '💻', color: '#4ADE80' },
    { id: 2, name: 'Design', emoji: '🎨', color: '#60A5FA' },
    { id: 3, name: 'Business', emoji: '📊', color: '#F87171' },
    { id: 4, name: 'Marketing', emoji: '📢', color: '#A78BFA' },
    { id: 5, name: 'Photography', emoji: '📸', color: '#FBBF24' },
    { id: 6, name: 'Music', emoji: '🎵', color: '#FB923C' },
  ];

  const [filteredCategories, setFilteredCategories] = useState(enhancedCategories);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = enhancedCategories.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  // Dynamic course data based on selected category
  const getCourseData = () => {
    const baseCourses = {
      'Programming': [
        { name: 'JavaScript Fundamentals', level: 'Beginner' },
        { name: 'React Development', level: 'Intermediate' },
        { name: 'Python for Beginners', level: 'Beginner' },
        { name: 'Full Stack Development', level: 'Advanced' },
        { name: 'Mobile App Development', level: 'Intermediate' },
        { name: 'Data Structures & Algorithms', level: 'Advanced' }
      ],
      'Design': [
        { name: 'UI/UX Design Basics', level: 'Beginner' },
        { name: 'Adobe Photoshop Mastery', level: 'Intermediate' },
        { name: 'Figma for Designers', level: 'Beginner' },
        { name: 'Brand Identity Design', level: 'Advanced' },
        { name: 'Motion Graphics', level: 'Intermediate' },
        { name: 'Web Design Principles', level: 'Advanced' }
      ],
      'Business': [
        { name: 'Business Strategy', level: 'Beginner' },
        { name: 'Project Management', level: 'Intermediate' },
        { name: 'Leadership Skills', level: 'Advanced' },
        { name: 'Financial Planning', level: 'Intermediate' },
        { name: 'Entrepreneurship', level: 'Advanced' },
        { name: 'Digital Transformation', level: 'Expert' }
      ],
      'Marketing': [
        { name: 'Digital Marketing', level: 'Beginner' },
        { name: 'Social Media Strategy', level: 'Intermediate' },
        { name: 'Content Marketing', level: 'Beginner' },
        { name: 'Email Marketing', level: 'Intermediate' },
        { name: 'SEO Optimization', level: 'Advanced' },
        { name: 'Brand Management', level: 'Advanced' }
      ],
      'Photography': [
        { name: 'Portrait Photography', level: 'Beginner' },
        { name: 'Landscape Photography', level: 'Intermediate' },
        { name: 'Photo Editing', level: 'Beginner' },
        { name: 'Studio Lighting', level: 'Advanced' },
        { name: 'Wedding Photography', level: 'Intermediate' },
        { name: 'Commercial Photography', level: 'Expert' }
      ],
      'Music': [
        { name: 'Music Production', level: 'Beginner' },
        { name: 'Guitar Lessons', level: 'Beginner' },
        { name: 'Piano Fundamentals', level: 'Beginner' },
        { name: 'Music Theory', level: 'Intermediate' },
        { name: 'Audio Engineering', level: 'Advanced' },
        { name: 'Songwriting', level: 'Intermediate' }
      ]
    };

    const courses = baseCourses[selectedCategory] || baseCourses['Programming'];
    const prices = ['12.99', '19.99', '29.99', '39.99', '49.99', '59.99'];
    const originalPrices = ['€32.99', '€59.99', '€109.99', '€129.99', '€139.99', '€239.99'];
    const discounts = ['60% discount', '67% discount', '73% discount', '70% discount', '65% discount', '75% discount'];

    return courses.map((course, index) => ({
      id: index + 1,
      title: `${course.name} - ${course.level}`,
      discount: discounts[index] || '60% discount',
      price: prices[index]?.split('.')[0] || '12',
      cents: prices[index]?.split('.')[1] || '99',
      originalPrice: originalPrices[index] || '€32.99',
      duration: `${4 + index * 2} weeks course`,
      features: [
        `${course.level} level content`,
        'Hands-on projects',
        'Community support',
        'Certificate of completion',
        'Lifetime access',
        '24/7 support'
      ]
    }));
  };

  const courseData = getCourseData();
  const selectedOption = enhancedCategories.find(option => option.name === selectedCategory);
  const themeColor = selectedOption?.color || '#4ADE80';

  return (
    <View style={globalStyles.container}>
      <Header label="Categories" />
      <View style={globalStyles.contents}>
        <SearchBar onChangeText={handleSearch} value={searchQuery} />
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.headerText}>Select a category to see available courses.</Text>
          
          {/* Category Options - Wrapping Layout */}
          <View style={styles.categorySection}>
            <View style={styles.categoryWrapper}>
              {filteredCategories.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.categoryOption,
                    {
                      borderColor: item.color,
                      borderWidth: selectedCategory === item.name ? 2 : 1,
                    }
                  ]}
                  onPress={() => setSelectedCategory(item.name)}
                >
                  <Text style={styles.categoryEmoji}>{item.emoji}</Text>
                  <Text style={[
                    styles.categoryText,
                    { color: item.color }
                  ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Course Cards - 2 per row, all visible */}
          <View style={styles.coursesSection}>
            <Text style={[globalStyles.headingFour, { marginBottom: 20, textAlign: 'center' }]}>
              {selectedCategory} Courses
            </Text>
            <View style={styles.courseGrid}>
              {courseData.map((item, index) => (
                <View key={`course-${item.id}`} style={[styles.courseCard, { width: cardWidth }]}>
                  <View style={[styles.discountBadge, { backgroundColor: themeColor }]}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                  </View>
                  
                  <Text style={[styles.courseTitle, { color: themeColor }]} numberOfLines={2}>
                    {item.title}
                  </Text>
                  
                  <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                    <View style={styles.currentPriceRow}>
                      <Text style={styles.currency}>€</Text>
                      <Text style={styles.price}>{item.price}</Text>
                      <Text style={styles.cents}>.{item.cents}</Text>
                    </View>
                  </View>

                  <Text style={styles.duration}>{item.duration}</Text>

                  <View style={styles.featuresContainer}>
                    {item.features.slice(0, 3).map((feature, featureIndex) => (
                      <View key={featureIndex} style={styles.featureRow}>
                        <View style={styles.bullet} />
                        <Text style={styles.featureText} numberOfLines={2}>{feature}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.enrollButton, { backgroundColor: themeColor }]}>
                      <Text style={styles.enrollButtonText}>Enroll</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.previewButton, { borderColor: themeColor }]}>
                      <Text style={[styles.previewButtonText, { color: themeColor }]}>Preview</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Original Categories Grid */}
          <View style={styles.originalCategoriesSection}>
   
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  categorySection: {
    marginBottom: 25,
  },
  categoryWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 10,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'transparent',
    minWidth: 120,
    justifyContent: 'center',
  },
  categoryEmoji: {
    fontSize: 14,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
  },
  coursesSection: {
    marginBottom: 30,
  },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    marginBottom: 15,
    minHeight: 280,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 5,
    lineHeight: 18,
  },
  priceContainer: {
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  currentPriceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  currency: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 2,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 26,
  },
  cents: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 2,
  },
  duration: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 12,
  },
  featuresContainer: {
    marginBottom: 15,
    flex: 1,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#111827',
    marginRight: 8,
    marginTop: 5,
  },
  featureText: {
    fontSize: 10,
    color: '#374151',
    flex: 1,
    lineHeight: 13,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  enrollButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  previewButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
  },
  previewButtonText: {
    fontSize: 11,
    fontWeight: '600',
  },
  originalCategoriesSection: {
    marginTop: 30,
    paddingBottom: 20,
  },
  categories: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: "2%",
  },
  originalCategoryItem: {
    alignItems: 'center',
    width: '30%',
  },
  originalImageContainer: {
    width: 65,
    height: 65,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  originalCategoryEmoji: {
    fontSize: 24,
  },
});

export default Categories;
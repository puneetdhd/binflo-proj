import React, { useContext, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import useGlobalStyles from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../Theme/ThemeContext";

const SubscriptionPricing = ({ data = [] }) => {
  const screenWidth = Dimensions.get("window").width;
  const theoryItemWidth = 140; // Fixed width for theory options
  const cardWidth = (screenWidth - 80) / 2.2; // Smaller cards
  const [selectedTheory, setSelectedTheory] = useState('Dutch Car Theory');
  
  const theoryFlatListRef = useRef(null);
  const pricingFlatListRef = useRef(null);

  const globalStyles = useGlobalStyles();
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

  // Theory options with emojis and colors
  const theoryOptions = [
    { id: 1, name: 'Dutch Car Theory', emoji: '🚗', color: '#4ADE80', bgColor: '#F0FDF4' },
    { id: 2, name: 'Boating license 1 Theory', emoji: '⛵', color: '#60A5FA', bgColor: '#EFF6FF' },
    { id: 3, name: 'Motor Theory', emoji: '🏍️', color: '#F87171', bgColor: '#FEF2F2' },
    { id: 4, name: 'Moped Theory', emoji: '🛵', color: '#A78BFA', bgColor: '#F5F3FF' },
    { id: 5, name: 'Taxi Theory', emoji: '🚕', color: '#FBBF24', bgColor: '#FFFBEB' },
    { id: 6, name: 'Belgium Car Theory', emoji: '🚚', color: '#FB923C', bgColor: '#FFF7ED' },
  ];

  // Dynamic pricing plans based on selected theory
  const getPricingPlans = () => {
    const baseFeatures = {
      'Dutch Car Theory': [
        'Updated CBR exam 2025',
        'Hazard recognition & risk',
        'Traffic rules & right-of-way rules',
        'Traffic signs & road markings',
        'Speeds & alcohol limits',
        'Vehicle technology & environment'
      ],
      'Boating license 1 Theory': [
        'Updated CBR exam 2025',
        'Inland Navigation Regulations (BPR)',
        'Markings & beacons',
        'Right-of-way rules on water',
        'Safe sailing & maneuvering',
        'Maritime radio & emergency procedures'
      ],
      'Motor Theory': [
        'Updated CBR exam 2025',
        'Motor Vehicle Control (AVB)',
        'Road Traffic Participation (AVD)',
        'Risk perception when riding a motorcycle',
        'Equipment & safety',
        'Specific traffic situations'
      ],
      'Moped Theory': [
        'Updated CBR exam 2025',
        'Basic traffic rules',
        'Road signs & markings',
        'Safety equipment',
        'Traffic participation',
        'Risk awareness'
      ],
      'Taxi Theory': [
        'Updated CBR exam 2025',
        'Professional driving regulations',
        'Customer service standards',
        'Route optimization',
        'Safety protocols',
        'Legal requirements'
      ],
      'Belgium Car Theory': [
        'Updated Belgian exam 2025',
        'Belgian traffic regulations',
        'Road signs & markings',
        'Safety requirements',
        'Emergency procedures',
        'Environmental regulations'
      ]
    };

    const features = baseFeatures[selectedTheory] || baseFeatures['Dutch Car Theory'];
    const theoryType = selectedTheory.replace(' Theory', '').toLowerCase();
    const shortType = theoryType.includes('boating') ? 'Boating license 1' : 
                     theoryType.includes('motor') ? 'Motor' :
                     theoryType.includes('moped') ? 'Moped' :
                     theoryType.includes('taxi') ? 'Taxi' :
                     theoryType.includes('belgium') ? 'Belgium Car' : 'Car';

    return [
      {
        id: 1,
        title: `${shortType === 'Boating license 1' ? 'Boating license 1 day' : shortType === 'Motor' ? 'Motorcycle day' : `${shortType} day`}`,
        discount: '60% discount',
        price: '9',
        cents: '99',
        originalPrice: '€25',
        duration: '1 day access',
        features: features
      },
      {
        id: 2,
        title: `${shortType === 'Boating license 1' ? 'Boating license 1 week' : shortType === 'Motor' ? 'Motor week' : `${shortType} week`}`,
        discount: '67% discount',
        price: '14',
        cents: '99',
        originalPrice: '€45',
        duration: '7 days access',
        features: features
      },
      {
        id: 3,
        title: `${shortType === 'Boating license 1' ? 'Boating license 1 month' : shortType === 'Motor' ? 'Motor month' : `${shortType} month`}`,
        discount: '73% discount',
        price: '19',
        cents: '99',
        originalPrice: '€75',
        duration: '30 days access',
        features: features
      }
    ];
  };

  const pricingPlans = getPricingPlans();

  const renderTheoryOption = ({ item }) => {
    const isSelected = selectedTheory === item.name;
    return (
      <TouchableOpacity
        style={[
          styles.theoryOption,
          { width: theoryItemWidth },
          {
            backgroundColor: isSelected ? item.color : item.bgColor,
            borderColor: isSelected ? item.color : '#E5E7EB',
          }
        ]}
        onPress={() => setSelectedTheory(item.name)}
      >
        <Text style={styles.theoryEmoji}>{item.emoji}</Text>
        <Text style={[
          styles.theoryText,
          { color: isSelected ? '#FFFFFF' : item.color }
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPricingCard = ({ item }) => {
    const selectedOption = theoryOptions.find(option => option.name === selectedTheory);
    const themeColor = selectedOption?.color || '#4ADE80';
    
    return (
      <View style={[styles.pricingCard, { width: cardWidth }]}>
        <View style={[styles.discountBadge, { backgroundColor: themeColor }]}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
        
        <Text style={[styles.planTitle, { color: themeColor }]} numberOfLines={2}>{item.title}</Text>
        
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
          {item.features.slice(0, 3).map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View style={styles.bullet} />
              <Text style={styles.featureText} numberOfLines={2}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.payButton, { backgroundColor: themeColor }]}>
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.seeButton, { borderColor: themeColor }]}>
            <Text style={[styles.seeButtonText, { color: themeColor }]}>See course</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onTheoryScrollToIndexFailed = (info) => {
    setTimeout(() => {
      theoryFlatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    }, 100);
  };

  const onPricingScrollToIndexFailed = (info) => {
    setTimeout(() => {
      pricingFlatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select a theory to see pricing options.</Text>
      
      {/* Theory Options FlatList */}
      <View style={styles.theorySection}>
        <FlatList
          ref={theoryFlatListRef}
          data={theoryOptions}
          renderItem={renderTheoryOption}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={theoryItemWidth + 8} // item width + margin
          snapToAlignment="start"
          decelerationRate="fast"
          keyExtractor={(item) => `theory-${item.id}`}
          contentContainerStyle={styles.theoryFlatListContent}
          onScrollToIndexFailed={onTheoryScrollToIndexFailed}
          getItemLayout={(data, index) => ({
            length: theoryItemWidth + 8,
            offset: (theoryItemWidth + 8) * index,
            index,
          })}
        />
      </View>

      {/* Pricing Cards FlatList */}
      <View style={styles.pricingSection}>
        <FlatList
          ref={pricingFlatListRef}
          data={pricingPlans}
          renderItem={renderPricingCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + 12} // item width + margin
          snapToAlignment="start"
          decelerationRate="fast"
          keyExtractor={(item) => `pricing-${item.id}`}
          contentContainerStyle={styles.pricingFlatListContent}
          onScrollToIndexFailed={onPricingScrollToIndexFailed}
          getItemLayout={(data, index) => ({
            length: cardWidth + 12,
            offset: (cardWidth + 12) * index,
            index,
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  theorySection: {
    marginBottom: 15,
  },
  theoryFlatListContent: {
    paddingHorizontal: 15,
  },
  theoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 4,
    height: 36,
  },
  theoryEmoji: {
    fontSize: 12,
    marginRight: 5,
  },
  theoryText: {
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
  },
  pricingSection: {
    flex: 1,
  },
  pricingFlatListContent: {
    paddingHorizontal: 15,
  },
  pricingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    minHeight: 240,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 2,
  },
  priceContainer: {
    marginBottom: 5,
  },
  originalPrice: {
    fontSize: 11,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginBottom: 1,
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
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 28,
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
    marginBottom: 10,
  },
  featuresContainer: {
    marginBottom: 12,
    flex: 1,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#111827',
    marginRight: 6,
    marginTop: 4,
  },
  featureText: {
    fontSize: 10,
    color: '#374151',
    flex: 1,
    lineHeight: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  payButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  seeButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
  },
  seeButtonText: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default SubscriptionPricing;
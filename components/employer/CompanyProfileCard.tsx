import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../ui/ThemedText';

interface CompanyProfileCardProps {
  companyName: string;
  location: string;
  rating: number;
  description: string;
  logoUrl?: string;
}

/**
 * Displays the employer's company profile summary card.
 * Shows company logo, name, location, star rating, and a short description.
 */
const CompanyProfileCard = ({
  companyName,
  location,
  rating,
  description,
  logoUrl,
}: CompanyProfileCardProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      <View style={styles.topRow}>
        {/* Company Logo */}
        <View style={[styles.logoContainer, { borderColor: theme.background }]}>
          {logoUrl ? (
            <Image source={{ uri: logoUrl }} style={styles.logoImage} />
          ) : (
            <View style={[styles.logoPlaceholder, { backgroundColor: theme.background }]}>
              <Ionicons name="business" size={28} color={theme.iconColor} />
            </View>
          )}
        </View>

        {/* Company Info */}
        <View style={styles.infoContainer}>
          <ThemedText title style={styles.companyName}>
            {companyName}
          </ThemedText>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={theme.iconColor} />
            <ThemedText style={styles.locationText}>{location}</ThemedText>
          </View>
        </View>

        {/* Star Rating */}
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#F59E0B" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>

      {/* Description */}
      <ThemedText style={styles.description} numberOfLines={3}>
        {description}
      </ThemedText>
    </View>
  );
};

export default CompanyProfileCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: '#0000008b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoContainer: {
    width: 52,
    height: 52,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 13,
    marginLeft: 4,
    opacity: 0.7,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F59E0B',
    marginLeft: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.7,
  },
});

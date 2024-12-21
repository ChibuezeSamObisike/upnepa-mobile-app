import { formatNumberWithCommas } from '@/utils/helpers';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PaidCardProps {
  title: string;
  value: number;
  percentage: string;
  style?: any;
}

const PaidCard: React.FC<PaidCardProps> = ({
  title,
  value,
  percentage,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title || 'Total Money Paid'}</Text>
      <Text style={styles.value}>
        {formatNumberWithCommas(value) || '₦32000'}
      </Text>
      <Text style={styles.percentage}>
        {percentage}% increase in the last 7 days
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 8,
    width: '100%',
    backgroundColor: '#fff',
    padding: 16, // MUI p={2} ≈ 16px if theme spacing is 8px
  },
  title: {
    fontSize: 16,
  },
  value: {
    fontWeight: '600',
    fontSize: 36,
    marginTop: 8, // This approximates "pt={2}" spacing
  },
  percentage: {
    fontSize: 14,
    color: '#00a710',
  },
});

export default PaidCard;

// screens/OrderDetails.tsx

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getElectricityById, getOrder } from '../services/dashboard';
import { parseISO, format } from 'date-fns';
import { formatNumberWithCommas } from '@/utils/helpers';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons as an example
import { useColorScheme } from 'react-native';

import SavedMeter from '../components/SavedMeter';
// import greenTick from '../assets/green-tick.png'; // Convert SVG to PNG or use react-native-svg

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, 'EEE, MMM do yyyy HH:mm:ss');
};

const formatString = (input: string): string => {
  return input
    ?.trim()
    ?.replace(/(.{4})/g, '$1-')
    .slice(0, -1);
};

const OrderDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  // Assuming the 'id' is passed as a route parameter
  const { id } = route.params as { id: string };

  const { isLoading: isEleLoading, data: eleData } = useQuery({
    queryKey: ['GET_ELE', id],
    queryFn: () => getElectricityById(id),
  });

  const { isLoading: isOrderLoading, data: orderData } = useQuery({
    queryKey: ['GET_OR', id],
    queryFn: () => getOrder(id),
  });

  const handleCopy = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Toast.show({
      type: 'success',
      text1: 'Copied to clipboard',
    });
  };

  const handleDownload = async () => {
    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { display: flex; align-items: center; }
              .header img { width: 25px; margin-right: 10px; }
              .title { font-size: 26px; font-weight: bold; margin-bottom: 10px; }
              .subtitle { color: #707070; font-size: 16px; font-weight: 400; margin-bottom: 20px; }
              .section { margin-bottom: 20px; }
              .section-title { font-size: 20px; font-weight: 600; margin-bottom: 10px; }
              .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
              .button { margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
             
              <div>Your Transaction is successful</div>
            </div>
            <div class="section">
              <div class="title">Order Details</div>
              <div class="subtitle">Here are the details of your order. Thank you for your purchase.</div>
              <!-- Include SavedMeter component content here -->
              <div class="section-details">
                <!-- Render ORDER_DETAILS -->
                ${ORDER_DETAILS.map(
                  (item) => `
                  <div class="item">
                    <span>${item.title}</span>
                    <span>${item.value}</span>
                  </div>
                `
                ).join('')}
              </div>
            </div>
            <div class="section">
              <div class="section-title">Payment Details</div>
              <!-- Render PAYMENT_DETAILS -->
              ${PAYMENT_DETAILS.map(
                (item) => `
                <div class="item">
                  <span>${item.title}</span>
                  <span>${item.value}</span>
                </div>
              `
              ).join('')}
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to generate PDF',
      });
    }
  };

  // Helper function to convert image to Base64
  const convertImageToBase64 = async (image: any): Promise<string> => {
    // Implement your logic to convert image to base64 if necessary
    // For simplicity, consider using a PNG image and importing it as Base64
    // Or use react-native-svg to render the SVG as a component
    return '';
  };

  const ORDER_DETAILS =
    isEleLoading || isOrderLoading
      ? []
      : [
          {
            title: 'Reference Number',
            value: orderData?.data?.reference,
          },
          {
            title: 'Date',
            value: formatDate(eleData?.data?.created_at),
          },
          {
            title: 'Token',
            value:
              eleData?.data?.purchased_code ||
              formatString(eleData?.data?.purchased_code?.split(':')?.[1]),
          },
          {
            title: 'Phone Number',
            value: orderData?.data?.phone_number, // Replace with appropriate data source
          },
        ];

  const PAYMENT_DETAILS =
    isEleLoading || isOrderLoading
      ? []
      : [
          {
            title: 'Electricity Payment',
            value: '₦' + formatNumberWithCommas(orderData?.data?.amount / 100),
          },
          {
            title: 'Service Charge',
            value: '₦0.00',
          },
          {
            title: 'Outstanding',
            value: '₦0.00',
          },
          {
            title: 'Gateway Charge',
            value: '₦0.00',
          },
          {
            title: 'Discount',
            value: '₦0.00',
          },
        ];

  if (isEleLoading || isOrderLoading) {
    return (
      <>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#2F4C2A' />
          <Text style={styles.loadingText}>
            Generating your token, please wait...
          </Text>
        </View>
        <Toast />
      </>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.successBox}>
        <View style={styles.successHeader}>
          {/* <Image source={greenTick} style={styles.greenTick} /> */}
          <Text style={styles.successText}>Your Transaction is successful</Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.copyContainer}
            onPress={() => handleCopy(eleData?.data?.purchased_code || '')}
          >
            <Ionicons name='copy-outline' size={24} color='#2F4C2A' />
            <Text style={styles.copyText}>
              {formatString(
                eleData?.data?.purchased_code?.split(':')?.[1]?.trim()
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownload}
          >
            <Ionicons name='download-outline' size={20} color='#2F4C2A' />
            <Text style={styles.downloadText}>Download Receipt</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.pdfContent} id='pdf-download-content'>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <Text style={styles.sectionSubtitle}>
          Here are the details of your order. Thank you for your purchase.
        </Text>

        {/* <SavedMeter meterData={orderData?.data?.meter} /> */}

        <View style={styles.detailsSection}>
          {ORDER_DETAILS.map((item, index) => (
            <View key={index} style={styles.detailItem}>
              <Text style={styles.detailTitle}>{item.title}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.detailsSection}>
          {PAYMENT_DETAILS.map((item, index) => (
            <View key={index} style={styles.detailItem}>
              <Text style={styles.detailTitle}>{item.title}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#2F4C2A',
  },
  successBox: {
    borderWidth: 1,
    borderColor: '#BEDDB7',
    backgroundColor: '#F1F8EF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenTick: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  successText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#2F4C2A',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 16,
  },
  copyText: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 16,
    color: '#2F4C2A',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F4C2A',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  downloadText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#2F4C2A',
  },
  pdfContent: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 16,
    backgroundColor: '#FAFAFA',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#707070',
    marginBottom: 20,
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E7E7E7',
    marginVertical: 20,
  },
  backButton: {
    backgroundColor: '#2F4C2A',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

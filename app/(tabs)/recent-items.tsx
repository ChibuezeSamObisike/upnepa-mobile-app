import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/services/dashboard';
import {
  formatDateInWords,
  formatNumberWithCommas,
  SERVICES_STUFF,
} from '@/utils/helpers';
import { Chip } from 'react-native-paper'; // If using react-native-paper
import { SafeAreaView } from 'react-native-safe-area-context';
// import emptyImg from './path-to-empty-image.png'; // Adjust the import path

// Assuming SERVICES_STUFF is defined elsewhere

const RecentPayment = () => {
  const router = useRouter();

  //   const {
  //     isPending: isLoading,
  //     data,
  //     error,
  //   } = useQuery({ queryKey: ['RECENT_PAYMENT'], queryFn: getOrders });

  //   const renderSkeleton = () => (
  //     <View style={styles.container}>
  //       {/* <SkeletonPlaceholder> */}
  //       <View style={styles.skeletonHeader} />
  //       {Array.from({ length: 3 }).map((_, index) => (
  //         <View key={index} style={styles.skeletonCard}>
  //           <View style={styles.skeletonRow}>
  //             <View style={styles.skeletonImage} />
  //             <View style={styles.skeletonText} />
  //           </View>
  //           <View style={styles.skeletonFooter}>
  //             <View style={styles.skeletonSmall} />
  //             <View style={styles.skeletonMedium} />
  //           </View>
  //         </View>
  //       ))}
  //       {/* </SkeletonPlaceholder> */}
  //     </View>
  //   );

  //   const renderEmpty = () => (
  //     <View style={styles.emptyContainer}>
  //       {/* <Image source={emptyImg} style={styles.emptyImage} resizeMode='contain' /> */}
  //       <Text style={styles.emptyText}>No recent items</Text>
  //     </View>
  //   );

  const renderItem = ({ item }: any) => {
    const { amount, service_id, created_at, id, status } = item;
    const imgIcon = SERVICES_STUFF.find(
      (i) =>
        i.serviceID ===
        (typeof service_id === 'object' ? service_id?.serviceID : service_id)
    )?.image;

    const [part1, part2] = (service_id || '').split('-');

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/order-details`)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardLeft}>
            <Image source={{ uri: imgIcon }} style={styles.serviceIcon} />
            <Text style={styles.serviceText}>
              {`${part1 || ''} ${part2 || ''}`.trim()}
            </Text>
          </View>
          <Chip
            mode='flat'
            style={[
              status.toLowerCase() === 'pending'
                ? styles.chipPending
                : styles.chipSuccess,
            ]}
            textStyle={styles.chipText}
          >
            {status}
          </Chip>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.amountText}>
            ₦{formatNumberWithCommas(amount / 100)}
          </Text>
          <Text style={styles.dateText}>{formatDateInWords(created_at)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ordrs = [
    {
      id: '0193e31a-8617-78fa-8767-86f5f0fb4d30',
      reference: 'UPN-3438763962081736445',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 500000,
      service_fee: 5000,
      gateway_fee: 7600,
      discount_code: '',
      status: 'Pending',
      variation_code: 'prepaid',
      request_id: '202412200906868412821aff437e80bfe94518d915ec',
      deleted_at: null,
      updated_at: '2024-12-20T08:06:26.583613Z',
      created_at: '2024-12-20T08:06:26.583613Z',
    },
    {
      id: '0193e057-bb4e-7a1b-af01-ec0593d7e44a',
      reference: 'UPN-457329376719373912',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 100000,
      service_fee: 5000,
      gateway_fee: 1500,
      discount_code: '',
      status: 'Pending',
      variation_code: 'prepaid',
      request_id: '2024121920146025d37a5ed346c5b23c57f0832092b2',
      deleted_at: null,
      updated_at: '2024-12-19T19:14:26.255584Z',
      created_at: '2024-12-19T19:14:26.255584Z',
    },
    {
      id: '01920681-fac1-7164-a27a-59efd330a9c9',
      reference: 'UPN-7565712188713962171',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 100000,
      service_fee: 5000,
      gateway_fee: 1500,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '202409182000683ac135084445a88e0138d020d1fbc3',
      deleted_at: null,
      updated_at: '2024-09-21T11:07:46.464688Z',
      created_at: '2024-09-18T19:00:34.62531Z',
    },
    {
      id: '0190dc01-bba0-7483-b7fc-89f6cdb3f268',
      reference: 'UPN-8138504067405711248',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 50000,
      service_fee: 5000,
      gateway_fee: 750,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '202407222055bbc1eea669724cf59fa5f702544c7790',
      deleted_at: null,
      updated_at: '2024-07-22T19:55:16.702929Z',
      created_at: '2024-07-22T19:53:39.488368Z',
    },
    {
      id: '0190c6d2-4421-714e-99ce-1e98a4f5a40e',
      reference: 'UPN-7161141668494616633',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 50000,
      service_fee: 5000,
      gateway_fee: 750,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '202407181810052821b46299458a9dacae385734b599',
      deleted_at: null,
      updated_at: '2024-07-18T17:10:25.11847Z',
      created_at: '2024-07-18T17:09:47.170052Z',
    },
    {
      id: '0190bc4d-ddfe-78f6-8b25-1c70fb9279f3',
      reference: 'UPN-6512700443905544589',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '0190afe3-c1a8-717c-897c-cb0c27af9000',
      meter: null,
      service_id: 'aba-electric',
      amount: 100000,
      service_fee: 5000,
      gateway_fee: 1500,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '202407161711ad6a5ce03c7842caa3d14f198321d749',
      deleted_at: null,
      updated_at: '2024-07-16T16:11:46.441842Z',
      created_at: '2024-07-16T16:08:58.110988Z',
    },
    {
      id: '0190b101-59d4-7f43-b23b-cadab3721ce1',
      reference: 'UPN-1585975128926668657',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '0190b101-0dad-7f43-8bc3-6efeff5f0923',
      meter: null,
      service_id: 'portharcourt-electric',
      amount: 130000,
      service_fee: 5000,
      gateway_fee: 1950,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '202407141230bb2ff2ff2cc544a2b8e1a6809a6f3d39',
      deleted_at: null,
      updated_at: '2024-07-14T11:31:02.166527Z',
      created_at: '2024-07-14T11:29:34.164141Z',
    },
    {
      id: '0190afe3-f70c-717c-bb98-5c5fee43fbc5',
      reference: 'UPN-4693786666135930901',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '0190afe3-c1a8-717c-897c-cb0c27af9000',
      meter: null,
      service_id: 'aba-electric',
      amount: 100000,
      service_fee: 5000,
      gateway_fee: 1500,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '202407140719ca978973a0554756a6ff31817bb06003',
      deleted_at: null,
      updated_at: '2024-07-14T06:19:47.480638Z',
      created_at: '2024-07-14T06:17:51.116527Z',
    },
    {
      id: '01909851-3cd2-721a-8776-a8f3f831b130',
      reference: 'UPN-2586993291743940056',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 100000,
      service_fee: 5000,
      gateway_fee: 1500,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '202407091727f0e389486f4f44d6afa5ed7dd7390e6f',
      deleted_at: null,
      updated_at: '2024-07-09T16:27:50.550141Z',
      created_at: '2024-07-09T16:26:19.218911Z',
    },
    {
      id: '01908fff-28c5-750b-8d26-7b1884c6a706',
      reference: 'UPN-1115466607207337103',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 100000,
      service_fee: 5000,
      gateway_fee: 1500,
      discount_code: '',
      status: 'Pending',
      variation_code: 'prepaid',
      request_id: '20240708023952983871291f47f09fcb4445308834f2',
      deleted_at: null,
      updated_at: '2024-07-08T01:39:42.405827Z',
      created_at: '2024-07-08T01:39:42.405827Z',
    },
    {
      id: '0190883a-855b-7766-8087-9e77f2707239',
      reference: 'UPN-5897360354557707486',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 100000,
      service_fee: 5000,
      gateway_fee: 1500,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '2024070614281c5ce76b17044b1d8c7c7a83c31cb9d6',
      deleted_at: null,
      updated_at: '2024-07-06T13:28:49.029983Z',
      created_at: '2024-07-06T13:27:35.004674Z',
    },
    {
      id: '01908765-4eab-7bfd-ab90-d8ce5eb56b81',
      reference: 'UPN-1948607235771074982',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '01908765-29bd-7bfd-a296-991e308deba0',
      meter: {
        id: '01908765-29bd-7bfd-a296-991e308deba0',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '04171184908',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'BROWN MRS',
        account_number: '04171184908',
        address: 'C1 CLS5TH AVENUE BLK 4 FLT 5FESTAC',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'eko-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-07-06T09:34:32.381896Z',
        created_at: '2024-07-06T09:34:32.381896Z',
      },
      service_id: 'eko-electric',
      amount: 110000,
      service_fee: 5000,
      gateway_fee: 1650,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '20240706103506810f72273f42db9150ac7869799a05',
      deleted_at: null,
      updated_at: '2024-07-06T09:36:04.249107Z',
      created_at: '2024-07-06T09:34:41.835808Z',
    },
    {
      id: '01906a8d-75eb-7bb3-8028-8bc31e53ccf9',
      reference: 'UPN-8550811126213948259',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 50000,
      service_fee: 5000,
      gateway_fee: 750,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '2024063020103e526b9a025f4eff9e872067eed6f150',
      deleted_at: null,
      updated_at: '2024-06-30T19:11:26.191548Z',
      created_at: '2024-06-30T19:09:34.060035Z',
    },
    {
      id: '019069d9-5415-7b0d-99a0-2b9000983890',
      reference: 'UPN-7884734613612813620',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '01906853-530b-78a7-b4e4-9d88efe4ed81',
      meter: null,
      service_id: 'portharcourt-electric',
      amount: 50000,
      service_fee: 5000,
      gateway_fee: 750,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '2024063016536c39c3056dcd40f3a5470ee2a039aae3',
      deleted_at: null,
      updated_at: '2024-06-30T15:53:55.208521Z',
      created_at: '2024-06-30T15:52:48.917953Z',
    },
    {
      id: '019069ca-698d-7b0d-9034-5c665cb6b456',
      reference: 'UPN-446578979303037340',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 50000,
      service_fee: 5000,
      gateway_fee: 750,
      discount_code: '',
      status: 'Success',
      variation_code: 'prepaid',
      request_id: '202406301637a63995e41b6e434f97753d334b91ead7',
      deleted_at: null,
      updated_at: '2024-06-30T15:37:58.691491Z',
      created_at: '2024-06-30T15:36:31.373673Z',
    },
    {
      id: '019069c8-3bd6-7b0d-9f1d-a8b5bb497c33',
      reference: 'UPN-2161937588516593186',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 1000000,
      service_fee: 5000,
      gateway_fee: 15100,
      discount_code: '',
      status: 'Pending',
      variation_code: 'prepaid',
      request_id: '20240630163465cbda32f4dd4a429b1b962500f16e10',
      deleted_at: null,
      updated_at: '2024-06-30T15:34:08.598508Z',
      created_at: '2024-06-30T15:34:08.598508Z',
    },
    {
      id: '019067d9-2f31-7c55-9ac5-97675c3571f0',
      reference: 'UPN-4502497285543472496',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
      meter: {
        id: '019067d8-d1ed-7c55-b384-cf15f81d78cd',
        user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
        number: '0137200395333',
        label: 'Homes',
        meter_type: 'prepaid',
        customer_name: 'SIR SAM W OBISIKE (JP)',
        account_number: '',
        address:
          'HIS MAJESTY AVE. N/A  (KCT1:55341483215004343135, KCT2:11801960685129940915)',
        business_unit: '',
        customer_arrears: '0',
        service_id: 'portharcourt-electric',
        customer_phone: '',
        deleted_at: null,
        updated_at: '2024-06-30T06:33:01.16549Z',
        created_at: '2024-06-30T06:33:01.16549Z',
      },
      service_id: 'portharcourt-electric',
      amount: 40000,
      service_fee: 5000,
      gateway_fee: 600,
      discount_code: '',
      status: 'Pending',
      variation_code: 'prepaid',
      request_id: '202406300733db45e92bccff46a1b5600eb0d5e96744',
      deleted_at: null,
      updated_at: '2024-06-30T06:33:25.041541Z',
      created_at: '2024-06-30T06:33:25.041541Z',
    },
    {
      id: '019065f4-b6a8-75e1-bf6a-16f62ea2c0a9',
      reference: 'UPN-4219693929604673672',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      meter_id: '019065d5-6f7d-7c70-afe8-a33703f3c3c9',
      meter: null,
      service_id: 'portharcourt-electric',
      amount: 30000,
      service_fee: 5000,
      gateway_fee: 450,
      discount_code: '',
      status: 'Pending',
      variation_code: 'prepaid',
      request_id: '20240629224481c2f7aff4bf429a8d4f4504435b399f',
      deleted_at: null,
      updated_at: '2024-06-29T21:44:14.760189Z',
      created_at: '2024-06-29T21:44:14.760189Z',
    },
  ];

  //   if (isLoading) {
  //     return renderSkeleton();
  //   }

  //   const successfulOrders = data?.data?.filter(
  //     (item: any) => item?.status?.toLowerCase() === 'success'
  //   );

  //   if (!successfulOrders || successfulOrders.length === 0) {
  //     return renderEmpty();
  //   }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.header}>Recent Payment</Text>
      <View style={styles.container}>
        <FlatList
          data={ordrs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default RecentPayment;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 16,
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 20,
  },
  header: {
    fontWeight: '600',
    fontSize: 23,
    marginBottom: 16,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  skeletonHeader: {
    width: 150,
    height: 30,
    marginBottom: 16,
  },
  skeletonCard: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    padding: 16,
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skeletonImage: {
    width: 58,
    height: 58,
    borderRadius: 8,
    marginRight: 8,
  },
  skeletonText: {
    width: 100,
    height: 20,
  },
  skeletonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  skeletonSmall: {
    width: 60,
    height: 20,
  },
  skeletonMedium: {
    width: 80,
    height: 20,
  },
  emptyContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 16,
    backgroundColor: '#fff',
    height: '50%',
    maxHeight: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceIcon: {
    width: 58,
    height: 58,
    borderRadius: 8,
    marginRight: 8,
  },
  serviceText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
    textAlign: 'left',
  },
  chip: {
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 24,
    justifyContent: 'center',
  },
  chipPending: {
    backgroundColor: '#FFA500',
  },
  chipSuccess: {
    backgroundColor: '#28A745',
  },
  chipText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  amountText: {
    fontWeight: 'bold',
    color: '#000',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#777',
  },
});

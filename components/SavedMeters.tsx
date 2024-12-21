import SavedMeter from '@/components/SavedMeter';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from 'react-native';

interface MeterData {
  id: number;
  meterName: string;
  [key: string]: any;
}

interface SavedMetersProps {
  addNewMeter: () => void;
}

const SavedMeters: React.FC<SavedMetersProps> = ({ addNewMeter }) => {
  const isPending = false;
  const data = [
    {
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
    {
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
    {
      id: '01908cf3-8268-71c0-bf20-12a849e658c7',
      user_id: '01902b69-c1a7-7db5-be4a-bdd62d4e4ebc',
      number: '610124000475036',
      label: 'Homes',
      meter_type: 'prepaid',
      customer_name: 'CHARLES EKE',
      account_number: '',
      address:
        '2 PALACE RD WOJI   (KCT1:52669937413026947897, KCT2:49429297618250011049)',
      business_unit: '',
      customer_arrears: '0',
      service_id: 'portharcourt-electric',
      customer_phone: '',
      deleted_at: null,
      updated_at: '2024-07-07T11:28:07.272746Z',
      created_at: '2024-07-07T11:28:07.272746Z',
    },
  ];

  if (isPending) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='small' color='#000' />
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<MeterData> = ({ item }) => {
    return <SavedMeter {...item} />;
  };

  return (
    <View style={styles.container}>
      {/* Header: Title + "Add New Meter" Button */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Saved Meters</Text>
        <TouchableOpacity style={styles.button} onPress={addNewMeter}>
          {/* Replace this text icon with an actual icon library if desired */}
          <Text style={styles.buttonIcon}>+</Text>
          <Text style={styles.buttonText}>Add New Meter</Text>
        </TouchableOpacity>
      </View>

      {/* If there are no meters */}
      {!data || data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.noSavedMeters}>No Saved Meters</Text>
          <Text style={styles.infoText}>
            You haven't saved any meter numbers yet. Buy Electricity or Add a
            meter to get started.
          </Text>
        </View>
      ) : (
        <FlatList
          data={data as any}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12, // MUI mt={3} ~ 24px by default, adjust as needed
    paddingVertical: 16, // MUI py={2} -> 16px if theme spacing is 8
    paddingHorizontal: 16, // MUI px={2} -> 16px
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '100%',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CE6334',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  buttonIcon: {
    color: '#CE6334',
    fontSize: 18,
    marginRight: 4,
  },
  buttonText: {
    color: '#CE6334',
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  noSavedMeters: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    color: '#707070',
    textAlign: 'center',
    width: '70%',
  },
  flatListContent: {
    paddingVertical: 8,
  },
  meterItem: {
    // Example styling for each meter row/item
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },
  meterText: {
    fontSize: 16,
  },
});

export default SavedMeters;

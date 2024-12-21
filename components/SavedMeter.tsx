import { SERVICES_STUFF } from '@/utils/helpers';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

interface SavedMeterProps {
  meternumber?: string;
  number?: string;
  meter_type?: string;
  id: number;
  customer_name?: string;
  address?: string;
  service_id?: any; // Adjust type as needed
  noDelete?: boolean;
}

const SavedMeter: React.FC<SavedMeterProps> = (props) => {
  const {
    meternumber,
    number,
    meter_type,
    id,
    customer_name,
    address,
    service_id,
    noDelete = false,
  } = props;

  // Look up the service data; adjust logic to your needs.
  const savedM = SERVICES_STUFF.find((i) => {
    // If service_id could be an object with { serviceID },
    // handle that here:
    const serviceIDValue =
      typeof service_id === 'object' ? service_id?.serviceID : service_id;
    return i.serviceID === serviceIDValue;
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => {}}
    >
      <View style={styles.leftSection}>
        {savedM?.image ? (
          <View>
            <Image
              source={{ uri: savedM.image }}
              style={styles.meterImage}
              resizeMode='contain'
            />
            <Text style={styles.meterType}>
              {(meter_type || 'PREPAID').toUpperCase()}
            </Text>
          </View>
        ) : null}

        <View style={styles.meterInfo}>
          <View style={styles.meterHeader}>
            <Text style={styles.meterNumber}>{meternumber || number}</Text>
            {/* <Text style={styles.meterType}>
              {(meter_type || 'PREPAID').toUpperCase()}
            </Text> */}
          </View>

          <Text style={styles.customerName}>{customer_name}</Text>
          <Text style={styles.address}>Address: {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // Equivalent of MUI Box with display="flex", alignItems="center", justifyContent="space-between"
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    // my={3} => marginVertical: 12 (approx.)
    marginVertical: 12,
    // border="1px solid #EAEAEA", borderRadius="12px", p={2}
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFF',
  },
  leftSection: {
    // For the left side (image + text)
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  meterImage: {
    width: 88,
    height: 88,
    marginRight: 20,
  },
  meterInfo: {
    flex: 1,
  },
  meterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meterNumber: {
    color: 'red',
    fontWeight: '600',
    fontSize: 18,
    marginRight: 8,
  },
  meterType: {
    fontWeight: '600',
    color: '#E26D39',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  customerName: {
    color: '#707070',
    marginTop: 4,
  },
  address: {
    color: '#707070',
    fontSize: 14,
    marginTop: 2,
  },
  deleteContainer: {
    // Container for the Delete button on the right
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#CE6334',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#CE6334',
    fontSize: 16,
    marginLeft: 4,
  },
});

export default SavedMeter;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';

import Button from '@/components/ui/Button'; // Your custom React Native Button
import SavedMeter from '@/components/SavedMeter'; // Your React Native SavedMeter component
import AddMeter from '@/components/AddMeter'; // Your React Native AddMeter component

// If using SVGs, ensure you have react-native-svg installed and configured
// import SvgUri from 'react-native-svg-uri'; // Example for SVGs

// Import your emptyTable image as PNG/JPG
// Ensure the path is correct relative to this file
const emptyTableImage = require('@/assets/images/emptyTable.svg'); // Adjust the path and format accordingly

import { getAllMeters } from '@/services/dashboard';

const BuyScreen = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['GET_METER'],
    queryFn: getAllMeters,
  });

  // Render Loading State
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#0000ff' />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Handle Error State (optional)
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error: {error?.message || 'Something went wrong.'}
        </Text>
      </View>
    );
  }

  // Empty State Component
  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.headerText}>Buy Electricity</Text>

      <View style={styles.emptyBox}>
        {/* If using PNG/JPG */}
        <Image
          source={emptyTableImage} // Ensure this path is correct and the image exists
          style={styles.emptyImage}
          resizeMode='contain'
        />

        {/* If using SVG with react-native-svg-uri */}
        {/* <SvgUri width="100" height="100" source={emptyTable} /> */}

        <Text style={styles.emptyTitle}>No Meters Added yet?🧐</Text>
        <Text style={styles.emptySubtitle}>
          No worries you can add below and start purchasing your prepaid tokens.
        </Text>
        <Button
          onPress={() => setOpen(true)}
          style={styles.addButton}
          variant='outlined'
        >
          Add Meter
        </Button>
      </View>
    </View>
  );

  // List Header Component (optional)
  const ListHeaderComponent = () => (
    <View style={styles.listHeader}>
      <Text style={styles.instructionText}>
        Click on any of the meters to pay
      </Text>
    </View>
  );

  // Main Render
  return (
    <>
      {/* Modal for Adding Meter */}
      <Modal
        visible={open}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AddMeter setOpen={setOpen} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={data?.data || []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <SavedMeter {...item} />}
        ListEmptyComponent={EmptyComponent}
        ListHeaderComponent={
          data?.data?.length > 0 ? ListHeaderComponent : null
        }
        contentContainerStyle={[
          styles.flatListContent,
          data?.data?.length === 0 && styles.flatListEmptyContent,
        ]}
      />
    </>
  );
};

export default BuyScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  emptyTitle: {
    fontWeight: 'bold',
    fontSize: 23,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  addButton: {
    width: '30%',
  },
  metersContainer: {
    flex: 1,
    padding: 20,
    height: '70%', // Adjust as needed
  },
  instructionText: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  flatListContent: {
    paddingVertical: 20,
  },
  flatListEmptyContent: {
    flexGrow: 1, // Ensures empty component is centered
  },
  listHeader: {
    marginBottom: 15,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Add elevation for Android
    elevation: 5,
  },
});

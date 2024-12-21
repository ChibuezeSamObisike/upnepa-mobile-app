import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SavedMeters from '@/components/SavedMeters';
import Button from '@/components/ui/Button';
import PaidCard from '@/components/UpNepaCard';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Wrap content in ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://avatars.githubusercontent.com/u/84887377?v=4',
            }}
            style={[styles.img, { alignSelf: 'center' }]}
          />
          <Text style={styles.title}>Chibueze Sam-Obisike</Text>
          <Text style={styles.number}>09063159265</Text>

          <Button style={styles.btn}>Buy Electricity</Button>

          <PaidCard
            title='Total Money Paid'
            value={99000}
            percentage='10'
            style={{ marginTop: 15 }}
          />
          <PaidCard
            title='Total Money Paid'
            value={99000}
            percentage='10'
            style={{ marginTop: 15 }}
          />

          <SavedMeters addNewMeter={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // The ScrollView's inner container.
    // You can add padding here if you want spacing around all items.
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    textAlign: 'center',
    paddingTop: 5,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  number: {
    color: 'rgb(94, 94, 94)',
    fontSize: 14,
    textAlign: 'center',
  },
  img: {
    backgroundColor: 'red',
    // In React Native, borderRadius expects a numeric value
    // For a perfect circle, use half the width/height
    // or set width/height on the image explicitly
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  btn: {
    marginTop: 15,
  },
});

export default Home;

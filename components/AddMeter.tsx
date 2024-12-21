import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SavedMeter from '@/components/SavedMeter';
import { getAllElectricityServices } from '@/services/utils';

// Example meter icon. Replace with your actual asset or SVG handling.
const meterIconUri = 'https://via.placeholder.com/80'; // placeholder

// Define your Yup validation schema:
const schema = yup.object().shape({
  meterNumber: yup.string().required('Meter number is required'),
  discoService: yup.string().required('Disco service is required'), // Changed to string to store serviceID
  paymentType: yup
    .string()
    .oneOf(['prepaid', 'postpaid'], 'Invalid payment type')
    .required('Payment type is required'),
});

const AddMeter = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
  const [validateData, setValidateData] = useState<any>({});
  const [capValidate, setCapValidate] = useState<any>({});
  const [loading, setIsLoading] = useState(false);

  // 2. Query: fetch all electricity services
  const {
    data,
    isLoading: isServicesLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['GET_ALL_SERVICES'],
    //queryFn: getAllElectricityServices,
    queryFn: async () => {
      // Mock example; replace with your actual API call
      return {
        data: [
          { serviceID: '1', name: 'Service One', image: 'http://...' },
          { serviceID: '2', name: 'Service Two', image: 'http://...' },
        ],
      };
    },
  });

  // React Query client
  const queryClient = useQueryClient();

  // 3. Mutation to add a new meter
  const { mutate, isPending } = useMutation({
    // mutationFn: addNewMeter,
    mutationFn: async (payload: any) => {
      // Example of success; replace with your actual API call
      return { message: 'Meter added successfully' };
    },
    onSuccess: (res) => {
      // handleResponse(res);
      console.log('Success: ', res);
      queryClient.invalidateQueries({
        queryKey: ['GET_ALL_SERVICES', 'GET_METER'],
      }); // Adjust query keys as needed
      setOpen(false);
      reset(); // Reset form after successful submission
    },
    onError: (err: any) => {
      // Show an error message, reset form, etc.
      console.log('Error: ', err);
      reset({});
      // Optionally, integrate a toast notification library
      // toast.error(handleError(err));
    },
  });

  // 4. React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Helper function from your code
  function convertKeysAndValuesToLowercase(obj: any) {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.toLowerCase();
        newObj[newKey] = obj[key];
      }
    }
    return newObj;
  }

  // 5. Validate meter data
  const onSubmit = async (formData: FieldValues) => {
    setIsLoading(true);

    // Suppose we have getValidateMeter call:
    // getValidateMeter({
    //   meter_number: formData.meterNumber,
    //   service_id: formData.discoService,
    //   meter_type: formData.paymentType,
    // })

    // Mocking an async response:
    setTimeout(() => {
      // Example success response
      const mockResponse = {
        data: {
          customer_name: 'John Doe',
          address: '123 Test St',
        },
      };
      setValidateData(convertKeysAndValuesToLowercase(mockResponse.data));
      setCapValidate(mockResponse.data);
      setIsLoading(false);
    }, 1500);
  };

  // For debug
  useEffect(() => {
    console.log('Validate data updated: ', validateData);
  }, [validateData]);

  // 6. Render
  return (
    <View style={styles.formContainer}>
      {/* Meter Icon */}
      <Image
        source={{ uri: meterIconUri }}
        style={styles.meterIcon}
        resizeMode='contain'
      />
      <Text style={styles.addMeterText}>Add Meter Number</Text>

      {/* If user has not validated meter (no customer_name in validateData), show the form */}
      {!validateData.customer_name && (
        <>
          {/* Meter Number Field */}
          <Text style={styles.label}>Meter Number</Text>
          <Controller
            name='meterNumber'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                {...field}
                style={[styles.input, errors.meterNumber && styles.inputError]}
                placeholder='e.g 1304384930203'
                keyboardType='numeric'
              />
            )}
          />
          {errors.meterNumber && (
            <Text style={styles.errorText}>{errors.meterNumber.message}</Text>
          )}

          {/* DiscoAutoSelect -> replaced with a simple RNPickerSelect */}
          <Text style={[styles.label, { marginTop: 16 }]}>Select Disco</Text>
          <Controller
            name='discoService'
            control={control}
            defaultValue=''
            render={({ field }) => {
              const serviceList = data?.data || [];
              const items = serviceList.map((svc: any) => ({
                label: svc.name,
                value: svc.serviceID, // Store only serviceID
              }));
              return (
                <RNPickerSelect
                  onValueChange={(value) => field.onChange(value)}
                  items={items}
                  placeholder={{
                    label: '-- Select --',
                    value: '',
                  }}
                  style={{
                    inputIOS: styles.picker,
                    inputAndroid: styles.picker,
                    placeholder: {
                      color: '#9EA0A4',
                    },
                  }}
                  value={field.value}
                  useNativeAndroidPickerStyle={false}
                />
              );
            }}
          />
          {errors.discoService && (
            <Text style={styles.errorText}>{errors.discoService.message}</Text>
          )}

          {/* Payment Type (prepaid / postpaid) */}
          <Text style={[styles.label, { marginTop: 16 }]}>
            Select Meter Type
          </Text>
          <Controller
            name='paymentType'
            control={control}
            //  defaultValue=''
            render={({ field }) => (
              <RNPickerSelect
                onValueChange={(val) => field.onChange(val)}
                items={[
                  { label: 'Prepaid', value: 'prepaid' },
                  { label: 'Postpaid', value: 'postpaid' },
                ]}
                placeholder={{
                  label: '-- Select --',
                  value: '',
                }}
                style={{
                  inputIOS: styles.picker,
                  inputAndroid: styles.picker,
                  placeholder: {
                    color: '#9EA0A4',
                  },
                }}
                value={field.value}
                useNativeAndroidPickerStyle={false}
              />
            )}
          />
          {errors.paymentType && (
            <Text style={styles.errorText}>{errors.paymentType.message}</Text>
          )}

          {/* Buttons: "No Thanks" & "Verify" */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.btn, styles.outlinedBtn]}>
              <Text style={[styles.btnText, styles.outlinedBtnText]}>
                No Thanks
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.filledBtn]}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size='small' color='#fff' />
              ) : (
                <Text style={styles.btnText}>Verify</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* If we have validated data (validateData.customer_name exists), show the summary (SavedMeter) */}
      {validateData.customer_name && (
        <>
          {/* Your React Native version of SavedMeter */}
          <SavedMeter
            service_id={getValues()['discoService']}
            {...validateData}
            noDelete
          />

          {/* Buttons: "Cancel" & "Add Meter" */}
          <View style={styles.buttonColumn}>
            <TouchableOpacity
              style={[styles.btn, styles.outlinedBtn, { marginBottom: 16 }]}
              onPress={() => {
                reset({});
                setValidateData({});
              }}
            >
              <Text style={[styles.btnText, styles.outlinedBtnText]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.filledBtn]}
              onPress={() => {
                mutate({
                  type: getValues()['paymentType'],
                  number: getValues()['meterNumber'],
                  label: 'Homes',
                  service_id: getValues()['discoService'],
                  ...validateData,
                });
              }}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator size='small' color='#fff' />
              ) : (
                <Text style={styles.btnText}>Add Meter</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default AddMeter;

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
  },
  meterIcon: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 40, // For circular image
  },
  addMeterText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 4,
    padding: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginTop: 4,
    color: '#000',
    paddingRight: 30, // To ensure the text is not behind the icon
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  buttonColumn: {
    flexDirection: 'column',
    marginTop: 24,
    width: '100%',
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlinedBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  outlinedBtnText: {
    color: '#000',
  },
  filledBtn: {
    backgroundColor: '#CE6334',
    marginLeft: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  savedMeterMock: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    width: '100%',
  },
  savedMeterMockText: {
    fontWeight: '600',
    marginBottom: 8,
  },
});

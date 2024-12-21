import { IAddMeter } from '@/types';
import { http } from '@/utils/http';

export const getAllMeters = async () => {
  const res = await http.get('/meter');
  return res.data;
};

export const addNewMeter = async (body: any) => {
  // console.log("Request board", body);
  const res = await http.post('/meter', body);
  return res.data;
};

export const getSingleMeter = async ({ id }: { id: string }) => {
  const res = await http.get('/meter/' + id?.toString());
  return res.data;
};

export const createOrder = async (body: any) => {
  // console.log("Create order", { ...body });
  const res = await http.post('/order/', { ...body });
  return res.data;
};

export const getElectricity = async (orderId: string) => {
  const res = await http.get('/electricity/order/' + orderId);
  return res.data;
};

export const getElectricityById = async (id: string) => {
  console.log('electricity ID', id);
  const res = await http.get('/electricity/order/' + id);
  return res.data;
};

export const deleteMeter = async (id: string) => {
  const res = await http.delete('/meter/' + id);
  return res.data;
};

export const getStatistics = async () => {
  const res = await http.get('/order/statistics');
  return res.data;
};

export const getOrders = async () => {
  const res = await http.get('/order');
  return res.data;
};

export const getOrder = async (orderId: string) => {
  const res = await http.get('/order/' + orderId);
  return res.data;
};

export const getElectricityMisc = async () => {
  const res = await http.get('/misc/electricity-services');
  return res.data;
};

export const SERVICES_STUFF = [
  {
    serviceID: 'ikeja-electric',
    name: 'Ikeja Electric Payment - IKEDC',
    minimium_amount: '500',
    maximum_amount: 400000,
    convinience_fee: 'N0.00',
    product_type: 'fix',
    image:
      'https://vtpass.com/resources/products/200X200/Ikeja-Electric-Payment-PHCN.jpg',
  },
  {
    serviceID: 'eko-electric',
    name: 'Eko Electric Payment - EKEDC',
    minimium_amount: '1000',
    maximum_amount: 500000,
    convinience_fee: 'N0.00',
    product_type: 'fix',
    image:
      'https://vtpass.com/resources/products/200X200/Eko-Electric-Payment-PHCN.jpg',
  },
  {
    serviceID: 'abuja-electric',
    name: 'Abuja Electricity Distribution Company- AEDC',
    minimium_amount: '500',
    maximum_amount: 1000000,
    convinience_fee: '0.00 %',
    product_type: 'flexible',
    image: 'https://vtpass.com/resources/products/200X200/Abuja-Electric.jpg',
  },
  {
    serviceID: 'kano-electric',
    name: 'KEDCO - Kano Electric',
    minimium_amount: '500',
    maximum_amount: 500000,
    convinience_fee: 'N0.00',
    product_type: 'flexible',
    image: 'https://vtpass.com/resources/products/200X200/Kano-Electric.jpg',
  },
  {
    serviceID: 'portharcourt-electric',
    name: 'PHED - Port Harcourt Electric',
    minimium_amount: '100',
    maximum_amount: 10000000,
    convinience_fee: 'N0.00',
    product_type: 'flexible',
    image:
      'https://vtpass.com/resources/products/200X200/Port-Harcourt-Electric.jpg',
  },
  {
    serviceID: 'jos-electric',
    name: 'Jos Electric - JED',
    minimium_amount: '1000',
    maximum_amount: 500000,
    convinience_fee: 'N0.00',
    product_type: 'fix',
    image: 'https://vtpass.com/resources/products/200X200/Jos-Electric-JED.jpg',
  },
  {
    serviceID: 'kaduna-electric',
    name: 'Kaduna Electric - KAEDCO',
    minimium_amount: '1100',
    maximum_amount: 100000,
    convinience_fee: 'N0.00',
    product_type: 'fix',
    image:
      'https://vtpass.com/resources/products/200X200/Kaduna-Electric-KAEDCO.jpg',
  },
  {
    serviceID: 'enugu-electric',
    name: 'Enugu Electric - EEDC',
    minimium_amount: '500',
    maximum_amount: 200000,
    convinience_fee: 'N0.00',
    product_type: 'fix',
    image:
      'https://vtpass.com/resources/products/200X200/Enugu-Electric-EEDC.jpg',
  },
  {
    serviceID: 'ibadan-electric',
    name: 'IBEDC - Ibadan Electricity Distribution Company',
    minimium_amount: '100',
    maximum_amount: 500000,
    convinience_fee: 'N0.00',
    product_type: 'flexible',
    image:
      'https://vtpass.com/resources/products/200X200/IBEDC-Ibadan-Electricity-Distribution-Company.jpg',
  },
  {
    serviceID: 'benin-electric',
    name: 'Benin Electricity - BEDC',
    minimium_amount: '500',
    maximum_amount: 500000,
    convinience_fee: 'N0.00',
    product_type: 'fix',
    image:
      'https://vtpass.com/resources/products/200X200/Benin-Electricity-BEDC.jpg',
  },
  {
    serviceID: 'aba-electric',
    name: 'Aba Electric Payment - ABEDC',
    minimium_amount: '10',
    maximum_amount: 400000,
    convinience_fee: 'N0.00',
    product_type: 'flexible',
    image:
      'https://vtpass.com/resources/products/200X200/Aba-Electric-Payment-ABEDC.jpg',
  },
  {
    serviceID: 'yola-electric',
    name: 'Yola Electric Disco Payment - YEDC',
    minimium_amount: '500',
    maximum_amount: 500000,
    convinience_fee: 'N0.00',
    product_type: 'fix',
    image:
      'https://vtpass.com/resources/products/200X200/Yola-Electric-Payment-IKEDC.jpg',
  },
];

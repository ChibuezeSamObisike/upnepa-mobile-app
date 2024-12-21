export function pxToRem(px: number, baseFontSize = 16) {
  return `${px / baseFontSize}rem`;
}

export const formatNumberWithCommas = (number: string | number) => {
  return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

export const formatDateInWords = (dateString: string) => {
  if (!dateString) return '';

  const [year, month, day] = dateString.split('T')[0].split('-');

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayWithSuffix = (day: number) => {
    const j = day % 10,
      k = day % 100;
    if (j === 1 && k !== 11) {
      return day + 'st';
    }
    if (j === 2 && k !== 12) {
      return day + 'nd';
    }
    if (j === 3 && k !== 13) {
      return day + 'rd';
    }
    return day + 'th';
  };

  return `${monthNames[parseInt(month, 10) - 1]} ${dayWithSuffix(
    parseInt(day, 10)
  )}, ${year}`;
};

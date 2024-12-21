import { http } from 'utils/http';

export const getAllElectricityServices = async () => {
  const res = await http.get('/misc/electricity-services');
  return res.data;
};

export const getValidateMeter = async ({
  meter_number,
  service_id,
  meter_type,
}: any) => {
  const res = await http.get(
    `/meter/validate/${meter_number}/${service_id}/${meter_type}`
  );

  return res.data;
};

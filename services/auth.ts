import { ICreateAccount, IVerifyEmail } from '@/types';
import { http } from '@/utils/http';

export const createAccount = async ({
  full_name,
  password,
  confirm_password,
  email,
  phone_number,
}: ICreateAccount) => {
  const res = await http.post('/auth/register', {
    full_name,
    password,
    confirm_password,
    email,
    phone_number,
  });
  return res.data;
};

export const verifyEmail = async ({ email, otp }: IVerifyEmail) => {
  const res = await http.post('/auth/verify/' + email + '/' + otp);
  return res.data;
};

export const resendOtp = async ({
  email,
}: {
  email: Pick<IVerifyEmail, 'email'>;
}) => {
  const res = await http.post('auth/resend-verification-email/' + email);
  return res.data;
};

export const login = async ({
  email,
  password,
}: Pick<ICreateAccount, 'email' | 'password'>) => {
  const res = await http.post('auth/login', { email, password });
  return res.data;
};

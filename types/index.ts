export interface ICreateAccount {
  full_name: string;
  password: string;
  confirm_password: string;
  email: string;
  phone_number: string;
}

export interface IVerifyEmail {
  email: string;
  otp: string;
}

export type IError = Error & {
  response: {
    data: {
      error: string;
    };
  };
};

export type IAddMeter = {
  label: string;
  number: string;
  type: 'prepaid' | 'postpaid';
};

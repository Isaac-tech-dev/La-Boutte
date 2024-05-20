import {ImageSourcePropType} from 'react-native';
import {FetchUserAccountsResponse} from '../redux/types/account';

export type OnboardData = {
  title1: string;
  title2: string;
  subtitle: string;
  img: ImageSourcePropType;
};
export type Bank = {name: string; logo: string};
export type BankList = Bank[];
export type cardData = {
  img: ImageSourcePropType;
};
export type TransferOptions = 'self' | 'others' | 'optimus';
export type BillTransferOptions =
  | 'airtime'
  | 'cabletv'
  | 'betting'
  | 'electricity'
  | 'dealer'
  | 'school'
  | 'travel'
  | 'financial'
  | 'unknown';
export type InputState = {
  value: string;
  error: string;
};

export type CustomerDetails = {
  email: string;
};

export type InputAutoCompleteType =
  | 'additional-name'
  | 'address-line1'
  | 'address-line2'
  | 'birthdate-day'
  | 'birthdate-full'
  | 'birthdate-month'
  | 'birthdate-year'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-day'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'country'
  | 'current-password'
  | 'email'
  | 'family-name'
  | 'gender'
  | 'given-name'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'name'
  | 'name-family'
  | 'name-given'
  | 'name-middle'
  | 'name-middle-initial'
  | 'name-prefix'
  | 'name-suffix'
  | 'new-password'
  | 'nickname'
  | 'one-time-code'
  | 'organization'
  | 'organization-title'
  | 'password'
  | 'password-new'
  | 'postal-address'
  | 'postal-address-country'
  | 'postal-address-extended'
  | 'postal-address-extended-postal-code'
  | 'postal-address-locality'
  | 'postal-address-region'
  | 'postal-code'
  | 'street-address'
  | 'sms-otp'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-device'
  | 'url'
  | 'username'
  | 'username-new'
  | 'off';

export type InputTextContentType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password';

export type PendingTransaction = {
  creditAccount: {
    accountName: string;
    accountNumber: string;
    beneficiaryBankCode?: string;
    beneficiaryBankName?: string;
    beneficiaryBvn?: string;
    beneficiaryKyc?: string;
    customerRemark?: string;
    sessionId?: string;
  };
  charges?: string;
  desc?: string;
  addAsBeneficiary?: boolean;
  amount: string;
  currencyCode: string;
  transactionType: 'intra' | 'inter';
};

export type BioInfo = {
  hasAsked: number;
  enabled: '0' | '1';
  pass: string;
};

export type RBSheetRef = {
  open: () => void;
  close: () => void;
  // Add other methods or properties if needed
};

export type TransactionTypeDetails = {
  TransactionType: number;
  BeneficiaryTransactionType: string;
};

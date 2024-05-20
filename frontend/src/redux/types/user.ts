export type FetchCampaignResponse = {
  Id: string;
  requestId: string;
  CampaignName: string;
  link: string;
  text: string;
  imgPath: string;
  dateUpdated: string;
  updatedBy: string;
};

export type UpdateUserEmailAttribute = {
  Email: string;
  AccountNo: string;
};
export type UpdateUserEmailResponse = {
  ResponseCode: string;
  ResponseMessage: string;
  Data: null;
};

export type UpdateUserPhoneAttribute = {
  CountryCode: string;
  PhoneNo: string;
  AccountNo: string;

};
export type UpdateUserPhoneResponse = {
  ResponseCode: string;
  ResponseMessage: string;
  Data: null;
};


type PersonalDetails = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  motherMaidenName: string;
  dateOfBirth?: string;
  title?: string;
  maritalStatus?: string;
  emailAddress?: string;
  phoneNumber?: string;
  purposeOfAccount?: string;
  otherReasons?: string;
};

type ContactAddress = {
  country?: string;
  localGovernment?: string;
  streetName?: string;
  streetAddress?: string;
  state?: string;
  city?: string;
  houseNumber?: string;
  zipCode?: string;
  addressLine1?: string;
  addressLine2?: string;
};

type NextOfKin = {
  fullNameOfKin?: string;
  relationshipOfKin?: string;
  dobOfKin?: string;
  phoneNumberOfKin?: string;
  houseNumberOfKin?: string;
  streetNameOfKin?: string;
  stateOfKin?: string;
  localGovernmentOfKin?: string;
  postalZipCodeOfKin?: string;
};

type EmployeeStatus = {
  status?: string;
  numberofYears?: string;
  annualIncome?: string;
  employersName?: string;
  natureOfBusiness?: string;
  occupation?: string;
  sourceOfWealth?: string;
  employersAddress?: string;
};

type SocialMedia = {
  linkedIn?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  twitter?: string;
  thread?: string;
};

type IdDetails = {
  vnin?: string;
  idNo?: string;
  idType?: string;
  issueDate?: string;
  expiryDate?: string;
};

type Document = {
  document?: string;
  documentName?: string;
  documentType?: string;
  filePath?: string;
  fileExtension?: string;
};

type Citizenship = {
  foreignTaxId?: string;
  countryTaxResidence?: string;
  mobileNumber?: string;
  citizenshipAddressLine1?: string;
  citizenshipAddressLine2?: string;
  noReasonForTinClass?: string;
  country?: string;
};

export type UpgradeUserAccountAttribute = {
  accountNumber: string;
  bvn?: string;
  requestType: string;
  channelId?: string;
  notificationPreference?: string;
  personalDetails?: PersonalDetails;
  contactAddress?: ContactAddress;
  nextOfKin?: NextOfKin;
  employeeStatus?: EmployeeStatus;
  socialMedia?: SocialMedia;
  idDetails?: IdDetails;
  documents?: Document[];
  citizenship?: Citizenship;
};

export type UpgradeUserAccountResponse = {
  responseCode: string;
  responseMessage: string;
  data: null;
};

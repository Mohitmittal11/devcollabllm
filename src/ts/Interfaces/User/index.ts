export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  designation: string;
  isActive: boolean;
  createdAt: string;
  image: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  countryCode: string;
  role: string;
  isPhoneVerified: boolean;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

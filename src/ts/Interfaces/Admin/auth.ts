export interface AdminLogin {
  email: string;
  password: string;
}

export interface AdminDetailsInterface {
  _id: string;
  name: string;
  password: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  isActive: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  role: string;
  image: string;
  code: number;
}

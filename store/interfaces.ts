import { User } from 'gotrue-js';
// import { IDeliveryAddress } from './modules/profile/components/address/AddressService';

export interface Product {
  SKU: string;
  Name: string;
  Brand: string;
  Price: number;
  Description: string;
  Type: string;
  StrainType: string;
  THCPercent: number;
  EffectTags: string[];
  PackageSize: number;
  UOM: string;
  ImageUrl: string;
  Tags: string[];
  LocationsAvailable: string[];
}

export interface OrderItem {
  Product: Product;
  Quantity: number;
  Savings: number;
}

export type GoodTreeLocations = 'Long Beach' | 'Oakland';

export interface Zone {
  Id: string;
  Name: string;
  DeliveryFee: number;
  Minimum: number;
  LocalCannabisTax: number;
  SalesTax: number;
  ExciseTax: number;
  Vendor: GoodTreeLocations;
}

export interface LocationInfo {
  // Address: IDeliveryAddress;
  Address: string;
  IsInDeliveryNetwork: boolean;
  Zone: Zone;
}

export type OrderEnum =
  | 'Ordering'
  | 'Open'
  | 'Allocated'
  | 'Pending Pulling All Items'
  | 'Fulfilled'
  | 'Cancelled';

export interface OrderState {
  CartID: string;
  OnfleetID: string;
  OrderNumber: string;
  OrderStatus: OrderEnum;
  LocationState: LocationInfo;
  ShoppingCart: OrderItem[];
  // these two fields are used for pending orders
  // if both are false then customer is paying cash and should display "Please have cash ready"
  // if both are true then customer will pay by card but hasn't yet so should display "A GooD Tree representative will call you soon to process your credit card"
  // if CreditCard is true and PendingPayment is false then customer has already paid and should display "Your order is paid for and on it's way soon!"
  CreditCard: boolean;
  PendingPayment: boolean;
  // number of minutes until pending order is expected to be delivered
  ETA: number;
  TaxTotal: number | null;
  Date: string;
  Method: string;
  EightsCount: number;
  StizysCount: number;
}

export type CustomerEnum =
  | 'NoAccount'
  | 'Unverified'
  | 'UnverifiedEcommerceL'
  | 'UnverifiedEcommerceA'
  | 'NewCustomerVerified'
  | 'Verified'
  | 'PendingOrder'
  | 'Blocked';

export interface CustomerState {
  CustomerStatus: CustomerEnum;
}

export interface PaymentInfo {
  CreditCard: string;
  CV: string;
  Expiration: string;
  Name: string;
}

export interface AuthState {
  currentUser: User;
  token: any;
  loading: boolean;
  loggedIn: boolean;
  notifications: Array<string>;
}

export interface ProductState {
  Products: Product[];
  productsIsLoaded: boolean;
}

export interface RootState {
  Customer: CustomerState;
  Order: OrderState;
  Auth: AuthState;
  Products: ProductState;
}

export interface AuthResponse {
  id: string;
  user_metadata: any;
  email: string;
}

export interface RequestParams {
  endpoint: string;
  body?: any;
  method: string;
}

export interface Error {
  status: string;
  title: string;
}

export interface ErrorResponse {
  errors: Error[];
}

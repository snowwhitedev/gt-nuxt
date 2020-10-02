import GoodTreeAPI, { IDeliveryAddressResponse } from '@/modules/GTAPI';
import { store } from '@/store';

export interface IDeliveryAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  id: string;
}

export default class AddressService {
  public static getFullAddress(address: IDeliveryAddress) {
    return `${address.street}, ${address.city}, ${address.state} ${address.zip}, ${address.country}`;
  }

  public static async getCurrentAddressId(): Promise<string> {
    const currentSelectedAddress = store.state.Order.LocationState.Address;
    const selectedAddressId = currentSelectedAddress.id;

    if (selectedAddressId) {
      return selectedAddressId;
    }

    const userAddresses = await this.getUserAddresses(true);
    const selectedFullAddressText = AddressService.getFullAddress(
      currentSelectedAddress
    );

    const matchingAddress = userAddresses.find(
      (address) => address.text === selectedFullAddressText
    );

    return matchingAddress ? matchingAddress.value.id : '';
  }

  public static async getUserAddresses(
    isUserLoggedIn: boolean
  ): Promise<{ value: IDeliveryAddress; text: string }[]> {
    if (!isUserLoggedIn) {
      return [];
    } else {
      const addresses = (await GoodTreeAPI.GetAddresses()).addresses;

      const selectableAddresses = addresses.map((address) => {
        return AddressService.mapAddressToSelectableInDataSource(address);
      });

      return selectableAddresses;
    }
  }

  public static addNewDeliveryAddress(
    deliveryAddress: IDeliveryAddress
  ): Promise<IDeliveryAddressResponse> {
    return GoodTreeAPI.AddAddress(deliveryAddress);
  }

  public static validateIfAddressIsAdded(
    userAddresses: { value: IDeliveryAddress; text: string }[],
    enteredAddress: IDeliveryAddress
  ) {
    return userAddresses.some((address) => {
      return address.text === AddressService.getFullAddress(enteredAddress);
    });
  }

  private static mapAddressToSelectableInDataSource(address) {
    return { value: address, text: AddressService.getFullAddress(address) };
  }
}

import { store } from '../store/index';
import { ErrorResponse, RequestParams } from '../store/interfaces';
// import { IDeliveryAddress } from '../profile/components/address/AddressService';
// need function for doing requests that abstracts token handling, json parsing, error handling
// then will need to replace all usages of fetch with my wrapper here

export interface IDeliveryAddressResponse {
  //   addresses: IDeliveryAddress[];
  addresses: string[];
}

export default class GoodTreeAPI {
  static _makeRequest<T>(requestParams: RequestParams): Promise<T> {
    return this._getToken().then((user: any) => {
      return fetch(
        'https://condescending-bartik-8d77d9.netlify.app/.netlify/functions/' +
          requestParams.endpoint,
        {
          method: requestParams.method,
          headers: {
            Authorization: 'Bearer ' + (user ? user.token.access_token : ''),
            'Content-Type': 'application/json'
          },
          body: requestParams.body
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          console.log('[response j]', response);
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            console.log('[response j]', response.json());
            return response.json();
          } else {
            // console.log('[response t]', response.text());
            return response.text();
          }
        })
        .catch((err: ErrorResponse) => {
          console.log('Error making request: ', err);
          return Promise.reject(err);
        });
    });
  }

  static _getToken() {
    return store.dispatch('validate');
  }

  static GetOrders(): Promise<Array<any>> {
    return this._makeRequest({
      endpoint: 'getOrders',
      method: 'GET'
    });
  }

  static SubmitOrder(body: any) {
    return this._makeRequest({
      endpoint: 'submitOrder',
      method: 'POST',
      body
    });
  }

  static UserStatus() {
    return this._makeRequest({
      endpoint: 'userStatus',
      method: 'GET'
    });
  }

  static ValidatePhone(body: any): Promise<any> {
    return this._makeRequest({
      endpoint: 'validatePhone',
      method: 'POST',
      body
    });
  }

  static OnfidoCheck(body: any) {
    return this._makeRequest({
      endpoint: 'onfidoCheck',
      method: 'POST',
      body
    });
  }

  static GetZone(name: string) {
    return this._makeRequest({
      endpoint: 'getZone?name=' + name,
      method: 'GET'
    });
  }

  static GetAddresses(): Promise<IDeliveryAddressResponse> {
    return this._makeRequest<IDeliveryAddressResponse>({
      endpoint: 'getCustomerAddress',
      method: 'GET'
    });
  }

  //   static AddAddress(deliveryAddress: IDeliveryAddress): Promise<undefined> {
  //     return this._makeRequest({
  //       endpoint: 'createCustomerAddress',
  //       method: 'POST',
  //       body: JSON.stringify(deliveryAddress)
  //     });
  //   }
  static AddAddress(deliveryAddress: string): Promise<undefined> {
    return this._makeRequest({
      endpoint: 'createCustomerAddress',
      method: 'POST',
      body: JSON.stringify(deliveryAddress)
    });
  }

  static GetProducts(location: any) {
    if (location !== 'Oakland' && location !== 'Long Beach') {
      return Promise.reject(Error('Not a valid Good Tree location'));
      // return Promise.reject('Not a valid Good Tree location');
    }
    return this._makeRequest({
      endpoint: 'getProducts?location=' + encodeURI(location),
      method: 'GET'
    });
  }
}

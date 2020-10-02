import { store } from '@/store/index';

export enum ErrorCodes {
  NoAddress = 0,
  BelowMinimum = 1,
  NotLoggedIn = 2,
  PendingOrder = 3,
  AccountNotVerified = 4,
  ShopClosed = 5
}

export default class CheckoutValidator {
  public validate() {
    const errors: any[] = [];
    const validationResult = { isValid: true, errors };

    if (
      !store.getters.EnteredAddress ||
      !store.state.Order.LocationState.IsInDeliveryNetwork
    ) {
      validationResult.errors.push({
        errorCode: ErrorCodes.NoAddress,
        errorMessage:
          'You need to enter delivery address within our delivery network.'
      });
    }

    if (!store.getters.AboveMinimum) {
      console.log('min', store.state.Order.LocationState.Zone.Minimum);
      validationResult.errors.push({
        errorCode: ErrorCodes.BelowMinimum,
        errorMessage:
          'Below minimum of $' +
          store.state.Order.LocationState.Zone.Minimum +
          '. Please add at least $' +
          (
            store.state.Order.LocationState.Zone.Minimum -
            store.getters.Subtotal
          ).toFixed(2)
      });
    }

    if (!store.getters.LoggedIn) {
      validationResult.errors.push({
        errorCode: ErrorCodes.NotLoggedIn,
        errorMessage: 'You must sign up to place an order.'
      });
    }

    if (store.getters.CustomerStatus === 'PendingOrder') {
      validationResult.errors.push({
        errorCode: ErrorCodes.PendingOrder,
        errorMessage: 'You already have a pending order.'
      });
    }

    if (
      store.getters.CustomerStatus !== 'Verified' &&
      store.getters.CustomerStatus !== 'NewCustomerVerified'
    ) {
      validationResult.errors.push({
        errorCode: ErrorCodes.AccountNotVerified,
        errorMessage:
          'Your account must be verified before you can submit your order.'
      });
    }

    if (validationResult.errors.length > 0) {
      validationResult.isValid = false;
    }

    return validationResult;
  }
}

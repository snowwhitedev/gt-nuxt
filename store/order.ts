import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { namespace } from 'vuex-class';
// import router from '../router';
// import Vue from 'vue';
// import NProgress from "nprogress";
import CheckoutValidator from '@/modules/checkout/CheckOutValidator';
import GoodTreeAPI from '@/modules/GTAPI';
// import { Analytics, Event } from '@/services/AnalyticsService';
import AddressService from '@/modules/address/AddressService';
import {
  RootState,
  OrderState,
  OrderEnum,
  OrderItem,
  LocationInfo
} from './interfaces';

export const state: OrderState = {
  CartID: '',
  OrderNumber: '',
  OrderStatus: 'Ordering',
  OnfleetID: '',
  Date: '',
  CreditCard: false,
  PendingPayment: true,
  ETA: 0,
  TaxTotal: null,
  ShoppingCart: getSavedCart('gt.cart'),
  Method: '',
  LocationState: getSavedState('gt.auth.address.v2'),
  EightsCount: 0,
  StizysCount: 0
};

export const actions: ActionTree<OrderState, RootState> = {
  UpdateLocation({ commit, dispatch }, item) {
    return GoodTreeAPI.GetZone(item.city)
      .then((zoneResponse) => {
        if (zoneResponse) {
          commit('UpdateLocation', { response: zoneResponse, address: item });
          return true;
        } else {
          commit('UpdateLocation', undefined);
          return false;
        }
        // dispatch('InitProduct');
      })
      .catch((err) => {
        console.log(err);
        commit('UpdateLocation', undefined);
        dispatch('InitProduct');
        return false;
      });
  },
  async Pay({ dispatch, state }, info /*: PaymentInfo */) {
    // NProgress.inc();

    const checkoutValidator = new CheckoutValidator();
    const validationResult = await checkoutValidator.validate();

    if (!validationResult.isValid) {
      // NProgress.done();
      // return Promise.reject(validationResult.errors[0].errorMessage);
      return Promise.reject(Error('[IN valid]'));
    }

    // NProgress.inc();

    const addressId = await AddressService.getCurrentAddressId();

    return GoodTreeAPI.SubmitOrder(
      JSON.stringify({
        AddressId: addressId,
        ReplacementPreference: info.replacementPreference,
        Payment: info.info,
        ScheduledTime: info.scheduledTime,
        Cart: state.ShoppingCart.flatMap((item) => {
          return { SKU: item.Product.SKU, Quantity: item.Quantity };
        })
      })
    )
      .then(() => {
        // Analytics.registerEvent({
        //   event: Event.OrderCompleted,
        //   revenue: getters.Total,
        //   order_id: rootState.Order.CartID,
        //   shipping: getters.Fee,
        //   tax: getters.TaxTotal,
        //   currency: 'USD',
        //   products: getters.ShoppingCart
        // });
        saveState('gt.cart', []);
        return dispatch('UpdateCustomerStatusServer');
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
};

export const mutations: MutationTree<OrderState> = {
  UpdateOrderStatus(state, newStatus: OrderEnum) {
    state.OrderStatus = newStatus;
  },
  UpdateLocation(state, zone: any) {
    if (zone) {
      state.LocationState.Address = zone.address;
      state.LocationState.IsInDeliveryNetwork = true;
      state.LocationState.Zone.Id = zone.response.Id;
      state.LocationState.Zone.Name = zone.response.Name;
      state.LocationState.Zone.DeliveryFee = zone.response.DeliveryFee;
      state.LocationState.Zone.Minimum = zone.response.Minimum;
      state.LocationState.Zone.SalesTax = zone.response.SalesTax;
      state.LocationState.Zone.ExciseTax = zone.response.ExciseTax;
      state.LocationState.Zone.LocalCannabisTax =
        zone.response.LocalCannabisTax;
      state.LocationState.Zone.Vendor = zone.response.Vendor;

      // Vue.notify({
      //   title: 'Hooray!',
      //   text: 'You are within our delivery range!'
      // });
      // this.dispatch('InitProduct');
      saveState('gt.auth.address.v2', state.LocationState);
    } else {
      state.LocationState.IsInDeliveryNetwork = false;

      // Vue.notify({
      //   title: 'Oh No!',
      //   text:
      //     'We are sorry but you are outside of our delivery network. If you believe this is a mistake please contact a Good Tree representative.',
      //   type: 'warn',
      //   duration: 6500
      // });

      return false;
    }
  },
  UpdatePendingOrder(state, pendingOrder: OrderState) {
    Object.assign(state, pendingOrder);
  },
  UpdateEightsCount(state, count: number) {
    state.EightsCount = count;
  },
  UpdateStizysCount(state, count: number) {
    state.StizysCount = count;
  },
  SetItem(state, item: OrderItem) {
    // send api request to add item
    if (state.LocationState.Address.street !== '') {
      // need make analytics event here smart enough to
      // figure out whether this Set operation is adding or removing products
      const index = state.ShoppingCart.indexOf(
        state.ShoppingCart.filter((x) => x.Product.SKU === item.Product.SKU)[0]
      );
      if (index >= 0) {
        if (item.Quantity > 0) {
          state.ShoppingCart[index].Quantity = item.Quantity;
          // Analytics.registerEvent({
          //   event: Event.ProductAdded,
          //   cart_id: state.CartID,
          //   product_id: item.Product.SKU,
          //   quantity: item.Quantity - state.ShoppingCart[index].Quantity,
          //   name: item.Product.Name
          // });
        } else {
          state.ShoppingCart.splice(index, 1);
          // Analytics.registerEvent({
          //   event: Event.ProductAdded,
          //   cart_id: state.CartID,
          //   product_id: item.Product.SKU,
          //   quantity: item.Quantity - state.ShoppingCart[index].Quantity,
          //   name: item.Product.Name
          // });
        }
      } else {
        console.log(item);
        state.ShoppingCart.push(item);
        // Analytics.registerEvent({
        //   event: Event.ProductAdded,
        //   cart_id: state.CartID,
        //   product_id: item.Product.SKU,
        //   quantity: item.Quantity,
        //   name: item.Product.Name
        // });
      }
      state.ShoppingCart = upsellCheck(state.ShoppingCart, 'eighth');
      saveState('gt.cart', state.ShoppingCart);
    } else {
      const page = 'home';
      const msg =
        'You must enter your delivery address before adding items to cart.';
      console.log('[go home]', page, msg);
      // router.push({ name: page });
      // Vue.notify({
      //   title: 'Oops',
      //   text: msg,
      //   type: 'warn'
      // });
    }
  },
  RemoveItem(state, item: OrderItem) {
    state.ShoppingCart.splice(state.ShoppingCart.indexOf(item), 1);
    // add logic
    // Analytics.registerEvent({
    //   event: Event.ProductRemoved,
    //   cart_id: state.CartID,
    //   product_id: item.Product.SKU
    // });
    saveState('gt.cart', state.ShoppingCart);
  }
};

export const getters: GetterTree<OrderState, RootState> = {
  // computed values are cached hooray
  OrderStatus: (state1) => state1.OrderStatus,
  ShoppingCart: (state1) => {
    const customSort = function (a: any, b: any) {
      const genreA = a.Product.Name.toUpperCase();
      const genreB = b.Product.Name.toUpperCase();

      let comparison = 0;
      if (genreA > genreB) {
        comparison = 1;
      } else if (genreA < genreB) {
        comparison = -1;
      }
      return comparison;
    };
    return state1.ShoppingCart.sort(customSort);
  },
  CartID: (state1) => state1.CartID,
  Zone: (state) => state.LocationState.Zone,
  Subtotal: (state1) =>
    state1.ShoppingCart.reduce(
      (acc, cur) => acc + cur.Product.Price * cur.Quantity - cur.Savings,
      0
    ),
  OnfleetLink: (state1) => {
    return 'https://onf.lt/' + state1.OnfleetID;
  },
  OnfleetId: (state1) => state1.OnfleetID,
  OnfleetReady: (state) => state.OrderStatus === 'Pending Pulling All Items',
  Minimum: (state1) => state1.LocationState.Zone.Minimum,
  AboveMinimum: (state1, getters1) =>
    getters1.Subtotal >= state1.LocationState.Zone.Minimum,
  Fee: () => 0,
  FirstTimeDiscount: (state, getters) => {
    console.log('[avoid state error]', state);
    return getters.CustomerStatus === 'NewCustomerVerified' &&
      getters.Subtotal >= 45 &&
      getters.HasTwoItems
      ? 15
      : 0;
  },
  Tax: (state1, getter) => {
    const local =
      (state1.ShoppingCart.filter(
        (x) => x.Product.Type !== 'Accessories'
      ).reduce((acc, cur) => acc + cur.Product.Price, 0) -
        getter.FirstTimeDiscount) *
      (state.LocationState.Zone.LocalCannabisTax / 100);
    const excise =
      (state1.ShoppingCart.filter(
        (x) => x.Product.Type !== 'Accessories'
      ).reduce((acc, cur) => acc + cur.Product.Price, 0) -
        getter.FirstTimeDiscount +
        local) *
      (state1.LocationState.Zone.ExciseTax / 100);
    return (
      local +
      excise +
      (local +
        excise +
        getter.Subtotal +
        getter.Fee -
        getter.FirstTimeDiscount) *
        (state1.LocationState.Zone.SalesTax / 100)
    );
  },
  Total: (state, getters) => {
    console.log('[avoid state error]', state);
    return (
      getters.Subtotal + getters.Fee + getters.Tax - getters.FirstTimeDiscount
    );
  },
  TaxTotal: (state) => state.TaxTotal,
  PaymentMethod: (state) => state.Method,
  EnteredAddress: (state) =>
    state.LocationState.Address.street &&
    state.LocationState.Address.street.length > 0,
  HasTwoItems: (state) =>
    Array.from(state.ShoppingCart)
      .filter((x) => x.Product.Price >= 5)
      .reduce((sum, current) => sum + current.Quantity, 0) > 1,
  EightsCount: (state) => state.EightsCount,
  StizysCount: (state) => state.StizysCount,
  Formatted: (state1) =>
    AddressService.getFullAddress(state1.LocationState.Address)
};

function saveState(key: string, state: any) {
  window.localStorage.setItem(key, JSON.stringify(state));
}
function getSavedState(key: string): LocationInfo {
  const store = window.localStorage.getItem(key);
  const results = store
    ? JSON.parse(store)
    : {
        Address: {
          street: '',
          city: '',
          state: 'CA',
          zip: '',
          country: 'USA'
        },
        Zone: {
          Minimum: 0,
          DeliveryFee: 0,
          SalesTax: 0,
          ExciseTax: 0,
          Id: '',
          Account: '',
          Name: '',
          Vendor: 'Oakland',
          LocalCannabisTax: 0
        },
        IsInDeliveryNetwork: true
      };
  return results;
}
function getSavedCart(key: any): OrderItem[] {
  const store = window.localStorage.getItem(key);
  const results = store ? JSON.parse(store) : [];
  return results;
}

const upsellCheck = function (items: OrderItem[], type: string) {
  console.log('testing', items);
  if (items) {
    // count 8ths
    let deal: OrderItem[];
    if (type === 'eighth') {
      deal = items.filter((x: OrderItem) => x.Product.PackageSize === 3.5);
    } else if (type === 'stiiizy') {
      deal = items.filter(
        (x: OrderItem) =>
          x.Product.Name.includes('Stiiizy') &&
          !x.Product.Name.includes('Battery')
      );
    } else if (type === 'preroll') {
      deal = items.filter((x: OrderItem) => x.Product.Type === 'Preroll');
    } else {
      const res: OrderItem[] = [];
      return res;
    }

    const count = deal
      .flatMap((x: OrderItem) => x.Quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    // if (type === 'eighth') {
    //   store.commit('UpdateEightsCount', count || 0);
    // }

    // if (type === 'stiiizy') {
    //   store.commit('UpdateStizysCount', count || 0);
    // }

    deal.sort((a: OrderItem, b: OrderItem) => {
      const priceA = a.Product.Price;
      const priceB = b.Product.Price;

      let comparison = 0;
      if (priceA > priceB) {
        comparison = 1;
      } else if (priceA < priceB) {
        comparison = -1;
      }
      return comparison;
    });
    // update pricing
    let msg = '';
    switch (type) {
      case 'eighth': {
        msg = 'Buy 1 more to get a FREE 1/8th';
        break;
      }
      case 'stiiizy': {
        msg = 'Buy 1 more to get a FREE Stiiizy';
        break;
      }
      case 'preroll': {
        msg = 'Buy 1 more to get a FREE Preroll';
        break;
      }
    }
    if (count === 3 || count === 7) {
      // Vue.notify({
      //   title: 'BUY ONE MORE',
      //   text: msg
      // });
      console.log('[BUY ONE MORE]', msg);
    }
    if (count > 3 && count < 8) {
      items[items.indexOf(deal[0])].Savings =
        items[items.indexOf(deal[0])].Product.Price;
    } else if (count > 7) {
      if (items[items.indexOf(deal[0])].Quantity >= 2) {
        items[items.indexOf(deal[0])].Savings =
          2 * items[items.indexOf(deal[0])].Product.Price;
      } else {
        items[items.indexOf(deal[0])].Savings =
          items[items.indexOf(deal[0])].Product.Price;
        items[items.indexOf(deal[1])].Savings =
          items[items.indexOf(deal[1])].Product.Price;
      }
    } else {
      items[0].Savings = 0;
      if (items.length > 1) {
        items[1].Savings = 0;
      }
    }
  }
  return items;
};

export const productsNameSpace = namespace('products/');

export default {
  state,
  actions,
  mutations,
  getters
};

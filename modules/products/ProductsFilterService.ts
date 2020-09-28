import { Product } from '@/store/interfaces';

export interface IMinMaxValues {
  min?: number;
  max?: number;
}

export default class ProductsFilterService {
  public getMinMaxPrices(products: Product[]): IMinMaxValues {
    let min: any;
    let max: any;

    products.forEach((product) => {
      if (min === undefined || product.Price < min) {
        min = product.Price;
      }

      if (max === undefined || product.Price > max) {
        max = product.Price;
      }
    });

    return { min: Math.ceil(min || 0), max: Math.ceil(max || 0) };
  }

  public getUniqueValues(products: Product[], field: string) {
    const fieldValues = products.map((value: any) => value[field]);
    const uniqueValues = Array.from(new Set(fieldValues));

    return uniqueValues.map((size) => {
      return { size, selected: false };
    });
  }
}

export enum Categories {
  Accessories = 'accessories',
  Edibles = 'edibles',
  Extracts = 'extracts',
  Flower = 'flower',
  Prerolls = 'prerolls',
  Vapes = 'vapes'
}

export interface ICategory {
  Name?: Categories;
  // Name: string,
  Id?: string;
  subtitle?: string;
  UOM?: string;
}

const categories = [
  {
    Name: Categories.Accessories,
    Id: '703c4743-8c5e-4792-b62e-2a2f57d3dcfe',
    subtitle: 'The Essentials',
    UOM: 'g'
  },
  {
    Name: Categories.Edibles,
    Id: '2376ffb7-b2f2-4868-b3ae-908aa7c2500b',
    subtitle: 'Taste the Rainbow',
    UOM: 'mg'
  },
  {
    Name: Categories.Extracts,
    Id: 'ce4befcf-9a6d-4685-a9d2-c163b3db43f3',
    subtitle: 'Wax & Shattered',
    UOM: 'g'
  },
  {
    Name: Categories.Flower,
    Id: '97e262e1-8461-413b-980e-5a3e905f46a4',
    subtitle: 'The Original High',
    UOM: 'g'
  },
  {
    Name: Categories.Prerolls,
    Id: '4508f81d-b68c-474f-b383-be9352acea2a',
    subtitle: "Easy Puffin'",
    UOM: 'g'
  },
  {
    Name: Categories.Vapes,
    Id: 'cb7026d4-dd4b-4af7-830d-962322106f83',
    subtitle: 'Please Concentrate',
    UOM: 'g'
  }
];

// const baseFilters = [
//   { field: 'Name', type: 'base' },
//   { field: 'Price', type: 'range' },
//   { field: 'Weight', type: 'selection' }
// ];

export default class CategoryService {
  public getCategoryByName(categoryName: Categories): ICategory {
    const res = categories.find((category) => category.Name === categoryName);
    return res || <ICategory>{};
  }

  public getCategoryById(categoryId: string): ICategory {
    const res = categories.find((category) => category.Id === categoryId);
    return res || <ICategory>{};
  }

  public getCategoryIdByName(categoryName: Categories): string {
    const res = categories.find((category) => category.Name === categoryName);
    return res ? res.Id : '';
  }

  public getCategorySubtitle(categoryName: Categories): string | undefined {
    return categories.find((category) => category.Name === categoryName)
      ?.subtitle;
  }
}

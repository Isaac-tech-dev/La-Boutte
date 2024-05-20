export type FecthAllPizzaAttribute = String;
export interface StoreProduct {
  _id: string;
  name: string;
  veg: boolean;
  price: number;
  description: string;
  quantity: number;
  image: string;
  sizeandcrust: {
    [key: string]: { price: number }[];
  }[];
}
export type FecthAllPizzaResponse = {
  messsage: string;
  data: StoreProduct[];
};

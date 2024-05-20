export type FetchAllCartAttribute = {
  userId: string | null | undefined;
};
export interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    __v: number;
  };
  productName: string;
  quantity: number;
  _id: string;
}

export interface CartData {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export type FetchAllCartResponse = {
  message: string;
  cart: CartData;
};

//ADD TO CART
export type AddToCartAttribute = {
  userId: string | null | undefined;
  productId: string;
  productName: string;
  quantity: number;
};
export type AddToCartResponse = {
  message: string;
  cart: CartData;
};

//DELETE FROM CART
export type DeleteCartAttribute = {
  productId: string;
};
export type DeleteCartResponse = {
  message: string;
};

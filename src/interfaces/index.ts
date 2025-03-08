export interface IProductDetails {
  images: string[];
  title: string;
  description: string;
  price: number;
  ratingsAverage: number;
}

// --------Cart Interface--------
export interface ICart {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    _id: string;
    cartOwner: string;
    products: Array<{
      count: number;
      _id: string;
      product: IProduct;
      price: number;
    }>;
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
  };
}
export interface IProduct {
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  subcategory: Array<{
    _id: string;
    name: string;
    slug: string;
    category: string;
  }>;
  id: string;
  price: number;
}

// --------WishList Interface--------
export interface IWishListProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  brand: {
    name: string;
    image: string;
  };
  category: {
    name: string;
  };
}

export interface IWishList {
  status: string;
  count: number;
  data: IWishListProduct[];
}

// --------Category Interface--------

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// --------Brand Interface--------
export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// --------AllOrders Interface--------
export interface OrderCartItem {
  count: number;
  _id: string;
  product: {
    subcategory: {
      _id: string;
      name: string;
      slug: string;
      category: string;
    }[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    imageCover: string;
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    ratingsAverage: number;
    id: string;
  };
  price: number;
}

export interface IOrder {
  shippingAddress: {
    details: string;
    city: string;
    phone: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: OrderCartItem[];
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}
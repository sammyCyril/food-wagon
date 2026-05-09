
export type Food = {
  _id: string;
  image: string;
  title: string;
  discount: string;
  days: string;
};

export type Item = {
  _id: string;
  image: string;
  name: string;
  place: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  image: string;
  name: string;
  logo: string;
  rating: number;
  discount: string;
  fast: boolean;
  status: string;
  statusColor: "green" | "orange";
};

export type Foodss = {
  _id: string;
  name: string;
  image: string;
}

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
};
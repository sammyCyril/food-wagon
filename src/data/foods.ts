// data/foods.ts

import { Food, Foodss, Item, User } from "./type";

 const foods: Food[] = [
  {
    _id: "1",
    image: "/pizza/pizza.jpg",
    title: "Greys Vage",
    discount: "15% off",
    days: "6 Days Remaining",
  },
  {
    _id: "2",
    image: "/pizza/pizza6.jpg",
    title: "Greys Vage",
    discount: "10% off",
    days: "6 Days Remaining",
  },
  {
    _id: "3",
    image: "/pizza/pizza2.jpg",
    title: "Greys Vage",
    discount: "25% off",
    days: "7 Days Remaining",
  },
  {
    _id: "4",
    image: "/pizza/pizza4.jpg",
    title: "Greys Vage",
    discount: "20% off",
    days: "8 Days Remaining",
  },
];
// export const getFoods = (): Food[] => foods;

export const getFoods = async (): Promise<Food[]>  => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return foods;
}

// ITEMS
 const items: Item[] = [
  {
    _id: "1",
    image: "/pizza/pizza6.jpg",
    name: "Cheese Burger",
    place: "Burger Arena",
    price: 3.88,
  },
  {
    _id: "2",
    image: "/pizza/pizza5.jpg",
    name: "Toffe’s Cake",
    place: "Top Sticks",
    price: 4.0,
  },
  {
    _id: "3", 
    image: "/pizza/pizza.jpg",
    name: "Dancake",
    place: "Cake World",
    price: 1.99,
  },
  {
    _id: "4",
    image: "/pizza/pizza3.jpg",
    name: "Crispy Sandwitch",
    place: "Fastfood Dine",
    price: 3.0,
  },
  {
    _id: "5",
    image: "/pizza/pizza1.jpg",
    name: "Thai Soup",
    place: "Foody man",
    price: 2.79,
  },
    {
    _id: "6",
    image: "/pizza/pizza6.jpg",
    name: "Cheese Burger",
    place: "Burger Arena",
    price: 3.88,
  },
  {
    _id: "7",
    image: "/pizza/pizza5.jpg",
    name: "Toffe’s Cake",
    place: "Top Sticks",
    price: 4.0,
  },
  {
    _id: "8",
    image: "/pizza/pizza2.jpg",
    name: "Dancake",
    place: "Cake World",
    price: 1.99,
  },
];
export const getItems = async (): Promise<Item[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return items;
};

// data/restaurants.ts
type Restaurant = {
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

const restaurants: Restaurant[] = [
  {
    _id: "1",
    image: "/pizza/pizza.jpg",
    name: "Foodworld",
    logo: "/pizza/pizza7.jpg",
    rating: 46,
    discount: "20% off",
    fast: true,
    status: "Opens tomorrow",
    statusColor: "orange",
  },
  {
    _id: "2",
    image: "/pizza/pizza6.jpg",
    name: "Pizzahub",
    logo: "/images/logo2.png",
    rating: 40,
    discount: "15% off",
    fast: true,
    status: "Opens tomorrow",
    statusColor: "orange",
  },
  {
    _id: "3",
    image: "/pizza/pizza2.jpg",
    name: "Donuts hut",
    logo: "/pizza/pizza8.jpg",
    rating: 20,
    discount: "10% off",
    fast: true,
    status: "Open Now",
    statusColor: "green",
  },
   {
    _id: "4",
    image: "/pizza/pizza3.jpg",
    name: "Foodworld",
    logo: "/images/logo1.png",
    rating: 46,
    discount: "20% off",
    fast: true,
    status: "Opens tomorrow",
    statusColor: "orange",
  },
  {
    _id: "5", 
    image: "/pizza/pizza4.jpg",
    name: "Pizzahub",
    logo: "/images/logo2.png",
    rating: 40,
    discount: "15% off",
    fast: true,
    status: "Opens tomorrow",
    statusColor: "orange",
  },
  {
    _id: "6",
    image: "/pizza/pizza5.jpg",
    name: "Donuts hut",
    logo: "/images/logo3.png",
    rating: 20,
    discount: "10% off",
    fast: true,
    status: "Open Now",
    statusColor: "green",
  },
];
export const getRestaurants = async (): Promise<Restaurant[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return restaurants;
}

 const foodss: Foodss[] = [
  { _id: "1", name: "Pizza", image: "/pizza/pizza.jpg" },
  { _id: "2", name: "Burger", image: "/pizza/pizza6.jpg" },
  { _id: "3", name: "Noodles", image: "/pizza/pizza2.jpg" },
  { _id: "4", name: "Sub-sandwich", image: "/pizza/pizza3.jpg" },
  { _id: "5", name: "Chowmein", image: "/pizza/pizza4.jpg" },
  { _id: "6", name: "Steak", image: "/pizza/pizza5.jpg" },
    { _id: "7", name: "Noodles", image: "/pizza/pizza2.jpg" },
  { _id: "8", name: "Sub-sandwich", image: "/pizza/pizza1.jpg" },
  { _id: "9", name: "Chowmein", image: "/pizza/pizza4.jpg" },
  { _id: "10", name: "Steak", image: "/pizza/pizza5.jpg" },
];
export const getFoodss = async (): Promise<Foodss[]> => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return foodss;
}

export const mockUsers: User[] = [
  {
    _id: "1",
    name: "Sam",
    email: "sam@sam.com",
    avatar: "",
  },
  {
    _id: "2",
    name: "John Doe",
    email: "john@test.com",
    avatar: "",
  },
];
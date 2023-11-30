import { Basket } from "src/app/models/basket";

export interface User {
  email: string;
  token: string;
}

export interface UserDto extends User {
  basket: Basket;
}

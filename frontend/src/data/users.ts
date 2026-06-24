export type Role = "admin" | "pt" | "marketing";

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  role: Role;
}

export const users: User[] = [
  {
    id: 1,
    name: "Admin Gym",
    username: "admin",
    password: "123456",
    role: "admin",
  },

  {
    id: 2,
    name: "PT Gym",
    username: "pt",
    password: "123456",
    role: "pt",
  },

  {
    id: 3,
    name: "Marketing Gym",
    username: "marketing",
    password: "123456",
    role: "marketing",
  },
];

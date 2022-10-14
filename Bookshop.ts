export interface Bookstore {
  id: number;
  name: string;
  address: Address;
  telephone: string;
  website: string;
  owner?: Owner;
  company?: Company;
  books: Book[];
}

export interface Address {
  line_one: string;
  line_two: string;
  line_three: string;
  city: string;
  region: string;
  postcode: string;
}

export interface Owner {
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  address: Address;
}

export interface Company {
  id?: number;
  contact_name: string;
  contact_telephone: string;
  contact_email: string;
  address: Address;
  website: string;
}

export interface Book {
  id: number;
  name: string;
  author: string;
  isbn: string;
  format: string; // or potentially number
  category: string; // or potentially number
  quantity: number;
  price: number;
}

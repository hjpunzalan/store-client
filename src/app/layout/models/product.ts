export interface Product {
  id: number;
  brand: string;
  description: string;
  name: string;
  pictureUrl: string;
  price: number;
  quantityInStock: number;
  type: string;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  types?: string[];
  brands?: string[];
  pageNumber: number;
  pageSize: number;
}

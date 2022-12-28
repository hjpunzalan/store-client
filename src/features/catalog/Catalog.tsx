import { Button } from "@mui/material";
import { Product } from "src/app/layout/models/product";
import ProductList from "./ProductList";

interface Props {
	products: Product[];
}

const Catalog = ({ products }: Props) => {
	return (
		<>
			<ProductList products={products} />
			<Button variant="contained">Add Product</Button>
		</>
	);
};

export default Catalog;

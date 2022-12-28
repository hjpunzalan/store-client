import { List } from "@mui/material";
import { Product } from "src/app/layout/models/product";
import ProductCard from "./ProductCard";

interface Props {
	products: Product[];
}

const ProductList = ({ products }: Props) => {
	return (
		<>
			<List>
				{products.map((p) => (
					<ProductCard key={p.id} product={p} />
				))}
			</List>
		</>
	);
};

export default ProductList;

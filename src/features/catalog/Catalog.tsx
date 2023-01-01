import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "src/app/api/agent";
import { Product } from "src/app/layout/models/product";
import ProductList from "./ProductList";

const Catalog = () => {
	const [products, setProducts] = useState<Product[] | undefined>();
	useEffect(() => {
		agent.Catalog.list().then((data) => {
			setProducts(data);
		});
	}, []);
	return (
		<>
			{products && <ProductList products={products} />}
			<Button variant="contained">Add Product</Button>
		</>
	);
};

export default Catalog;

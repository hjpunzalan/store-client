import { Button } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { Product } from "src/app/layout/models/product";
import { storeAPI } from "src/helpers/axios";
import ProductList from "./ProductList";

const Catalog = () => {
	const [products, setProducts] = useState<Product[] | undefined>();
	useEffect(() => {
		storeAPI
			.get<Product[]>("/products")
			.then((res: { data: SetStateAction<Product[] | undefined> }) => {
				setProducts(res.data);
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

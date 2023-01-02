import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "src/app/api/agent";
import LoadingComponent from "src/app/layout/LoadingComponent";
import { Product } from "src/app/layout/models/product";
import ProductList from "./ProductList";

const Catalog = () => {
	const [products, setProducts] = useState<Product[] | undefined>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		agent.Catalog.list()
			.then((data) => {
				setProducts(data);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <LoadingComponent message="Loading Products..." />;

	return (
		<>
			{products && <ProductList products={products} />}
			<Button variant="contained">Add Product</Button>
		</>
	);
};

export default Catalog;

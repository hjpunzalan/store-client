import { Container, CssBaseline } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import Catalog from "src/features/catalog/Catalog";
import { storeAPI } from "src/helpers/axios";
import Header from "./Header";
import { Product } from "./models/product";

function App() {
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
			<CssBaseline />
			<Header />
			<Container>{products && <Catalog products={products} />}</Container>
		</>
	);
}

export default App;

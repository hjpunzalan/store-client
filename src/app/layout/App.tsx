import { SetStateAction, useEffect, useState } from "react";
import Catalog from "src/features/catalog/Catalog";
import { storeAPI } from "src/helpers/axios";
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
		<main>
			<h1>Store App</h1>
			{products && <Catalog products={products} />}
		</main>
	);
}

export default App;

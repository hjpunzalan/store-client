import { useEffect, useState } from "react";
import { storeAPI } from "./helpers/axios";

interface Product {
	id: number;
	brand: string;
	description: string;
	name: string;
	pictureUrl: string;
	price: number;
	quantityInStock: number;
	type: string;
}

function App() {
	const [products, setProducts] = useState<Product[] | undefined>();

	useEffect(() => {
		storeAPI.get("/products").then((res) => {
			setProducts(res.data);
		});
	}, []);

	return (
		<main>
			<h1>Store App</h1>
			{products && (
				<ul>
					{products.map((p) => (
						<li>{p.name}</li>
					))}
				</ul>
			)}
		</main>
	);
}

export default App;

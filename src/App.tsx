import { useEffect, useState } from "react";
import { storeAPI } from "./helpers/axios";
import { Product } from "./types/product";

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
						<li key={p.id}>
							{p.name} - {p.price}
						</li>
					))}
				</ul>
			)}
		</main>
	);
}

export default App;

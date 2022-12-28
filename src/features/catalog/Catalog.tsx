import { Product } from "src/app/layout/models/product";

interface Props {
	products: Product[];
}

const Catalog = ({ products }: Props) => {
	return (
		<>
			<ul>
				{products.map((p) => (
					<li key={p.id}>
						{p.name} - {p.price}
					</li>
				))}
			</ul>
			<button>Add Product</button>
		</>
	);
};

export default Catalog;

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "src/app/layout/models/product";
import { storeAPI } from "src/helpers/axios";

interface Props {}

const ProductDetails = (props: Props) => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		storeAPI
			.get<Product>(`/products/${id}`)
			.then((res) => {
				setProduct(res.data);
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <h3>Loading...</h3>;
	if (product) return <Typography variant="h2">{product.name}</Typography>;
	else return <h3>Product not found!</h3>;
};

export default ProductDetails;

import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "src/app/layout/models/product";

interface Props {
	product: Product;
}

const ProductCard = ({ product }: Props) => {
	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar src={product.pictureUrl} />
			</ListItemAvatar>
			<ListItemText>
				{product.name} - {product.price}
			</ListItemText>
		</ListItem>
	);
};

export default ProductCard;

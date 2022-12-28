import {
	Avatar,
	Button,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import { Product } from "src/app/layout/models/product";

interface Props {
	products: Product[];
}

const Catalog = ({ products }: Props) => {
	return (
		<>
			<List>
				{products.map((p) => (
					<ListItem key={p.id}>
						<ListItemAvatar>
							<Avatar src={p.pictureUrl} />
						</ListItemAvatar>
						<ListItemText>
							{p.name} - {p.price}
						</ListItemText>
					</ListItem>
				))}
			</List>
			<Button variant="contained">Add Product</Button>
		</>
	);
};

export default Catalog;

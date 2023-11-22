import { useAppSelector } from "src/app/store/configureStore";

interface Props {}

const HomePage = (props: Props) => {
  const { user } = useAppSelector((state) => state.account);
  console.log(user);
  return <div>HomePage</div>;
};

export default HomePage;

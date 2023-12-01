import { Route, Switch } from "react-router-dom";
import RequireAuth from "src/app/router/RequireAuth";
import NotFound from "src/errors/NotFound";
import ServerError from "src/errors/ServerError";
import AboutPage from "src/features/about/AboutPage";
import Login from "src/features/account/Login";
import Register from "src/features/account/Register";
import BasketPage from "src/features/basket/BasketPage";
import Catalog from "src/features/catalog/Catalog";
import ProductDetails from "src/features/catalog/ProductDetails";
import CheckoutPage from "src/features/checkout/CheckoutPage";
import ContactPage from "src/features/contact/ContactPage";
import HomePage from "src/features/home/HomePage";

const Routes = () => {
  return (
    <>
      <Switch>
        <RequireAuth>
          <Route path="/checkout" component={CheckoutPage} />
        </RequireAuth>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/catalog" component={Catalog} />
        <Route path="/catalog/:id" component={ProductDetails} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/server-error" component={ServerError} />
        <Route path="/basket" component={BasketPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default Routes;

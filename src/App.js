import { useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import Cart from "./component/Cart/cart";
import Layout from "./component/Layout/layout";
import Products from "./component/Shop/product";

import Notification from "./component/UI/notification";
import { useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-action";

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

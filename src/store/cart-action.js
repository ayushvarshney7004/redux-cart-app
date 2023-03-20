import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://test-database-584cc-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("failed to fetch data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "failed to fetch data",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "success",
        message: "sent cart data successful",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://test-database-584cc-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("sending cart data Failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "sending cart data is successful",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "sending the cart data failed",
        })
      );
    }
  };
};

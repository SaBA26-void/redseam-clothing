import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { UserContext } from "../../contexts/UserContext";
import { CartContext } from "../../contexts/CartContext";
import CartItem from "../../components/Cart/CartItem";
import CartTotals from "../../components/Cart/CartTotals";
import Button from "../../components/Button";
import { checkout, fetchCart } from "../../data/Cart";
import useRedirectUnauthorized from "../../hooks/useRedirectUnauthorized";

import "./Checkout.scss";

export default function Checkout() {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState(userContext?.user?.user.email);
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");

  useRedirectUnauthorized();

  useEffect(() => {
    setEmail(userContext?.user?.user.email);
  }, [userContext?.user?.user.email]);

  const handlePay = useCallback(() => {
    checkout({
      name,
      surname,
      email: email || "",
      address,
      zip_code: zip,
    })
      .then(fetchCart)
      .then((cart) => cartContext?.setCart(cart))
      .then(() => {
        navigate("/success");
      })
      .catch(console.error);
  }, [userContext?.user?.token, name, surname, email, address, zip]);

  return (
    <div>
      <Header />
      <main className="checkout">
        <h1>Checkout</h1>
        <div className="checkout-content">
          <form>
            <div>
              <h2>Order detail</h2>
              <div>
                <Input
                  type="text"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  label="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <Input
                  type="text"
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Input
                  type="text"
                  label="Zip code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
            </div>
          </form>
          <div>
            <div>
              <div>
                {cartContext?.cart?.map((item) => (
                  <CartItem item={item} />
                ))}
              </div>
            </div>
            <CartTotals />
            <Button className="checkout-pay" type="button" onClick={handlePay}>
              Pay
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

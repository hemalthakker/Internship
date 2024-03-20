import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Admin from "./screens/admin/Admin";
import { CartProvider } from "./components/ContextReducer";
import UserList from "./screens/admin/UserList";
import ItemList from "./screens/admin/ItemList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrder from "./screens/MyOrder";
import OrderList from "./screens/admin/OrderList";
import AddItem from "./screens/admin/AddItem";
import Cart from "./screens/Cart";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/itemlist" element={<ItemList />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/additem" element={<AddItem />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      <ToastContainer />
    </>
  );
}

export default App;

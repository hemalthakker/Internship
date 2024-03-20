import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { toast } from "react-toastify";

const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        toast("Added to Cart!", { autoClose: 1000 });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img,
        });
        toast("Added to Cart!", { autoClose: 1000 });
        return;
      }
      toast("Added to Cart!", { autoClose: 1000 });
      return;
    }
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      {/* <div className="grid lg:grid-cols-4 md:grid-cols-2"> */}
      <div className="flex flex-col items-center justify-center m-10">
        <img
          src={props.foodItem.img}
          className="w-40 h-40 object-fill"
          alt="biryani"
        />
        <h3 className="uppercase text-center text-xl font-bold mt-3">
          {props.foodItem.name}
        </h3>
        <div>
          <select
            name="biryani qty"
            id="qty"
            className="border-2 border-black rounded-lg mr-3 mt-3 p-1 font-bold"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(5), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            name="biryani size"
            id="size"
            className="border-2 border-black rounded-lg mt-3 p-1 font-bold"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>

        <p className="uppercase text-center text-lg font-bold mt-3">
          {" "}
          ₹{finalPrice}/-
        </p>

        <button id="" className="button-87" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Card;

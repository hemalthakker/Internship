import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import { toast } from "react-toastify";

const AddItem = () => {
  const [item, setItem] = useState({
    name: "",
    type: "veg",
    half: "",
    full: "",
  });
  const [file, setFile] = useState(null);
  const onChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  // console.log(item.type);

  // function convertToBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "biryani_bowl");
    data.append("cloud_name", "dpup9jku2");

    fetch("https://api.cloudinary.com/v1_1/dpup9jku2/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        // console.log(data.url);

        const response = await fetch("http://localhost:5000/api/additems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: item.name,
            img: data.url,
            type: item.type,
            options: [
              {
                half: item.half,
                full: item.full,
              },
            ],
          }),
        });
        const { sucess } = await response.json();
        if (sucess) {
          toast.success("Item Added Sucessfully!", { autoClose: 1000 });
        } else {
          toast.error("some error occured!", { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error("some error occured in file uploading !", {
          autoClose: 1000,
        });
        //  console.log(err);
      });
  };

  return (
    <div>
      <AdminNavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-xl">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800 mb-8">
            Insert Biryani
          </div>
          <form>
            <div className="mb-6">
              <span className="uppercase text-sm font-bold">Biryani Name</span>
              <br />
              <input
                className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                type="text"
                name="name"
                placeholder="Enter Biryani Name"
                value={item.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <span className="uppercase text-sm font-bold">Biryani Image</span>
              <br />
              <input
                type="file"
                name="img"
                className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                id="imageToUpload"
                accept="image/png, image/jpeg"
                // value={file}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="mb-6">
              <span className="uppercase text-sm font-bold">Biryani Type</span>
              <br />
              <select
                name="type"
                id="type_v"
                className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                value={item.type}
                onChange={onChange}
              >
                <option value="veg">Veg</option>
                <option value="nonveg">Non Veg</option>
              </select>
            </div>

            <div className="mb-6">
              <span className="uppercase text-sm font-bold">
                Half size price
              </span>
              <br />
              <input
                className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                type="number"
                min="49"
                max="1999"
                name="half"
                placeholder="Enter half size price"
                value={item.half}
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <span className="uppercase text-sm font-bold">
                Full size price
              </span>
              <br />
              <input
                className="text-sm sm:text-base placeholder-gray-500 pl-2 rounded-lg border border-gray-400 w-full py-2"
                type="number"
                min="49"
                max="2999"
                name="full"
                placeholder="Enter full size price"
                value={item.full}
                onChange={onChange}
              />
            </div>
            <div className="button-87">
              <input
                type="submit"
                name="btnadd"
                className="button-30"
                value="Add"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {useNavigate} from "react-router-dom"
function Addproduct() {

  const navigator = useNavigate();
  const [inpval, setINP] = useState({
    uniqueid: "",
    name: "",
    brand: "",
    color: "",
    qty: "",
    size: "",
    price: ""
  });

  const [error, setError] = useState(""); // Initialize error state

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => ({
      ...preval,
      [name]: value,
    }));
  }

  const addinpdata = async (e) => {
    e.preventDefault();

    const { uniqueid, name, brand, color, qty, size, price } = inpval;
    const adminToken = localStorage.getItem('adminToken');
    try {
      const res = await fetch('http://localhost:4000/api/v1/admin/addproducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          uniqueid, name, brand, color, qty, size, price
        }),
      });

      const data = await res.json();

      console.log('Response status:', res.status);
      console.log('Response data:', data);

      if (res.status === 400 || !data) {
        setError(data.message || 'Provide full info');
        toast.error(data.message || 'Provide full info');
      } else if (res.status === 409) {
        setError('Product ID is already registered');
        toast.error('Product ID is already registered');
      } else if (res.status === 200) {
        toast.success('Product added successfully');
        navigator("/")
        setError(''); // Clear any previous errors
      } else {
        setError('Unexpected error occurred');
        toast.error('Unexpected error occurred');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      toast.error('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="bg-white border-4 rounded-lg shadow relative m-10">
      <div className="flex items-start justify-between p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold">Add New Product</h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-toggle="product-modal"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-6">
        <form onSubmit={addinpdata}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="uniqueid"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Unique ID
              </label>
              <input
                type="text"
                onChange={setdata}
                value={inpval.uniqueid}
                name="uniqueid"
                id="uniqueid"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Enter ID"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Name
              </label>
              <input
                type="text"
                onChange={setdata}
                value={inpval.name}
                name="name"
                id="name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Enter Name"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="brand"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Brand
              </label>
              <input
                type="text"
                onChange={setdata}
                value={inpval.brand}
                name="brand"
                id="brand"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Enter Brand"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="color"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Color
              </label>
              <input
                type="text"
                name="color"
                onChange={setdata}
                value={inpval.color}
                id="color"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Enter Color"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="qty"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Quantity
              </label>
              <input
                type="number"
                name="qty"
                onChange={setdata}
                value={inpval.qty}
                id="qty"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Enter Quantity"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="size"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Size
              </label>
              <input
                type="text"
                onChange={setdata}
                value={inpval.size}
                name="size"
                id="size"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Enter Size"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="price"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Price
              </label>
              <input
                type="number"
                onChange={setdata}
                value={inpval.price}
                name="price"
                id="price"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Enter Price"
                required
              />
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 rounded-b">
            <button
              className="text-white bg-red-700 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Save all
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Addproduct;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function Editproduct() {


    const navigate = useNavigate();
    const { id } = useParams();
    const [inpval, setINP] = useState({
        uniqueid: "",
        name: "",
        brand: "",
        color: "",
        qty: "",
        size: "",
        price: ""
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getEmployeeData = async () => {
        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`http://localhost:4000/api/v1/admin/product/me/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            if (data.product) {
                setINP(data.product);
            } else {
                toast.error("Invalid data received from server.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch product data. Please try again.");
        }
    };

    useEffect(() => {
        getEmployeeData();
    }, []);

    const updateproduct = async (e) => {
        e.preventDefault();

        const { uniqueid, name, brand, color, qty, size, price } = inpval;

        const res = await fetch(`http://localhost:4000/api/v1/admin/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uniqueid, name, brand, color, qty, size, price
            })
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            toast.error("Failed to update product");
        } else {
            toast.success("Product updated successfully!!");
           navigate("/")
        }
    };

    return (
        <div className="bg-white border-4 rounded-lg shadow relative m-10">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">Edit Product</h3>
            </div>

            <div className="p-6 space-y-6">
                <form onSubmit={updateproduct}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="uniqueid" className="text-sm font-medium text-gray-900 block mb-2">
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
                            <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">
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
                            <label htmlFor="brand" className="text-sm font-medium text-gray-900 block mb-2">
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
                            <label htmlFor="color" className="text-sm font-medium text-gray-900 block mb-2">
                                Color
                            </label>
                            <input
                                type="text"
                                onChange={setdata}
                                value={inpval.color}
                                name="color"
                                id="color"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="Enter Color"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="qty" className="text-sm font-medium text-gray-900 block mb-2">
                                Quantity
                            </label>
                            <input
                                type="number"
                                onChange={setdata}
                                value={inpval.qty}
                                name="qty"
                                id="qty"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="Enter Quantity"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="size" className="text-sm font-medium text-gray-900 block mb-2">
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
                            <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">
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
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Editproduct;

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Employeeregister() {
  const navigate = useNavigate();
  const [inpval, setINP] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    role: "employee",
  });
  const [error, setError] = useState("");

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => ({
      ...preval,
      [name]: value,
    }));
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, address, role } = inpval;

    try {
        const res = await fetch("http://localhost:4000/api/v1/employee/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password,
                address,
                role,
            }),
        });

        const data = await res.json();

        console.log('Response status:', res.status);
        console.log('Response data:', data);

        if (res.status === 400 || !data) {
            setError(data.message || "Provide full info");
            toast.error(data.message || "Provide full info");
        } else if (res.status === 409) {
            setError("Email is already registered");
            toast.error("Email is already registered");
        } else if (res.status === 200) {
            toast.success("Employee added successfully");
            navigate("/")
            setError(""); // Clear any previous errors
        } else {
            setError("Unexpected error occurred");
            toast.error("Unexpected error occurred");
        }
    } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");
    }
};

  return (
    <div className="bg-white border-4 rounded-lg shadow relative m-10">
      <div className="flex items-start justify-between p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold">Add New Employee</h3>
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
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        <form onSubmit={addinpdata}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={setdata}
                value={inpval.name}
                id="name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Enter Name"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={setdata}
                value={inpval.email}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={setdata}
                value={inpval.phone}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Enter Phone Number"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={setdata}
                value={inpval.password}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Address
              </label>
              <textarea
                name="address"
                id="address"
                rows="6"
                onChange={setdata}
                value={inpval.address}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                placeholder="Enter Address"
              ></textarea>
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
  );
}

export default Employeeregister;

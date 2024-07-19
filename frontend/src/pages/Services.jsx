import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Services = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Function to calculate total pages based on fetched data length and products per page
  const totalPages = Math.ceil(getuserdata.length / productsPerPage);

  // Function to handle previous page button click
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  // Function to handle next page button click
  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  // Function to fetch employee data from API
  const getEmployeeData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/employee/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response data:', data);
  
      // Ensure 'employee' key exists and contains an array
      if (Array.isArray(data.employees)) {
        setUserdata(data.employees);
      } else {
        toast.error("Invalid data received from server.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch employee data. Please try again.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getEmployeeData();
  }, []);

  // Slice data to display on current page
  const displayedProducts = getuserdata.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const deleteEmployee = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res2 = await fetch(`http://localhost:4000/api/v1/employee/me/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      const deletedata = await res2.json();
      console.log(deletedata);

      if (res2.status === 400 || !deletedata) {
        console.log("Error");
      } else {
        console.log("Employee deleted");
        getEmployeeData();
        toast.success("Employee deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete employee", error);
      toast.error("Failed to delete employee. Please try again.");
    }
  };

  return (
    <div className="w-full p-4 overflow-x-auto">
      <div className="overflow-x-auto w-full max-w-screen">
        <div className='flex mb-2'>
          <div className='w-[50%]'></div>
          <div className='w-[50%] text-right'>
            <a href='/employee/register'>
              <button className='bg-red-700 text-white px-4 py-1 font-medium hover:bg-red-600'>Add+</button>
            </a>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead>
            <tr className='bg-black'>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Email</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Phone</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Address</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Render rows only when getuserdata is an array and has data */}
            {getuserdata.length > 0 && displayedProducts.map((element, id) => (
              <tr key={id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{element.name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{element.email}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{element.phone}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{element.address}</td>
                <td className="whitespace-nowrap px-4 py-2 flex space-x-2">
                  <a
                    href={`/employeeview/${element._id}`}
                    className="rounded bg-red-700 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
                  >
                    View
                  </a>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteEmployee(element._id);
                    }}
                    className="rounded bg-red-700 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <a
                    href={`/employeeedit/${element._id}`}
                    className="rounded bg-red-700 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
                  >
                    Update
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="inline-block rounded bg-gray-700 px-4 py-2 text-xs font-medium text-white hover:bg-gray-600"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          className="inline-block rounded bg-gray-700 px-4 py-2 text-xs font-medium text-white hover:bg-gray-600"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Services;

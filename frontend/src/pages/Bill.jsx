import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import BillForm from '../components/BillForm';
import Modal from '../components/Modal';

const Bill = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productsPerPage = 20;
  const role = localStorage.getItem('role');
  const totalPages = Math.ceil(getuserdata.length / productsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const getBillData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/bill/getall", {
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

      // Ensure 'bill' key exists and contains an array
      if (Array.isArray(data.bills)) {
        setUserdata(data.bills);
      } else {
        toast.error("Invalid data received from server.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch bill data. Please try again.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getBillData();
  }, []);

  const displayedProducts = getuserdata.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const deleteBill = async (id) => {
    try {
      const res2 = await fetch(`http://localhost:4000/api/v1/bill/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const deletedata = await res2.json();
      console.log(deletedata);

      if (res2.status === 400 || !deletedata) {
        console.log("Error");
      } else {
        console.log("bill deleted");
        getBillData();
        toast.success("bill deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete bill", error);
      toast.error("Failed to delete bill. Please try again.");
    }
  };

  const viewHandler = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mt-8 mb-4">Create Bill</h1>
        <BillForm />
      </div>

      <div className="w-full p-4 overflow-x-auto">
        <div className="overflow-x-auto w-full max-w-screen">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead>
              <tr className="text-white bg-black">
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Customer Name</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Phone Number</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Address</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedProducts.map((bill, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{bill.customerName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{bill.phoneNumber}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{bill.address}</td>
                  <td className="whitespace-nowrap px-4 py-2 flex space-x-2">
                    <button
                      className="rounded bg-red-700 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
                      onClick={() => viewHandler(bill)}
                    >
                      View
                    </button>

                    {role==='admin'?(
                    <button className="rounded bg-red-700 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteBill(bill._id);
                      }}
                    >
                      Delete
                    </button>
                    ):(<div></div>)}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedBill && (
          <div>
            <h2 className="text-xl font-bold mb-2">Bill Details</h2>
            <p><strong>Customer Name:</strong> {selectedBill.customerName}</p>
            <p><strong>Phone Number:</strong> {selectedBill.phoneNumber}</p>
            <p><strong>Address:</strong> {selectedBill.address}</p>
            <p><strong>Total Amount:</strong> {selectedBill.totalAmount}</p>
            <h3 className="text-lg font-semibold mt-4">Products</h3>
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">S.No</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedBill.products.map((product, index) => (
                  <tr key={index} className="divide-y divide-gray-200">
                    <td className="px-4 py-2">{product.productname}</td>
                    <td className="px-4 py-2">{product.quantity}</td>
                    <td className="px-4 py-2">{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Bill;

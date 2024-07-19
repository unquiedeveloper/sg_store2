import React from 'react';

const Receipt = () => {
  return (
    <div className="max-w-md mx-auto p-4 pt-6 mb-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">CASH RECEIPT</h2>
      <div className="flex justify-between mb-4">
        <div>
          <label className="text-sm text-gray-600">Shop Name:</label>
          <span className="text-sm text-gray-900">Your Shop Name</span>
        </div>
        <div>
          <label className="text-sm text-gray-600">Date:</label>
          <span className="text-sm text-gray-900">MM/DD/YYYY</span>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <label className="text-sm text-gray-600">Manager:</label>
          <span className="text-sm text-gray-900">John Doe</span>
        </div>
        <div>
          <label className="text-sm text-gray-600">Cashier:</label>
          <span className="text-sm text-gray-900">Jane Doe</span>
        </div>
      </div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-sm text-gray-600">Description</th>
            <th className="text-sm text-gray-600">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-sm text-gray-900">Lorem ipsum</td>
            <td className="text-sm text-gray-900">$9.25</td>
          </tr>
          <tr>
            <td className="text-sm text-gray-900">Dolor sit amet</td>
            <td className="text-sm text-gray-900">$19.40</td>
          </tr>
          <tr>
            <td className="text-sm text-gray-900">Consectetur adipiscing</td>
            <td className="text-sm text-gray-900">$14.55</td>
          </tr>
          <tr>
            <td className="text-sm text-gray-900">Elit ed do eiusmod</td>
            <td className="text-sm text-gray-900">$1.90</td>
          </tr>
          <tr>
            <td className="text-sm text-gray-900">Tempor incididunt</td>
            <td className="text-sm text-gray-900">$7.55</td>
          </tr>
          <tr>
            <td className="text-sm text-gray-900">Ut labore et dolore</td>
            <td className="text-sm text-gray-900">$22.00</td>
          </tr>
          <tr>
            <td className="text-sm text-gray-900">Magna aliqua</td>
            <td className="text-sm text-gray-900">$13.15</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between mb-4">
        <div>
          <label className="text-sm text-gray-600">Total:</label>
          <span className="text-sm text-gray-900">$87.80</span>
        </div>
        <div>
          <label className="text-sm text-gray-600">Tax:</label>
          <span className="text-sm text-gray-900">$0.00</span>
        </div>
      </div>
      <p className="text-sm text-gray-600">Thank you for shopping!</p>
    </div>
  );
};

export default Receipt;
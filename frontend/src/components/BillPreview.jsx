import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BillPreview = ({ bill }) => {
  const generatePDF = () => {
    const widthInInch = 2; // 2 inches = 55mm
    const lengthInMM = 250; // 250mm
    const widthInPoints = widthInInch * 72;
    const lengthInPoints = lengthInMM * (72 / 25.4); // Convert mm to inches

    const doc = new jsPDF({ unit: 'pt', format: [widthInPoints, lengthInPoints] });
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(18);
    const headingText = 'SG Store';
    const headingWidth = doc.getTextWidth(headingText);
    const headingX = (pageWidth - headingWidth) / 2;
    doc.text(headingText, headingX, 20);

    // Decrease font size for address text
    doc.setFontSize(7);
    const addressText = "SG Store , near industrail Arear , Hisar ";
    const phoneNumberText = '7015659124';
    const addressLines = doc.splitTextToSize(addressText, pageWidth - 20);
    const addressWidth = doc.getTextWidth(addressText);
    const addressX = (pageWidth - addressWidth) / 2;
    doc.text(addressLines, addressX, 40);

    const phoneNumberWidth = doc.getTextWidth(phoneNumberText);
    const phoneX = (pageWidth - phoneNumberWidth) / 2;
    doc.text(phoneNumberText, phoneX, 55);

    // Reset font size if needed
    doc.setFontSize(8);
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 70, pageWidth - 10, 70);

    const invoiceText = 'Invoice';
    const invoiceWidth = doc.getTextWidth(invoiceText);
    const invoiceX = (pageWidth - invoiceWidth) / 2;
    doc.text(invoiceText, invoiceX, 80); // Centered "Invoice" text

    doc.text(`${bill.customerName}`, 10, 90);
    doc.text(`${bill.address}`, 10, 105);
    doc.text(`${bill.phoneNumber}`, 10, 120);
    doc.text(`${new Date(bill.createdAt).toLocaleString()}`, 10, 135);
    doc.text(`Total Amount: Rs. ${bill.totalAmount || 0}`, 10, 150);

    doc.setDrawColor(200, 200, 200);
    doc.line(10, 165, pageWidth - 10, 165);

    doc.setFontSize(8);
    doc.setTextColor(0);
    doc.text('Products:', 10, 175);

    const products = bill.products.map(product => [
      product.productname,
      product.quantity.toString(),
      `Rs. ${product.price || 0}`
    ]);

    const remainingHeight = lengthInPoints - 200;
    let startY = 180;

    const { height } = doc.autoTable({
      startY,
      head: [['Product Name', 'Quantity', 'Price']],
      body: products,
      theme: 'striped',
      styles: {
        fontSize: 8,
        cellPadding: { top: 5, right: 5, bottom: 5, left: 10 },
        halign: 'center'
      },
      margin: { horizontal: 10 },
    });

    if (startY + height > remainingHeight) {
      doc.addPage([widthInPoints, lengthInPoints], 'pt');
      startY = 40;

      doc.setFontSize(18);
      doc.text(headingText, headingX, 20);
      doc.setDrawColor(200, 200, 200);
      doc.line(10, 70, pageWidth - 10, 70);

      doc.setFontSize(8);
      doc.setTextColor(0);
      doc.text('Products (continued):', 10, 80);
      doc.autoTable({
        startY,
        head: [['Product Name', 'Quantity', 'Price']],
        body: products,
        theme: 'striped',
        styles: {
          fontSize: 8,
          cellPadding: { top: 5, right: 10, bottom: 5, left: 10 },
          halign: 'center'
        },
        margin: { horizontal: 10 },
      });
    }

    doc.setFontSize(10);
    const totalAmountText = `Total: Rs. ${bill.totalAmount || 0}`;
    const totalAmountWidth = doc.getTextWidth(totalAmountText);
    const xPosition = pageWidth - totalAmountWidth - 10;
    const finalY = doc.autoTable.previous.finalY || startY;
    doc.text(totalAmountText, xPosition, finalY + 20);

    const dottedLineY = finalY + 40;
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.setLineDash([2, 2], 0);
    doc.line(10, dottedLineY, pageWidth - 10, dottedLineY);

    doc.setFontSize(10);
    const thanksText = 'Thanks For shopping!!';
    const thanksWidth = doc.getTextWidth(thanksText);
    const thanksX = (pageWidth - thanksWidth) / 2;
    doc.text(thanksText, thanksX, dottedLineY + 15);

    const secondDottedLineY = dottedLineY + 30;
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.setLineDash([2, 2], 0);
    doc.line(10, secondDottedLineY, pageWidth - 10, secondDottedLineY);

    doc.save('bill.pdf');
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg mt-6">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold mt-4 mb-1">SG Store</h1>
        <p className="text-gray-600">SG store near Industrail area , Hisar </p>
        <p className="text-gray-600">7015659124</p>
      </div>
      <div className="mb-4 border-b border-gray-200 pb-2">
        <h2 className="text-lg font-semibold mb-2">Bill Preview</h2>
        <p className="text-gray-700"><strong>Customer Name:</strong> {bill.customerName}</p>
        <p className="text-gray-700"><strong>Address:</strong> {bill.address || 'N/A'}</p>
        <p className="text-gray-700"><strong>Phone Number:</strong> {bill.phoneNumber || 'N/A'}</p>
        <p className="text-gray-700"><strong>Transaction ID:</strong> {bill._id}</p>
        <p className="text-gray-700"><strong>Created At:</strong> {new Date(bill.createdAt).toLocaleString()}</p>
        <p className="text-gray-700"><strong>Total Amount:</strong> Rs. {bill.totalAmount || 0}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Products</h3>
        <table className="w-full border border-gray-300 border-collapse">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-1 border-b border-gray-300">Product Name</th>
              <th className="p-1 border-b border-gray-300">Quantity</th>
              <th className="p-1 border-b border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody>
            {bill.products.map((product, index) => (
              <tr key={index}>
                <td className="p-1 border-b border-gray-300">{product.productname}</td>
                <td className="p-1 border-b border-gray-300">{product.quantity}</td>
                <td className="p-1 border-b border-gray-300">Rs. {product.price || 0}</td>
              </tr>
            ))}
            <tr>
              <th className="p-1 border-b border-gray-300 text-right" colSpan="2">Total Amount</th>
              <td className="p-1 border-b border-gray-300">Rs. {bill.totalAmount || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white px-3 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Download PDF
      </button>
    </div>
  );
};

export default BillPreview;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function Productdetail() {
  const { id } = useParams();

  const [productData, setProductData] = useState({});

  const getProductData = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/product/me/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.product) {
        setProductData(data.product);
      } else {
        toast.error('Invalid data received from server.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch product data. Please try again.');
    }
  };

  useEffect(() => {
    getProductData();
  }, [id]);

  return (
    <div className='m-5'>
      <h1 className='font-bold text-3xl'>{productData.name ? productData.name.toUpperCase() : 'Product'}</h1>
      <div className='mt-4'>
        <div className='max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg'>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>Product Details</div>
            <div className='mb-4'>
              <h1 className='font-bold mb-2'>Name:</h1>
              <p className='text-gray-700'>{productData.name}</p>
            </div>
            <div className='mb-4'>
              <h1 className='font-bold mb-2'>Brand:</h1>
              <p className='text-gray-700'>{productData.brand}</p>
            </div>
            <div className='mb-4'>
              <h1 className='font-bold mb-2'>Color:</h1>
              <p className='text-gray-700'>{productData.color}</p>
            </div>
            <div className='mb-4'>
              <h1 className='font-bold mb-2'>Quantity:</h1>
              <p className='text-gray-700'>{productData.qty}</p>
            </div>
            <div className='mb-4'>
              <h1 className='font-bold mb-2'>Price:</h1>
              <p className='text-gray-700'>{productData.price}</p>
            </div>
            <div className='mb-4'>
              <h1 className='font-bold mb-2'>Size:</h1>
              <p className='text-gray-700'>{productData.size}</p>
            </div>
          </div>
          <div className='px-6 py-4 flex justify-center items-center'>
            <img
              alt=''
              src='https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png'
              className='w-24 h-24 rounded-full object-cover shadow-lg'
            />
            <div className='ml-4'>
              <button className='inline-block border border-gray-300 rounded p-2 text-gray-700 hover:bg-gray-50 focus:outline-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='h-4 w-4 inline-block mr-1'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                  />
                </svg>
                Edit
              </button>
              <button className='inline-block border border-gray-300 rounded p-2 text-gray-700 hover:bg-gray-50 focus:outline-none ml-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='h-4 w-4 inline-block mr-1'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productdetail;

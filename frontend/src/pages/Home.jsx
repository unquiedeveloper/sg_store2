import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, LinearScale } from 'chart.js';
// import toast from 'react-hot-toast';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);
const Home = () => {
 
    const [employees, setEmployees] = useState([]);
    const data1 = [
        {
            id: "01",
            name: "Total Products",
            number: "200"
        },
        {
            id: "02",
            name: "Total Products",
            number: "200"
        },
        {
            id: "03",
            name: "Total Products",
            number: "200"
        },
    ];

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [

            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'red',
                    'blue',
                    'green',
                    'yellow',
                    'purple',
                    'orange',
                ],

            },

        ],
    };


    const data2 = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                // label: 'Votes',
                data: [12, 19, 3, 5, 2, 3],
                // barPercentage: 1,
                barThickness: 50,
                backgroundColor: [
                    'red',
                    'blue',
                    'green',
                    'yellow',
                    'purple',
                    'orange',
                ]
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },

        },
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/employee/getall');
            console.log(response.data.employees);
            setEmployees(response.data.employees.slice(0, 5));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const role = localStorage.getItem('role');

    return (
        <>
            <div className='bg-[#f1f4f5] p-4 flex flex-col md:flex-row'>
                <div className='w-[80%] flex'>
                    {data1.map(item => (
                        <div key={item.id} className='bg-white w-[250px] h-[300px] p-4 m-2 shadow-lg rounded-xl'>
                            <h3 className='text-xl font-semibold'>{item.name}</h3>
                            <p className='text-gray-600'>{item.number}</p>
                        </div>
                    ))}
                </div>
                <div className='w-[30%]'>
                    <Pie data={data} />
                </div>
            </div>
            <div>
                <h1 className='flex justify-center text-2xl mt-16 my-5 font-bold '>Showing The Past Last Months Sells</h1>
            </div>
            <div className='w-[80%] mx-auto'>
                <Bar data={data2} options={options} />
            </div>
{role === 'admin'?(
    <>
            <div>
                <h1 className='flex justify-center text-2xl mt-16 my-5 font-bold '>Our Recent Employees</h1>
            </div>
            <div className='w-[80%] mx-auto bg-white shadow-lg rounded-xl'>
                <table className='w-full min-w-max divide-y divide-gray-200'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='p-3 text-left text-sm font-semibold text-gray-700'>Name</th>
                            <th className='p-3 text-left text-sm font-semibold text-gray-700'>Email</th>
                            <th className='p-3 text-left text-sm font-semibold text-gray-700'>Phone</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {employees.map((employee, index) => (
                            <tr key={employee.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className='p-3 text-sm text-gray-600'>{employee.name}</td>
                                <td className='p-3 text-sm text-gray-600'>{employee.email}</td>
                                <td className='p-3 text-sm text-gray-600'>{employee.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div></>
            ):(<div></div>)}
        </>
    );
};

export default Home;

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credential, setCredential] = useState({ email: "", password: "", role: "admin" });  // Set default role to "admin"
     const navigate = useNavigate();
   

    function changeHandler(e) {
        setCredential(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const submitHandler = async(e) =>{
        e.preventDefault();
        console.log(credential.role);  // Log the role from credential

        const apiUrl = credential.role === "admin"
            ? "http://localhost:4000/api/v1/admin/login"
            : "http://localhost:4000/api/v1/employee/login";

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credential.email,
                    password: credential.password,
                    role: credential.role
                }),
            });

            const data = await response.json();
            console.log('Success:', data);
            
       
            if (credential.role === "admin") {
                localStorage.setItem('name', data.adminObj.name);
                localStorage.setItem('role', "admin");   
                 localStorage.setItem("token", data.adminObj.token);
            } else {
                localStorage.setItem('name', data.employee.name);
                localStorage.setItem('role', "employee");
                localStorage.setItem("token", data.token);
            }
            toast.success("User successfully signed in");
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            toast.error("Login failed. Please check your credentials.");
        }
    }
  
    return (
        <section className="relative flex flex-wrap mt-20 mx-[50px] w-full rounded-xl shadow-2xl">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

                    <p className="mt-4 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
                        ipsa culpa autem, at itaque nostrum!
                    </p>
                </div>

                <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={credential.email}
                                onChange={changeHandler}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={credential.password}
                                onChange={changeHandler}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                            />
                    
                        </div>
                    </div>

                    <div>
                        <label htmlFor="role" className="sr-only">Role</label>

                        <div className="relative">
                            <select
                                name="role"
                                value={credential.role}
                                id="role"
                                className="rounded-lg mt-4 outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                onChange={changeHandler}
                            >
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">

                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-red-800 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>

            <div className="relative h-64 w-full sm:h-96 lg:h-[600px] lg:w-1/2">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1550344071-13ecada2a91d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="absolute inset-0 h-full w-full object-cover rounded-r-xl shadow-xl"
                />
            </div>
        </section>
    );
}

export default Login;

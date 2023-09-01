'use client'
import { Button, Form, FormInstance } from 'antd';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

export default function Home() {
const [login,setLogin] = useState(false)
const formRef = React.useRef<FormInstance>(null);




const handleLogin = async(value:any)=>{
  console.log("value: ", value);
  axios.post('http://localhost:3000/api/login/login',value)
}

const handleSignup = async(value:any)=>{
const res = axios.post('http://localhost:3000/api/route/hello',value)
await res;
formRef.current?.resetFields();

}


  return (
    <main className="flex flex-col items-center justify-center h-screen">
       {!login && <><div className="w-full max-w-md p-10 border-2 bg-white">
        <Form onFinish={handleLogin}>
          <h1 className="text-center mb-4 font-bold text-4xl">Instagram</h1>
          <Form.Item name="username">
            <input className="placeholder-italic placeholder-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-5" placeholder="Enter username or email" type="text" />
          </Form.Item>
          <Form.Item name="password">
            <input className="placeholder-italic placeholder-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Enter Password" type="password" />
          </Form.Item>
          <Button type="primary" className="bg-sky-500" block htmlType="submit">Log In</Button>
        </Form>
      </div><div className='w-full max-w-md p-6 text-center border-2 bg-white mt-5'>
          <p>Don't have an account ? <span className='text-sky-500' onClick={() => setLogin(true)}>Signup</span></p>
        </div></>}


    {login &&
      <><div className="w-full max-w-md p-10 border-2 bg-white">
          <Form onFinish={handleSignup}  ref={formRef}>
            <h1 className="text-center mb-4 font-bold text-4xl">Instagram</h1>
            <Form.Item name="name">
              <input className="placeholder-italic placeholder-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-5" placeholder="Enter Full Name" type="text" />
            </Form.Item>
            <Form.Item name="username">
              <input className="placeholder-italic placeholder-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Enter username" type="text" />
            </Form.Item>
            <Form.Item name="email">
              <input className="placeholder-italic placeholder-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Enter email" type="text" />
            </Form.Item>
            <Form.Item name="password">
              <input className="placeholder-italic placeholder-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Enter Password" type="password" />
            </Form.Item>
            <Button type="primary" className="bg-sky-500" block htmlType="submit">Log In</Button>
          </Form>
        </div><div className='w-full max-w-md p-6 text-center border-2 bg-white mt-5'>
            <p>Have an account ? <span className='text-sky-500' onClick={()=>setLogin(false)}>Login</span></p>
          </div></>  }
    </main>
  );
}

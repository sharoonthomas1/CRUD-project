import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Minimum 3 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'), 
});

const UserForm = ({ onSubmit, editingUser }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editingUser) {
      reset(editingUser);
    }
  }, [editingUser, reset]);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, reset))} className='mx-auto w-full max-w-2xl bg-transparent flex flex-col justify-center p-5 border-2 border-[#BBBBBB26] rounded-lg'>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name</label>
            <input 
              type="text" 
              id="name" 
              className={`border text-[#fff] text-sm rounded-lg block w-full p-2.5 bg-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
              placeholder="Name" 
              required 
              {...register('name')}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input 
              type="email" 
              id="email" 
              className={`border text-[#fff] text-sm rounded-lg block w-full p-2.5 bg-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
              placeholder="name@gmai.com" 
              required 
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No.</label>
            <input 
              type="text" 
              id="phone" 
              className={`border text-[#fff]text-sm rounded-lg block w-full p-2.5 bg-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} 
              placeholder="xxxxx" 
              required 
              {...register('phone')}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
            <input 
              type="text" 
              id="address" 
              className={`border text-[#fff] text-sm rounded-lg block w-full p-2.5 bg-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'}`} 
              placeholder="Address" 
              required 
              {...register('address')}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
        </div>
        <button
          type="submit" 
          className="inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {editingUser ? 'Update User' : 'Create User'} 
          </span>
        </button>
      </div>
    </form>
  );
};

export default UserForm;


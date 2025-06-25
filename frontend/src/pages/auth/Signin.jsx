import React from 'react'
import CommonForm from '../../components/CommonForm'
import { useForm } from 'react-hook-form'
import { SigninFormControls } from '../../config';
import { Link, useNavigate } from 'react-router-dom';
import { callloginUserApi } from '../../services';
import { useLoadingStore } from '../../store/useUserStore';
import { LoaderCircle } from 'lucide-react';

function Signin() {
  const navigate = useNavigate();
  const loading = useLoadingStore(state => state.loading);
  const setLoading = useLoadingStore(state => state.setLoading);
  const formData = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  async function handleSigninSubmit(getData) {
    setLoading(true);

    try {
      const data = await callloginUserApi(getData);
      if (data?.success) navigate('/tasks/list');

    } catch (error) {
      console.error("Login Error:", error);
    }
    setLoading(false);
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='font-bold text-4xl p-3 mb-4'>SignIn</h1>
      <CommonForm
        formControls={SigninFormControls}
        form={formData}
        handleSubmit={formData.handleSubmit(handleSigninSubmit)}
        btnText={loading ? <LoaderCircle className="animate-spin size-6 text-white mx-2" /> : 'SignIn'}
        extraBtnStyles={`w-full mb-4`}
      />
      <span className='flex gap-1'>
        <h2>Dont have an Account. Create one by</h2>
        <Link to={'/auth/signup'} className='text-blue-500 underline'>clicking here</Link>
      </span>
    </div>
  )
}

export default Signin

import React from 'react'
import CommonForm from '../../components/CommonForm'
import { useForm } from 'react-hook-form'
import { SigninFormControls } from '../../config';
import { Link, useNavigate } from 'react-router-dom';
import { callloginUserApi } from '../../services';

function Signin() {
    const navigate = useNavigate();
  const formData = useForm({
    defaultValues: {
      email : '',
      password : ''
    }
  });
  async function handleSigninSubmit(getData){
    console.log(getData);
    const data = await callloginUserApi(getData);
    console.log(data);
    if (data?.success) navigate('/tasks/list');
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='font-bold text-2xl p-3'>SignIn Page</h1>
      <CommonForm
      formControls={SigninFormControls}
      form={formData}
      handleSubmit={formData.handleSubmit(handleSigninSubmit)}
      btnText={'SignIn'}
      />
      <span className='flex gap-1'>
        <h2>Dont have an Account. Create one by</h2>
        <Link to={'/auth/signup'} className='text-blue-500 underline'>clicking here</Link>
      </span>
    </div>
  )
}

export default Signin

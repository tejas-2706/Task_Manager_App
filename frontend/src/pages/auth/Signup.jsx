import React from 'react'
import CommonForm from '../../components/CommonForm'
import { SignupFormControls } from '../../config'
import { useForm } from 'react-hook-form'
import { callSignupUserApi } from '../../services'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate();
  const formData = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  async function handleSignupSubmit(getData) {
    console.log(getData);
    const data = await callSignupUserApi(getData);
    console.log(data);
    if (data?.success) navigate('/tasks/list');
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='font-bold text-2xl p-3'>SignUp Page</h1>
      <CommonForm
        formControls={SignupFormControls}
        form={formData}
        handleSubmit={formData.handleSubmit(handleSignupSubmit)}
        btnText={'Signup'}
      />
      <span className='flex gap-1'>
        <h2>Already have an Account. Signin by</h2>
        <Link to={'/auth/signin'} className='text-blue-500 underline'>clicking here</Link>
      </span>
    </div>
  )
}

export default Signup

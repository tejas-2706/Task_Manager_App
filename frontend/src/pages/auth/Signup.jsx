import React from 'react'
import CommonForm from '../../components/CommonForm'
import { SignupFormControls } from '../../config'
import { useForm } from 'react-hook-form'
import { callSignupUserApi } from '../../services'
import { Link, useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { useLoadingStore } from '../../store/useUserStore'

function Signup() {
  const navigate = useNavigate();
  const formData = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  const loading = useLoadingStore(state => state.loading);
  const setLoading = useLoadingStore(state => state.setLoading);
  async function handleSignupSubmit(getData) {
    setLoading(true);
    try {
      const data = await callSignupUserApi(getData);
      if (data?.success) navigate('/tasks/list');
    } catch (error) {
      console.error("Signup Error:", error);
    }
    setLoading(false);
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='font-bold text-4xl p-3 mb-4'>SignUp</h1>
      <CommonForm
        formControls={SignupFormControls}
        form={formData}
        handleSubmit={formData.handleSubmit(handleSignupSubmit)}
        btnText={loading ? <LoaderCircle className="animate-spin size-6 text-white mx-2" /> : 'SignUp'}
        extraBtnStyles={`w-full mb-4`}
      />
      <span className='flex gap-1'>
        <h2>Already have an Account. Signin by</h2>
        <Link to={'/auth/signin'} className='text-blue-500 underline'>clicking here</Link>
      </span>
    </div>
  )
}

export default Signup

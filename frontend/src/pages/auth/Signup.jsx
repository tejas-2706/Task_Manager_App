import React from 'react'
import CommonForm from '../../components/CommonForm'
import { SignupFormControls } from '../../config'
import { useForm } from 'react-hook-form'
import { callSignupUserApi } from '../../services'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate();
  const formData = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  async function handleSignupSubmit(getData){
    console.log(getData);
    const data = await callSignupUserApi(getData);
    console.log(data);
    if (data?.success) navigate('/tasks/list');
  }
  return (
    <div>
      Signup page
      <CommonForm
        formControls={SignupFormControls}
        form={formData}
        handleSubmit={formData.handleSubmit(handleSignupSubmit)}
        btnText={'Signup'}
      />
    </div>
  )
}

export default Signup

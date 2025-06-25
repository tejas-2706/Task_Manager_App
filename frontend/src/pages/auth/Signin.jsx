import React from 'react'
import CommonForm from '../../components/CommonForm'
import { useForm } from 'react-hook-form'
import { SigninFormControls } from '../../config';
import { useNavigate } from 'react-router-dom';
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
    <div>
      SignIn Page
      <CommonForm
      formControls={SigninFormControls}
      form={formData}
      handleSubmit={formData.handleSubmit(handleSigninSubmit)}
      btnText={'SignIn'}
      />
    </div>
  )
}

export default Signin

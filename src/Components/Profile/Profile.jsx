import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthContext'
import { useFormik } from 'formik';
import { baseUrl } from '../Shared/baseUrl';
import axios from 'axios';
import { notify } from '../Shared/notify';

export default function Profile() {

  let { token,setToken ,userData} = useContext(authContext);
  
  const myFormikUpdataData = useFormik(
    {

      initialValues: { name: '', email: '', phone: '' },

      validate: (values) => {
        const errors = {};

        if (values.name.length < 4) {
          errors.name = 'name must be more than 4 caraters'
        }

        let regEmail = /^[a-zA-z0-9]{5,20}@(gmail|yahoo|outlook).(com|org)$/;
        if (!regEmail.test(values.email)) {
          errors.email = 'email are invalid';
        }

        if (!values.phone.match(/^(\+20)?01[0125][0-9]{8}$/)) {
          errors.phone = 'Phone is Invalid'
        }


        return errors;
      },
      
      onSubmit: async (values) => {
        try {

          let data = await axios.put(baseUrl + 'users/updateMe/', values, { headers: { token: token } });
          notify('Data Updated Successfully', 'success', 'top-left')

        } catch ({ response: { data: { message, errors: { msg } } } }) {
          console.log(message, msg);
          notify(msg, 'error', 'top-center')

        }
      }

    })



  const myFormikResetPassword = useFormik(
    {

      initialValues: { currentPassword: '', password: '', rePassword: '' },

      validate: (values) => {

        const errors = {};

        if (!values.currentPassword.match(/^[a-zA-z0-9]{5,15}$/)) {
          errors.currentPassword = 'current password is INvalid';
        }
        if (!values.password.match(/^[a-zA-z0-9]{5,15}$/)) {
          errors.password = 'password is INvalid';
        }
        if (values.password == values.currentPassword) { //match not work if i do 123 and 1234 this also match dosn't diffrence 
          errors.password = `can't be current and new password the same`;
        }

        if (!values.rePassword.match(values.password)) {
          errors.rePassword = 'rePassword not matched'
        }

        return errors;
      },

      onSubmit: async (values) => {
        try {

          let {data}= await axios.put(baseUrl+'users/changeMyPassword',values,{headers:{token}})
          localStorage.removeItem('token');
          localStorage.setItem('token',data.token);
          setToken(data.token);
          notify('Password is updated','success','top-center');

        } catch ({ response: { data: { message, errors: { value, msg } } } }) {
          console.log(value,message, msg);
          notify(msg, 'error', 'top-center')
        }
      }

    })


  return (
    <>

      <div className='min-vh-100 d-flex flex-column justify-content-evenly py-5 my-5'>

       <div className="div"> 
       <h2 className='text-center fw-bolder mt-5 pt-3'>welcome {userData?.name}</h2>
       </div>
    

        <div className="container">

          <h2 className='fw-bold my-5'>Update Your Personal Data</h2>

          <form onSubmit={myFormikUpdataData.handleSubmit} action="">
            <div className="row gy-4">

              <div className="col-md-6">
                <input onBlur={myFormikUpdataData.handleBlur} onChange={myFormikUpdataData.handleChange} value={myFormikUpdataData.values.name} type="text" name='name' placeholder='Enter Your Name' className='form-control' />
                {myFormikUpdataData.errors.name && myFormikUpdataData.touched.name ? <div className="alert alert-danger"> {myFormikUpdataData.errors.name}</div> : null}
              </div>

              <div className="col-md-6">
                <input onBlur={myFormikUpdataData.handleBlur} onChange={myFormikUpdataData.handleChange} value={myFormikUpdataData.values.email} type="email" name='email' placeholder='Enter Your Email' className='form-control' />
                {myFormikUpdataData.errors.email && myFormikUpdataData.touched.email ? <div className="alert alert-danger"> {myFormikUpdataData.errors.email}</div> : null}

              </div>

              <div className="col-md-6">
                <input onBlur={myFormikUpdataData.handleBlur} onChange={myFormikUpdataData.handleChange} value={myFormikUpdataData.values.phone} type="tel" name='phone' placeholder='Enter Your Phone' className='form-control' />
                {myFormikUpdataData.errors.phone && myFormikUpdataData.touched.phone ? <div className="alert alert-danger"> {myFormikUpdataData.errors.phone}</div> : null}

              </div>

              <button className='btn bg-main text-white' type='submit'>Update</button>

            </div>
          </form>

        </div>




        <div className="container">

          <h2 className='fw-bold my-5'>Reset Your Password</h2>

          <form onSubmit={myFormikResetPassword.handleSubmit} action="" className='w-50 m-auto d-flex flex-column justify-content-evenly'>

            <input onBlur={myFormikResetPassword.handleBlur} onChange={myFormikResetPassword.handleChange} value={myFormikResetPassword.values.currentPassword} type="password" name='currentPassword' placeholder='Enter Your CurrentPassword' className='form-control my-2' />
            {myFormikResetPassword.errors.currentPassword && myFormikResetPassword.touched.currentPassword ? <div className="alert alert-danger"> {myFormikResetPassword.errors.currentPassword}</div> : null}

            <input onBlur={myFormikResetPassword.handleBlur} onChange={myFormikResetPassword.handleChange} value={myFormikResetPassword.values.password} type="password" name='password' placeholder='Enter Your Password' className='form-control my-2' />
            {myFormikResetPassword.errors.password && myFormikResetPassword.touched.password ? <div className="alert alert-danger"> {myFormikResetPassword.errors.password}</div> : null}

            <input onBlur={myFormikResetPassword.handleBlur} onChange={myFormikResetPassword.handleChange} value={myFormikResetPassword.values.rePassword} type="password" name='rePassword' placeholder='Enter Your RePassword' className='form-control my-2' />
            {myFormikResetPassword.errors.rePassword && myFormikResetPassword.touched.rePassword ? <div className="alert alert-danger"> {myFormikResetPassword.errors.rePassword}</div> : null}

            <button className='btn bg-main text-white' type='submit'>Reset</button>


          </form>
          
        </div>




      </div>
    </>
  )
}

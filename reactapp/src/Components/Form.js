import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { AddData, EditData } from '../Helper/Apicalls';
import '../Style.css'
const Form = ({handleClose , userId}) => {

    const { register, handleSubmit, setValue, formState: { errors }, getValues, clearErrors, reset } = useForm({ mode: "onBlur" });

    const [Loadingbtn, setLoadingbtn] = useState(false);

    const onSubmit = async (data) => {
        setLoadingbtn(true)
        try {

            if(!!userId){
              
                UpdateData(data)
            }else{
                let res = await AddData(data);
                if (res.status === true) {
                  reset()
                  setLoadingbtn(false)
                  handleClose()
                } else {
                  setLoadingbtn(false)
                }
            }
       

        } catch (error) {
          console.error("Erro:", error);
          setLoadingbtn(false)
        }
      };

      useEffect(()=>{
        if(!!userId){
            reset(userId)
        }
      },[userId])

      const UpdateData = async(data) => {
        try {
            let Response = await EditData(data)

            if(Response){
                reset(Response)
                setLoadingbtn(false)
                handleClose()
            }else{
                setLoadingbtn(false)
            }
        } catch (error) {
            console.log(error);
            setLoadingbtn(false)

        }
      }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="form-group">

            <div>
            <label className="form-label" htmlFor='name'>Name</label>

            <input
                  type="text"
                  name="name"
                  id='name'
                  autoComplete="off"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="name"
                  maxLength={15}
                  onInput={(e) => { setValue('name', e.target.value.toLowerCase()) }}
                  {...register("name", { required: { value: true, message: "name is required" }, minLength: { value: 3, message: "Minimum 3 characters is required" } })}
                />
                <div className="invalid-feedback">{errors.name && errors.name.message}</div>
            </div>

            <div>
                <label className="form-label" htmlFor='Email'>Email</label>
                <input
                  type="text"
                  name="Email"
                  id='Email'
                  autoComplete="off"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                  onInput={(e) => { setValue('email', e.target.value.toLowerCase()) }}
                  {...register("email", { required: { value: true, message: "Email is required" }, pattern: { value: /^(?!.*?\.\..*?@)(?!.*?@\..*?\..*?$)[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[A-Za-z0-9-]+\.[A-Za-z.]{2,}$/, message: 'Invalid email address' } })}
                />
                <div className="invalid-feedback">{errors.email && errors.email.message}</div>
              </div>
              </div>

              <div className='mt-2'>
                    <label className="form-label" htmlFor="gender">Gender</label>
                    <input
                        {...register("gender", { required: { value: true, message: "Gender is required" } })}
                        id="maleGender"  
                        type="radio" className='mx-2'
                        value="Male"
                    />
                    <label htmlFor="maleGender" className='mx-2'>Male</label>
                    <input
                        {...register("gender", { required: { value: true, message: "Gender is required" } })}
                        id="femaleGender" 
                        type="radio"
                        value="Female"
                    />
                    <label htmlFor="femaleGender" className='mx-2'>Female</label>
                <div className="invalid-feedback">{errors.gender && errors.gender.message}</div>
            </div>
            <div>
            <label className="form-label" htmlFor="DOB">Date of Birth</label>
                                    <input className={`form-control ${errors.bod ? "is-invalid" : ""}`}  type="date" placeholder="dob" id="DOB" name="DOB" {...register("bod", { required: { value: true, message: "Date of Birth is required" } })} />
                                    <div className="invalid-feedback">{errors.bod && errors.bod.message}</div>
            </div>
            <div>
            <label className="form-label mt-3" htmlFor="DOB">Social Media Accounts</label>

            <div>
                <input
                  type="checkbox"
                  autoComplete="off"
                  className={`${errors.socialMediaAccount ? "is-invalid" : ""}`}
                  id="Linkedin"
                  value={"Linkedin"}
                  {...register('socialMediaAccount', { required: { value: true, message: "socialMediaAccount is required" } })}
                />
                <label htmlFor="Linkedin" className='mx-2'>Linkedin</label>
    
                <input
                  type="checkbox"
                  autoComplete="off"
                  className={`${errors.socialMediaAccount ? "is-invalid" : ""}`}
                  id="Facebook"
                  value={'Facebook'}
                  {...register('socialMediaAccount', { required: { value: true, message: "socialMediaAccount is required" } })}
                />
                <label htmlFor="Facebook" className='mx-2'>Facebook</label>
                
                <input
                  type="checkbox"
                  autoComplete="off"
                  className={`${errors.socialMediaAccount ? "is-invalid" : ""}`}
                  id="Twitter"
                  value={"Twitter"}
                  {...register('socialMediaAccount', { required: { value: true, message: "socialMediaAccount is required" } })}
                />
                <label htmlFor="Twitter" className='mx-2'>Twitter</label>
                <input
                  type="checkbox"
                  autoComplete="off"
                  className={`${errors.socialMediaAccount ? "is-invalid" : ""}`}
                  id="Instagram"
                  value={"Instagram"}
                  {...register('socialMediaAccount', { required: { value: true, message: "socialMediaAccount is required" } })}
                />
                <label htmlFor="Instagram" className='mx-2'>Instagram</label>
                <div className="invalid-feedback">{errors.socialMediaAccount && errors.socialMediaAccount.message}</div>
            </div>
            </div>
            <div className='mt-2'>
            {Loadingbtn ? <button  className="registerbtn" type="button" disabled>Loading ...</button> : <button  className="registerbtn btn btn-success" type="submit">Register</button>}
            </div>
          
      </div>
    </form>
  )
}

export default Form

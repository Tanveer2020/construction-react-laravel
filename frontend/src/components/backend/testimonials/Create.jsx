import React, { useState } from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { apiUrl, token } from '../../common/http'
import { toast } from "react-toastify"


  const Create = ({placeholder}) => {


    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);

  const {
     register,
     handleSubmit,
     watch,
     formState: { errors },
   } = useForm()
 
   const navigate = useNavigate();
 
   const onSubmit = async (data) => {
     const newData = { ...data, "imageId" : imageId}
     const res = await fetch(apiUrl+'testimonials',{
       'method' : 'POST',
       'headers' : {
           'Content-type' : 'application/json',
           'Accept' : 'application/json',
           'Authorization' : `Bearer ${token()}`
       },
       body:JSON.stringify(newData)
   });
            const result = await res.json();
            
            if (result.status == true) {
             toast.success(result.message);
             navigate('/admin/testimonials');
            } else {
             toast.error(result.message);
 
            }
 
           }
 
           const handleFile = async (e) => {
             const formData = new FormData();
             const file     =  e.target.files[0];
             formData.append("image",file);
             setIsDisable(true);
            
              await fetch(apiUrl+'temp-images',{
               'method' : 'POST',
               'headers' : {
                   'Accept' : 'application/json',
                   'Authorization' : `Bearer ${token()}`
               },
               body: formData
           })
 
           .then(response => response.json())
           .then(result => {
             setIsDisable(false);
             if(result.status == false) {
               toast.error(result.errors.image[0])
             } else {
               setImageId(result.data.id)
             }
 
           });
 
           }
 




  return (
    <>
         <Header/>

<main>
    <div className='container my-5'>
    <div className='row'>
    <div className='col-md-3'>
       
       <Sidebar/>
        {/* Sidebar */}    

    </div>

    <div className='col-md-9'>
        {/* Dashboard */}
        <div className='card shadow border-0'>
            <div className='card-body p-4'>
                <div className ='d-flex justify-content-between'>
                <h4 className ='h5'>Testimonials / Create</h4>
                <Link to='/admin/testimonials' className='btn btn-primary'>Back</Link>
                </div>           
                <hr/>

                <form onSubmit={handleSubmit(onSubmit)}>


                <div className='mb-3'>
                    <label htmlFor='' className='form-label' >Testimonial</label>
                    <textarea
                    
                    placeholder='Testimonial'

                    {
                      ...register('testimonial',{
                        required : "The testimonial field is required"
                     })
                      
      
                    }
                    className= {`form-control ${errors.testimonial && 'is-invalid'}`} >

                     </textarea>

                    {
                      errors.testimonial && <p className='invalid-feedback'>{errors.testimonial?.message}</p>
                    }

                  </div>  


                  <div className='mb-3'>
                    <label htmlFor='' className='form-label'>Citation</label>
                    <input 

                    placeholder='Citation'
                    
                    {
                      ...register('citation',{
                        required : "The citation field is required"
                      })
                    }
                    
                    type='text' className= {`form-control ${errors.citation && 'is-invalid'}`}/>
                    {
                      errors.citation && <p className='invalid-feedback'>{errors.citation?.message}</p>
                    }
                  </div>



                   <div className='mb-3'>
                    <label htmlFor='' className='form-label'>Designation</label>
                    <input 

                    placeholder='Designation'
                    
                    {
                      ...register('designation')
                    }
                    
                    type='text' className= {`form-control `}/>
                    
                  </div>
                 
                  
                 
                 

                  <div className='mb-3'>
                    <label htmlFor='' className='form-label'>Image</label>
                    <br/>
                    <input onChange={handleFile} type = "file"/>
                    
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='' className='form-label'>Status</label>
                    <select className='form-control'
                     {
                      ...register('status')
      
                    }>
                      <option value= "1">Active</option>
                      <option value= "0">Block</option>
                    </select>
                  </div>
                  <button disabled = {isDisable} className='btn btn-primary'>Submit</button>
                </form>
                

            </div>
        </div>


    </div>
 </div>

    </div>
 

</main>
<Footer/>
    
    </>
  )
}

export default Create
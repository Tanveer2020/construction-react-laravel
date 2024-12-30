import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/Sidebar'
import Header from '../../common/Header'
import { Link } from 'react-router-dom'
import Footer from '../../common/Footer'
import { apiUrl,token } from '../../common/http'

const Show = () => {

  const [testimonials, setTestimonials] = useState([]);
        const fetchTesimonials = async () => {
         const res = await fetch(apiUrl+'testimonials',{
             'method' : 'GET',
             'headers' : {
                 'Content-type' : 'application/json',
                 'Accept' : 'application/json',
                 'Authorization' : `Bearer ${token()}`
             }
         });
         const result = await res.json();
         setTestimonials(result.data);
         
     } 

     const deleteTestimonial = async (id) => {                   

         
       if (confirm("Are you sure you want to delete?")) {

            const res = await fetch(apiUrl+'testimonials/'+id,{
                'method' : 'DELETE',
                'headers' : {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${token()}`
                }
            });
            const result = await res.json();

            if (result.status == true){
                const newTestimonials = testimonials.filter(testimonial => testimonial.id != id)
                setTestimonials(newTestimonials);
                toast.success(result.message)
            } else {
                toast.error(result.message)

            }
        }

     }


      useEffect(() => {
        fetchTesimonials();
     
         },[]);


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
                <h4 className ='h5'>Testimonials</h4>
                <Link to ='/admin/testimonials/create' className='btn btn-primary'>Create</Link>
                </div>           
                <hr/>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Testimonial</th>
                            <th>Citation</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            testimonials && testimonials.map(testimonial => {
                                return (
                                    <tr key={`testimonial-${testimonial.id}`}>
                            <td>{testimonial.id}</td>
                            <td>{testimonial.testimonial}</td>
                            <td>{testimonial.citation}</td>
                            <td>
                                {
                                (testimonial.status == 1) ? 'Active' : 'Block'
                                }
                            </td>
                            <td>
                                <Link to={`/admin/testimonials/edit/${testimonial.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                                <Link onClick={() => deleteTestimonial(testimonial.id)} to="#"className='btn btn-secondary btn-sm ms-2'>Delete</Link>

                            </td>

                        </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>

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

export default Show
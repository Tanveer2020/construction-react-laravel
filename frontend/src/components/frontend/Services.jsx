import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import  Hero  from '../common/Hero'
import ServiceImg from '../../assets/images/construction1.jpg';
import { apiUrl, fileUrl } from '../common/http';



const Services = () => {

  
  const [services, setServices] = useState([]);
  const FetchAllServices = async() => {

    const res = await fetch(apiUrl+'get-services',{
      'method' : 'GET',
  });
           const result = await res.json();
           console.log(result)
           setServices(result.data)
  
  }

  useEffect(() => {
    FetchAllServices()

  },[]);

  return (
    <>
      <Header/>
      <Hero preHeading='Quality. Integrity. Value.' 
       heading='Services'
       text= 'We excel at transforming visions into reality <br/> through outstanding craftsmanship and precise.'/>
        <section className = 'section-3 bg-light py-5'>
        <div className='container py-5'>
          <div className='section-header text-center'>
            <span>our services</span>
            <h2>Our construction services</h2>
            <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
          </div>
          <div className='row pt-4'>
          {
                services && services.map(service => {
                   return  (

                        <div className='col-md-4 col-lg-4'>
                        <div className='item'>
                          <div className='service-image'>
                            <img src={`${fileUrl}uploads/services/small/${service.image}`} alt='' className='w-100'/>
                          </div>
                          <div className='service-body'>
                            <div className='service-title'>
                              <h3>{service.title}</h3>
                            </div>
                            <div className='service-content'>
                              <p>{service.short_desc}</p>
                            </div>
                            <a href='#' className='btn btn-primary'>Read More</a>
                          </div>
                        </div>
                      </div>      

                    )
                })
              }
            
          </div>
        </div>

      </section>   
             <Footer/>
    </>
  )
}

export default Services
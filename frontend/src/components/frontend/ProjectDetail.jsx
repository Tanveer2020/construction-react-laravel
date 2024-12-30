import React, { useEffect, useState } from 'react'
import Footer from '../common/Footer'
import Header from '../common/Header'
import { useParams } from 'react-router-dom';
import { apiUrl, fileUrl } from '../common/http';
import Hero from '../common/Hero';
import ShowTestimonial from '../common/ShowTestimonial';

const ProjectDetail = () => {

   const params = useParams(); 
    const [project,setProject] = useState([]);
  
  
      const fetchProject = async () => {
       
      const res = await fetch(`${apiUrl}get-project/${params.id}`,{
        method: 'GET'
      });
  
      const result = await res.json();
      setProject(result.data)
     
  
      
        
    }
  
    useEffect(()=>{
      fetchProject();
    },[]);

  return (
    <>
    <Header/>
  <main>
 <Hero preHeading='Quality. Integrity. Value.' 
       heading={`${project.title}`}
       text= ''/>
         <section className='section-10'>
  
         
         <div className='container py-5'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='card shadow border-0 sidebar'>
                <div className='card-body px-4 py-4'>
                  <h3 className = "mt-2 mb-3">Insights</h3>
                  <ul>
                    {
                        project.location &&
                        <li class = "mb-2">
                        <span class = "text-body-secondary">Location</span>
                         <p>{project.location}</p> 
                    </li>
                    }

                     {  
                        project.construction_type &&
                        <li class = "mb-2">
                        <span class = "text-body-secondary">Construction Type</span>
                         <p>{project.construction_type}</p> 
                    </li>
                    }
                    

                    {  
                        project.sector &&
                        <li class = "mb-2">
                        <span class = "text-body-secondary">Sector</span>
                         <p>{project.sector}</p> 
                    </li>
                    }
                  </ul>
                 
  
                </div>
              </div>
  
            </div>
            <div className='col-md-8'>
              <div>
                <img className='w-100' src={`${fileUrl}uploads/projects/large/${project.image}`} alt=''></img>
              </div>
              <h3 className='py-3'>{project.title}</h3>
           <div dangerouslySetInnerHTML={{__html:project.content}}>

            </div>
           </div>
                          
              </div>
  
          </div>
  
         </section>
         <section className='section-11 bg-light py-5'>
         <ShowTestimonial/>

         </section>
         </main>
  
      <Footer/>
      </>
    )
}

export default ProjectDetail
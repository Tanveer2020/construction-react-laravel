import React from 'react'
import AboutImg from '../../assets/images/about-us.jpg';


export const About = () => {
  return (
<section className='section-2 py-5'>
        <div className = 'container py-5'>
          <div className = 'row'>

            <div className='col-md-6'>
              <img src={AboutImg} className='w-100'/>
            </div>
            
            <div className='col-md-6'>
              <span>about us</span>
              <h2>Crafting structures that last a lifetime</h2>
              <p>Building enduring structures requires a comprehensive approach that combines advanced materials,resilent design, routine maintenance, and sustainable practices.By drawing on historical insights and utilizing modern technology.
              </p>
              <p>Building enduring structures requires a comprehensive approach that combines advanced materials,resilent design, routine maintenance, and sustainable practices.By drawing on historical insights and utilizing modern technology.
              </p>
              
            </div>

          </div>
        </div>
      </section>
        )
}

export default About


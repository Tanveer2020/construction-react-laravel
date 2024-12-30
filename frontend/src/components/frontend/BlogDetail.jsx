import React, { useEffect, useState } from 'react'
import Footer from '../common/Footer'
import Header from '../common/Header'
import { Link, useParams } from 'react-router-dom';
import { apiUrl, fileUrl } from '../common/http';
import Hero from '../common/Hero'


const BlogDetail = () => {

   const params = useParams(); 
    const [article,setArticle] = useState([]);
    const [latestArticles,setLatestArticles] = useState([]);


    const fetchLatestArticles = async () => {
       

      const res = await fetch(`${apiUrl}get-latest-articles`,{
            method: 'GET'
          });
      
      const result = await res.json();
      setLatestArticles(result.data)
        
    }
  
  
      const fetchArticle = async () => {
       
      const res = await fetch(`${apiUrl}get-article/${params.id}`,{
        method: 'GET'
      });
      
      const result = await res.json();
      setArticle(result.data)
     
  
      
        
    }
  
    useEffect(()=>{
      fetchArticle();
      fetchLatestArticles();

    },[params.id]);

  return (
    <>
    <Header/>
  <main>
 <Hero preHeading='Quality. Integrity. Value.' 
       heading='Blog & News'
       text= ''/>
       <section className='section-11'>

       <div className='container py-5'>
        <div className='row'>
          <div className='col-md-8'>
            <h2>{article.title}</h2>
            <div class = "pb-3">
              by <strong>{article.author}</strong> on {article.created_at} 

            </div>
            <div class = "pe-md-5 pb-3">
             <img className='w-100' src={`${fileUrl}uploads/articles/large/${article.image}`} alt=''></img>
            </div>
              <div dangerouslySetInnerHTML={{__html:article.content}}> 
                
              </div>
          </div>
          <div className='col-md-4'>
            <div className='card shadow border-0 sidebar'>
            <div className='card-body p-4'>
              <h3 class = 'mt-2 mb-3'>Latest Blogs</h3>
              {
                latestArticles && latestArticles.map(latestArticle => {
                  return (
                    <div className='d-flex border-bottom mb-3 pb-2'>
                    <div className='pe-3 pb-3'>
                    <Link to={`/blog/${latestArticle.id}`}>
                            <img
                              width={100}
                              src={`${fileUrl}uploads/articles/small/${latestArticle.image}`}
                              alt={latestArticle.title}
                            />
                          </Link>
                        </div>
                        <Link to={`/blog/${latestArticle.id}`} className="title">
                          {latestArticle.title}
                        </Link>
                    <hr/>
                  </div>
                  )
                })
              }
              
            </div>

            </div>

          </div>

        </div>
       </div>


       </section>

       </main>
       <Footer/>
      
       </>
         )
}

export default BlogDetail
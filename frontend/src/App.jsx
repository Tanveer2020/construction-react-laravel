import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route } from 'react-router-dom';
import Home from './components/frontend/Home';
import About from './components/frontend/About';
import './assets/css/style.scss';
import Services from './components/frontend/Services';
import Projects from './components/frontend/Projects';
import { Blogs } from './components/frontend/Blogs';
import { ContactUs } from './components/frontend/ContactUs';
import Login from './components/backend/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/backend/Dashboard';
import RequireAuth from './components/common/RequireAuth';
import {default as ShowServices} from './components/backend/services/Show';
import {default as CreateService} from './components/backend/services/Create';
import {default as EditService} from './components/backend/services/Edit';

import {default as ShowProjects} from './components/backend/projects/Show';
import  {default as CreateProject} from './components/backend/projects/Create';
import  {default as EditProject} from './components/backend/projects/Edit';









function App() {
  
  return (
    <>
    
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/about' element = {<About/>} />
      <Route path='/services' element = {<Services/>} />
      <Route path='/projects' element = {<Projects/>} />
      <Route path='/blogs' element = {<Blogs/>} />
      <Route path='/contact' element = {<ContactUs/>} />
      <Route path='/admin/login' element = {<Login/>} />
      <Route path='/admin/dashboard' element = {
        <RequireAuth>
         
         <Dashboard/>
          
        </RequireAuth>
        
        } />


<Route path='/admin/services' element = {
        <RequireAuth>
         
         <ShowServices/>
          
        </RequireAuth>
        
        } />

<Route path='/admin/services/create' element = {
        <RequireAuth>
         
         <CreateService/>
          
        </RequireAuth>
        
        } />

<Route path='/admin/services/edit/:id' element = {
        <RequireAuth>
         
         <EditService/>
          
        </RequireAuth>
        
        } />    

  <Route path='/admin/projects' element = {
        <RequireAuth>
         
         <ShowProjects/>
          
        </RequireAuth>
        
        } />    

    <Route path='/admin/projects/create' element = {
        <RequireAuth>
         
         <CreateProject/>
          
        </RequireAuth>
        
        } />      

        
    <Route path='/admin/projects/edit/:id' element = {
        <RequireAuth>
         
         <EditProject/>
          
        </RequireAuth>
        
        } />       


      
    </Routes>

    <ToastContainer 
    
    position="top-center"

    
    />

   
     
    </>
  )
}

export default App

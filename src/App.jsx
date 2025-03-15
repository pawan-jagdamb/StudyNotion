import { useState } from 'react'

import './App.css'
import{Route,Routes, useNavigate} from "react-router-dom"
import Home from "./pages/Home"
import { Navbar } from './components/common/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import  {OpenRoute} from "/src/components/core/Auth/OpenRoute"
import { ForgotPassword } from './pages/ForgotPassword'
import { UpdatePassword } from './pages/updatePassword'
import { VerifyEmail } from './pages/VerifyEmail'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { MyProfile } from './components/core/Dashboard/MyProfile'
import { PrivateRoute } from './components/core/Auth/PrivateRoute'

import { Error } from './pages/Error'
import { Dashboard } from './pages/Dashboard'
import { EnrolledCourses } from './components/core/Dashboard/EnrolledCourses'
import { ACCOUNT_TYPE } from './utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {Cart} from './components/core/Dashboard/Cart'
import { Setting } from './components/core/Dashboard/Settings/index'
import { AddCourse } from './components/core/Dashboard/AddCourse/index'
import { MyCourses } from './components/core/Dashboard/MyCourses'
import { EditCourse } from './components/core/Dashboard/EditCourse'
import { Catalog } from './pages/Catalog'
import { CourseDetails } from './pages/CourseDetails'
import  ViewCourse  from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import  Instructor  from './components/core/Dashboard/InstructorDashboard/Instructor'
function App() {
  // const [count, setCount] = useState(0)
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const {user}= useSelector((state)=>state.profile)
  console.log(user);

  return (
  <div> 
    
  <Navbar/>
  <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='catalog/:catalogName' element={<Catalog/>}/>
  <Route path='courses/:courseId' element={<CourseDetails/>}/>

    <Route path='signup'
    element={
      <OpenRoute><Signup/></OpenRoute>
      
    }
    />

    <Route
      path='login'
      element={
        <OpenRoute><Login/></OpenRoute>
     
      }
    />
    <Route
      path='forgot-password'
      element={
        <OpenRoute>
          <ForgotPassword/>
        </OpenRoute>
      }


    />
    <Route
      path='update-password/:id'
      element={
        <OpenRoute>  <UpdatePassword/></OpenRoute>
      
      }

    />
     <Route
      path='verify-email'
      element={
        <OpenRoute>  <VerifyEmail/></OpenRoute>
      
      }

    />
    <Route
      path='about'
      element={
        <About/> 
      }
    />
   <Route
    path='/contact'
    element={<Contact/>}
   
   />
   <Route 
    element ={
      <PrivateRoute>
        <Dashboard/>
      </PrivateRoute>
    }
   >
   <Route path='dashboard/my-profile' element={<MyProfile/>}/>
   <Route path='dashboard/settings'element={<Setting/>}/>
   <Route path='dashboard/ 'element={<Setting/>}/>


   
   {
  
    user?.accountType== ACCOUNT_TYPE.STUDENT &&(
      <>
      <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
      
      <Route path='dashboard/cart' element={<Cart/>}/>

      </>
    )
   }
   {
    user?.accountType==ACCOUNT_TYPE.INSTRUCTOR&&(
      <>
   <Route path='dashboard/instructor'element={<Instructor/>}/>

        <Route path='dashboard/add-course' element={<AddCourse/>}/>
        <Route path='dashboard/my-courses' element={<MyCourses/>}/>
        <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>

      </>
    )
   }


   </Route>

   <Route element={
    <PrivateRoute>
      <ViewCourse/>
    </PrivateRoute>
   }>
   {
    user?.accountType===ACCOUNT_TYPE.STUDENT&&(<>
      <Route path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId'
      element={<VideoDetails/>}

      />
    </>
    )
   }

   </Route>


   
   <Route path='*' element={<Error/>}/>


  
    <Route path='/' element={<Home/>}/>
  </Routes>
    
  </div>
  )
}

export default App

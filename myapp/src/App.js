import React from 'react'

import {Routes,Route,BrowserRouter} from 'react-router-dom'
// import Home from './Component/Home'
import Dashboard from './Component/Dashboard/Dashboard'
import Sidebar from './Component/Sidebar'
import User from './Component/Users/User'
import Role from './Component/Role/Role'
import Category from './Component/Category/Category';
import Subcategory from './Component/Subcategory/Subcategory'
import Retailer from './Component/Retailer/Retailer'
import Offer from './Component/Offers/Offer'
import Adduser from './Component/Users/Adduser'
function App() {
  return (
    <div>
     <BrowserRouter>
      
     <Routes>
      <Route path='/' element={<Sidebar/>} >
      <Route path='/dashboard' element={<Dashboard/>} ></Route>
      <Route path='/user' element ={<User/>}></Route>
      <Route path='/Adduser' element ={<Adduser/>}></Route>
      <Route path='/role' element ={<Role/>}></Route>
      <Route path='/category' element ={<Category/>}></Route>
      <Route path='/subcategory' element ={<Subcategory/>}></Route>
      <Route path='/retailer' element ={<Retailer/>}></Route>
      <Route path='/offer' element ={<Offer/>}></Route>
      </Route>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App

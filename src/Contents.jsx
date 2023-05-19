import React from 'react'
import EmployeeReport from './EmployeeReport.jsx'
import EmployeeList from './EmployeeList.jsx';
import { Route, Routes, Navigate } from 'react-router-dom';
import EmployeeEdit from './EmployeeEdit.jsx';

export default function Contents (){
    const NotFound = ()=>{<h1>Page not Found</h1>}
    return(
        <Routes>
            <Route path='/employee' element={<EmployeeList/>}/>
            <Route path='/report' element={<EmployeeReport/>}/>
            <Route path='/edit/:id' element={<EmployeeEdit/>}/>
            <Route path='/' element={<Navigate to={'/employee'}/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
  }
import EmployeeList from './EmployeeList.jsx';
import React from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';


ReactDOM.render(
    <Router>
    <React.StrictMode>
        <Page />
    </React.StrictMode>
    </Router>
    , 
    document.getElementById('content'))
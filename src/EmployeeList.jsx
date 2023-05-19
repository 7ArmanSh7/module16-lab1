import React from 'react'
import EmployeeFilter from './EmployeeFilter.jsx';
import EmployeeAdd from './EmployeeAdd.jsx'
import { useLocation, Link } from 'react-router-dom';
import { Badge, Button,Table, Card, Modal } from 'react-bootstrap';

class EmployeeRow extends React.Component {
  
  constructor(){
    super()
    this.state=
      {
        modalVisible:false
      }
    
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal(){
    this.setState(
      {
        modalVisible:!this.state.modalVisible
      }
    )
  }

  onDeleteClick(){
      this.props.deleteEmployee(this.props.employee._id)
      this.setState(
        {
          modalVisible:!this.state.modalVisible
        }
      )
   }

   render(){
      return (  <>
                    <tr>
                      <td ><Link to ={`/edit/${this.props.employee._id}`}>{this.props.employee.name}</Link></td>
                      <td >{this.props.employee.extension}</td>
                      <td >{this.props.employee.email}</td>
                      <td >{this.props.employee.title}</td>
                      <td >{this.props.employee.dateHired.toDateString()}</td>
                      <td >{this.props.employee.currentlyEmployed?"Yes":"No"}</td>
                      <td><Button variant='danger' size='sm' onClick={this.toggleModal}>X</Button></td>
                    </tr>

                    <Modal show={this.state.modalVisible} onHide={this.toggleModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Delete Employee</Modal.Title> 
                        </Modal.Header>
                        <Modal.Body>
                          Are you sure you want to delete this employee?
                        </Modal.Body>
                        <Modal.Footer>
                              <Button type='submit' variant='danger' size='sm' className='mt-4' onClick={this.toggleModal}>Cancel</Button>
                              <Button type='submit' variant='success' size='sm' className='mt-4' onClick={this.onDeleteClick}>Yes</Button>
                        </Modal.Footer>
                    </Modal>
                </>
        )
  }
  
}

function EmployeeTable(props){
    // Getting the full URL
    const {search} = useLocation()
    const query = new URLSearchParams(search)
    const q = query.get('employed')

  const employeeRows = props.employees
  .filter((employee)=>(q?String(employee.currentlyEmployed)===q:true))
  .map(employee=> <EmployeeRow  
      key={employee._id} 
      employee={employee}
      deleteEmployee={props.deleteEmployee}
    />)
  return (
    <Card>
      <Card.Header as="h5">All Employees <Badge bg="secondary">{employeeRows.length}</Badge></Card.Header>
      <Card.Body>
        <Card.Text>
        <Table seprated size='sm'>
          <thead>
                <tr>
                <th>Name</th>
                <th>Extension</th>
                <th>Email</th>
                <th>Title</th>
                <th>Date Hired</th>
                <th>Employed?</th>
                <th></th>
              </tr>
          </thead>
          <tbody>
            {employeeRows}
          </tbody>
        </Table>
        </Card.Text>
      </Card.Body>
    </Card>
    )
}
export default class EmployeeList extends React.Component{
  constructor(){
    super()
    this.state ={
      employees :[]
    }
    this.createEmployees = this.createEmployees.bind(this)
    this.deleteEmployee = this.deleteEmployee.bind(this)
  }

  componentDidMount(){
    this.loadData()
  }

  loadData(){
      fetch("/api/employees")
      .then(response=>response.json())
      .then(
          (data)=>{
            data.employees.forEach(employee => {
              employee.dateHired = new Date(employee.dateHired)
            });
            this.setState({employees:data.employees})
          }
      )
      .catch((err)=>console.log(err))
  }

  createEmployees(employee){
    fetch("/api/employees",{method:"POST",headers:{"Content-Type":"application/json"}, 
  body:JSON.stringify(employee)})
    .then(response=>response.json())
    .then(
        (data)=>{
            data.employee.dateHired = new Date( data.employee.dateHired)
            const newEmployees = this.state.employees.concat(data.employee)
            this.setState({employees:newEmployees})
        }
    )
    .catch((err)=>console.log(err))
  }

  deleteEmployee(id){
    fetch(`/api/employees/${id}`,{method:"DELETE"})
    .then(response=>{
      if(!response.ok){
        console.log("Failed to delete employee")
      }
      else{
        this.loadData()
      }
    })
    .catch((err)=>console.log(err))
  }
  
  render(){
   return (
          <React.Fragment>
                  <title>React documents</title>
                  <EmployeeAdd createEmployees ={this.createEmployees.bind(this)} />
                  <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee}/>
                  
                  <EmployeeFilter/>
          </React.Fragment>
    );
  }
}
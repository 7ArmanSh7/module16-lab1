import React from 'react'
import { Card } from 'react-bootstrap'

export default class EmployeeReport extends React.Component{
    render(){
      return (
          <Card>
            <Card.Header as="h5">Filter</Card.Header>
            <Card.Body>
              <Card.Text>
                 Employee Reports
                </Card.Text>
            </Card.Body>
      </Card>
      )
    }
  }
  
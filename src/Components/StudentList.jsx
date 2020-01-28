import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {ListGroup} from 'react-bootstrap';
import {Api} from "../Api";
import StudentDetails from "./StudentDetails";
import ProjectDetails from "./ProjectDetails";
import {Spinner} from "reactstrap";

class StudentList extends Component {
    state = {};
    onDelete = (student) => {
        Api.fetch("/students/" + student._id, "DELETE").then(res => {
            console.log(res);
            this.props.refresh();
        });
    };

    onEdit = (student) => {
        this.props.onEdit(student);
    };

    componentDidMount = () => {
        //setInterval(() => this.loadData(), 10000);
        this.loadData();
    };
    loadData = () => {
        // setTimeout(() => {
        Api.fetch("/students").then((students) => this.setState({students: students}));
        // Api.fetch("/projects").then((projects) => this.setState({projects: projects}));
        //}, 3000);

    };

    render() {
        if (!this.state.students) return (<div style={{display: 'flex', height: '100vh'}}>
            <div style={{margin: 'auto'}}><Spinner style={{width: '6rem', height: '6rem'}} type="grow" color="danger"/>
            </div>
        </div>);
        return (

            <div>
                <ListGroup as="ul">
                    {this.state.students && this.state.students.map(student =>
                        <ListGroup.Item as="li" active
                                        key={student._id}
                                        style={{
                                            marginBottom: '10px',
                                            borderRadius: '5px'
                                        }}>
                            <div style={{display: 'flex'}} className="student-container">
                                <div>
                                    {student.picture && <img src={student.picture} className="user-image"/>}
                                </div>
                                <div className="details-container">
                                    <div className="user-name"><Link className={'singleStudent'}
                                                                  to={'/student/' + student._id}> {student.name} {student.surname}</Link>
                                    </div>
                                    {/*<div className="user-title"></div>*/}
                                </div>
                                <div className="right-buttons">
                                    <div onClick={(e) => this.onEdit(student)}><i className='fas fa-edit'></i></div>
                                    <div onClick={(e) => this.onDelete(student)}><i className='fas fa-trash'></i></div>
                                </div>
                            </div>
                        </ListGroup.Item>)}
                </ListGroup>
            </div>
        );
    }
}

export default StudentList;

import React, {Component} from 'react';
import {ListGroup} from "react-bootstrap";
import moment from "moment";
import {Api} from "../Api";
import ProjectsList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import {button, Container, input, label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";


class SingleStudent extends Component {
    refresh = () => {
        Api.fetch("/students/" + this.props.match.params.id, "GET").then(student => {
            Api.fetch("/projects/" + this.props.match.params.id, "GET").then(projects => {
                console.log(projects);
                this.setState({student: {...student, projects: projects}});
            });
        });
    }

    componentDidMount() {
       // setTimeout(()=> {this.refresh()}, 3000);
        this.refresh();
    }

    state = {modal: false, project: {studentID: this.props.studentID}, student: null};
    onFormSubmit = (e) => {
        if (this.state.project._id) {
            Api.fetch("/projects/" + this.state.project._id, "PUT", this.state.project).then(res => {
                console.log("edit", res);
                this.refresh();
            });

        } else {
            Api.fetch("/projects/", "POST", this.state.project).then(res => {
                console.log("inserted", res);
                this.refresh()
            });
        }
        this.setState({_id: undefined});
        this.toggle();
    };
    updateForm = (e) => {
        this.setState({project: {...this.state.project, [e.target.id]: e.target.value}});
    };
    formRequire = (e) => {
        return !(this.state.project.name && this.state.project.description && this.state.project.repourl && this.state.project.liveurl);
    };
    toggle = () => {
        this.setState({modal: !this.state.modal});
    };
    onEdit = (project) => {
        console.log(project);
        this.setState({project: {...project}});
        this.toggle();
    };

    render() {

        const student = this.state.student;
        if (!student) return (<div style={{display: 'flex', height: '100vh'}}>
            <div style={{margin: 'auto'}}><Spinner style={{width: '6rem', height: '6rem'}} type="grow" color="danger"/>
            </div>
        </div>);
        return (
            <>
                <div style={{display: 'flex'}} className="student-container">
                    <div>
                        {student.picture && <img src={student.picture} className="user-detail-image"/>}
                    </div>
                    <div className="details-container">
                        <div className="user-detail-name">{student.name} {student.surname}</div>
                        <div>Student ID: {student.studentID}</div>
                        <div>Email: {student.email}</div>
                        <div>Age: {moment(student.date).fromNow(true)}</div>
                    </div>
                </div>
                <div className="add-project-button">
                    <ProjectDetails studentID={student._id} refresh={this.refresh}/>
                </div>
                <div>
                    <ProjectsList projects={student.projects} onEdit={this.onEdit} refresh={this.refresh}/>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader className="modalHeaderNfModal" toggle={this.toggle}>Enter Project
                        Details</ModalHeader>
                    <ModalBody>
                        <Container className={'studentForm'}>

                            <form autoComplete="off" id="form">
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label>Project Name</label>
                                        <input type="text" className="form-control" id="name"
                                               placeholder="Project Name"
                                               defaultValue={this.state.project.name}
                                               onChange={this.updateForm}/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Description</label>
                                        <input type="text" className="form-control" id="description"
                                               placeholder="Description"
                                               defaultValue={this.state.project.description}
                                               onChange={this.updateForm}/>
                                    </div>

                                </div>
                                {/*<div className="form-group">*/}
                                {/*    <label>ID</label>*/}
                                {/*    <input type="text" className="form-control" id="studentID"*/}
                                {/*           placeholder="#" onChange={this.updateForm}*/}
                                {/*           defaultValue={this.state.project.studentID}/>*/}
                                {/*</div>*/}
                                <div className="form-group">
                                    <label>RepoUrl</label>
                                    <input type="text" className="form-control" id="repourl"
                                           placeholder="" onChange={this.updateForm}
                                           defaultValue={this.state.project.repourl}/>
                                </div>
                                <div className="form-group">
                                    <label>Live Url</label>
                                    <input type="text" className="form-control" id="liveurl"
                                           placeholder="" onChange={this.updateForm}
                                           defaultValue={this.state.project.liveurl}/>
                                </div>

                                <button type="button" className="btn btn-primary"
                                        disabled={this.formRequire() ? 'disabled' : null}
                                        onClick={this.onFormSubmit}>Submit
                                </button>
                            </form>
                        </Container>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}
export default SingleStudent;
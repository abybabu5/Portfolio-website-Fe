import React, {Component} from 'react';
import {Container, button, label, input} from 'reactstrap';
import ProjectList from "./ProjectList";
import {Api} from "../Api";
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';


class ProjectDetails extends Component {
    state = {modal: false, project: {studentID: this.props.studentID}};
    onFormSubmit = (e) => {
        if (this.state._id) {
            Api.fetch("/projects/" + this.state._id, "PUT", this.state.project).then(res => {
                console.log("edit", res);
                this.props.refresh();
            });

        } else {
            Api.fetch("/projects/", "POST", this.state.project).then(res => {
                console.log("inserted", res);
                this.props.refresh()
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
        return (
            <>

                <div onClick={this.toggle} style={{color: 'black'}}><i
                    className="fas fa-plus" id="newsfeedPencil"></i></div>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader className="modalHeaderNfModal" toggle={this.toggle}>Enter Project
                        Details</ModalHeader>
                    <ModalBody>
                        <Container className={'studentForm'}>

                            <form autoComplete="off" id="form">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Project Name</label>
                                        <input type="text" className="form-control" id="name"
                                               placeholder="Project Name"
                                               defaultValue={this.state.project.name}
                                               onChange={this.updateForm}/>
                                    </div>
                                    <div className="form-group col-md-6">
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
                                <div clasName="form-group">
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

export default ProjectDetails;

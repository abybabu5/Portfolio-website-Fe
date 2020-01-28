import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Api } from "../Api";


class ProjectsList extends Component {
    onDelete = (project) => {
        Api.fetch("/projects/" + project._id, "DELETE").then(res => {
            console.log(res);
            this.props.refresh();
        });
    };

    onEdit = (project) => {
        this.props.onEdit(project);
    };

    render() {
        return (
            <div>
                <ListGroup  as="ul">
                    {this.props.projects.map(project => <ListGroup.Item as="li" className="project" active key={project._id} style={{
                        marginBottom: '10px',
                        borderRadius: '5px'
                    }}>
                        <div style={{display: 'flex'}} className="project-container">
                            <div className="details-container">
                                <div>Project {project.studentID.name && <>of {project.studentID.name} {project.studentID.surname}
                                    <img src={project.studentID.picture} className="user-image-small"/></>}
                                </div>
                                <div className="user-name">{project.name}</div>
                                <div className="user-title">Description: {project.description}</div>
                                <div className="user-title">Repository: {project.repourl}</div>
                                <div className="user-title">Live: {project.liveurl}</div>
                            </div>
                            {this.props.onEdit !== undefined && <div>
                                <div onClick={(e) => this.onEdit(project)}><i className='fas fa-edit'></i></div>
                                <div onClick={(e) => this.onDelete(project)}><i className='fas fa-trash'></i></div>
                            </div>}
                        </div>
                    </ListGroup.Item>)}
                </ListGroup>
            </div>
        );
    }
}
export default ProjectsList;

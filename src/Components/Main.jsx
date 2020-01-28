import React, {Component} from 'react';
import StudentDetails from './StudentDetails';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Api} from "../Api";
import ProjectDetails from './ProjectDetails';
import SingleStudent from "./SingleStudent";
import {Spinner} from "reactstrap";
import Container from "react-bootstrap/Container";

class Main extends Component {
    state = {students: null, projects: []};


    render() {

        return (
            <Container style={{marginTop: '20px'}}>
                <Router>
                <div style={{display: 'flex'}}>
                    <div>
                        <h2 style={{marginBottom: '20px'}}><b>Student Portfolio</b></h2>
                    </div>
                    <div style={{flex: '1 1 auto'}}></div>
                    <div style={{marginRight: '10px'}}>
                        <Link to="/"><i className="fas fa-home" id="newsfeedPencil"></i></Link>
                    </div>
                </div>

                    <Route path='/' exact>
                        <StudentDetails refresh={this.loadData}/>
                    </Route>
                    <Route path='/student/:id' component={SingleStudent}/>
                    {/*<Route path='/Projects'>*/}
                    {/*    <ProjectDetails projects={this.state.projects} refresh={this.loadData}/>*/}
                    {/*</Route>*/}
                </Router>

            </Container>
        );
    }
}

export default Main;

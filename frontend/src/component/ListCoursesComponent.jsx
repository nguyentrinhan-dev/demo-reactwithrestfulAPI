import { Component } from "react";
import CourseDataService from "../service/CourseDataService";

const INSTRUCTOR = 'nguyentrinhan';

class ListCoursesComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            message: null
        }
        this.refreshCourses = this.refreshCourses.bind(this)
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        CourseDataService.retrieveAllCourses(INSTRUCTOR)//HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({ courses: response.data })
                }
            )
    }

    deleteCourseClicked(id){
        CourseDataService.deleteCourse(INSTRUCTOR, id).then(
            response => {
                this.setState({ message:`Delete of course ${id} Successful` });
                this.refreshCourses()
            }
        )
    }

    render() {
        return (
            <div className="container">
                <h3>All Courses</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.courses.map(
                                    courses =>
                                    <tr key={courses.id} >
                                        <td>{courses.id}</td>
                                        <td>{courses.description}</td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteCourseClicked(courses.id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListCoursesComponent
import React from 'react';

import courses from '../../helpers/courses';
import './Courses.css';

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    const self = this;
    courses(this.props.departmentId).then((response) => {
      self.setState({
        courses: response,
      });
    });
  }

  createDropdowncourses() {
    const items = [];
    const courseArrays = [];
    const size = 3;

    while (this.state.courses.length > 0) {
      courseArrays.push(this.state.courses.splice(0, size));
    }
    courseArrays.forEach((courseArray) => {
      const threeCourses = [];
      courseArray.forEach((course) => {
        threeCourses.push(
          <div className="column column-33">
            <blockquote className="course-card">
              <h4><em>{course.name}</em></h4>
              {course.description}
              <h6><small><strong>credit-hrs:</strong> {course.credit_hours}</small></h6>
            </blockquote>
          </div>,
        );
      });
      items.push(<div className="row">{threeCourses}</div>);
    });

    return items;
  }

  render() {
    return (
      <div className="row">
        <div className="column column-60 column-offset-20">
          {this.createDropdowncourses()}
        </div>
      </div>
    );
  }
}

export default Courses;

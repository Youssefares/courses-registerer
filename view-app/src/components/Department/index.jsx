import React from 'react';
import PropTypes from 'prop-types';

import { departments, enroll } from '../../helpers/departments';
import './Department.css';
import Courses from '../Courses';

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      department: 1,
      viewCourses: false,
    };
    this.createDropdownDepartments = this.createDropdownDepartments.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDepartmentChange = this.onDepartmentChange.bind(this);
    this.viewCourses = this.viewCourses.bind(this);
  }

  componentDidMount() {
    const self = this;
    departments().then((response) => {
      self.setState({
        departments: response,
      });
    });
  }

  onDepartmentChange(event) {
    this.setState({
      department: event.target.value,
      viewCourses: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    enroll(this.state.department).then(() => {
      this.props.enroll();
    });
  }

  createDropdownDepartments() {
    const items = [];
    this.state.departments.forEach((department) => {
      items.push(<option key={department.id} value={department.id}>{ department.name }</option>);
    });
    return items;
  }

  viewCourses(event) {
    event.preventDefault();
    this.setState({
      viewCourses: true,
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="column column-33 column-offset-20">
            <h1> departments </h1>
          </div>
        </div>
        <div className="row">
          <div className="column column-60 column-offset-20">
            <form onSubmit={this.handleSubmit}>
              <fieldset>
                <select
                  id="department"
                  onChange={this.onDepartmentChange}
                  value={this.state.department}
                >
                  {this.createDropdownDepartments()}
                </select>
                <div className="row">
                  <button
                    className="button-clear column column-33 column-offset-20"
                    type="button"
                    onClick={this.viewCourses}
                  >
                    view department courses
                  </button>
                  <input className="button-primary column column-20" type="submit" value="enroll" />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div>
          { this.state.viewCourses ? <Courses departmentId={this.state.department} /> : null }
        </div>
      </div>
    );
  }
}

Department.propTypes = {
  enroll: PropTypes.func.isRequired,
};
export default Department;

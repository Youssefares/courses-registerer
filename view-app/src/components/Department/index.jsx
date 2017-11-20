import React from 'react';
import ReactDOM from 'react-dom';

import { departments, enroll } from '../../helpers/departments';
import './Department.css';

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
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
    });
  }

  handleSubmit() {
    enroll(this.state.department);
  }

  createDropdownDepartments() {
    const items = [];
    this.state.departments.forEach((department) => {
      items.push(<option key={department.id} value={department.id}>{ department.name }</option>);
    });
    return items;
  }

  viewCourses() {
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
            {/* TODO: replace 'courses' with Courses Component */}
            { this.state.viewCourses ? 'courses' : null }
          </div>
        </div>
      </div>
    );
  }
}

export default Department;

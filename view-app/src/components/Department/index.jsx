import React from 'react';
import { departments } from '../../helpers/departments';

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
    };
  }

  componentDidMount() {
    const self = this;
    departments().then((response) => {
      self.setState({
        departments: response,
      });
    });
    this.createDropdownDepartments = this.createDropdownDepartments.bind(this);
  }

  createDropdownDepartments() {
    let items = [];
    this.state.departments.forEach((department) => {
      items.push(<option key={department.id} value={department.id}>{ department.name }</option>);
    });
    return items;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="column column-33 column-offset-10">
            <h1> Departments </h1>
          </div>
        </div>
        <div className="row">
          <div className="column column-80 column-offset-10">
            <form>
              <fieldset>
                <select id="department">
                  {this.createDropdownDepartments()}
                </select>
                <input className="button-primary" type="submit" value="Send" />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Department;

import React from 'react';
import propTypes from 'prop-types';
import './PeopleTable.scss';
import People from './People';

class PeopleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPerson: null,
      sortedPeopleList: this.props.peopleData,
    };
    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.sortData(), 70);
  }

  sortData = (sortCase = 'id') => {
    this.setState(state => ({
      direction: state.direction === 1 ? -1 : 1,
      sortedPeopleList:
        [...this.props.peopleData]
          .sort((a, b) => (sortCase === 'name'
            ? state.direction * a[sortCase].localeCompare(b[sortCase])
            : state.direction * (b[sortCase] - a[sortCase]))),
    }));
  };

  handler(inputValue) {
    this.setState({
      selectedPerson: inputValue,
    });
  }

  render() {
    const sortCases = ['id', 'name', 'sex', 'born', 'died', 'age'];

    return (
      <table className="PeopleTable" key="table">
        <thead key="tHead">
          <tr key="head_row" className="table-head--row">
            {sortCases.map(inputCase => (
              inputCase === 'sex'
                ? (<td key={`tHead${inputCase}`}>{inputCase}</td>)
                : (
                  <td key={`tHead${inputCase}`}>
                    <button
                      type="button"
                      onClick={() => this.sortData(inputCase)}
                    >
                      {inputCase}
                    </button>
                  </td>
                )))}
            <td key="tHead_century">century</td>
            <td key="tHead_mother">mother</td>
            <td key="tHead_father">father</td>
            <td key="tHead_children">children</td>
          </tr>
        </thead>
        <tbody key="tBody">
          {
            this.state.sortedPeopleList
              .map(onePersonData => (
                <People
                  key={`People_${onePersonData.id}`}
                  personData={onePersonData}
                  handler={this.handler}
                  selectedPerson={this.state.selectedPerson}
                />
              ))
          }
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  peopleData: propTypes.arrayOf(propTypes.object).isRequired,
};

export default PeopleTable;

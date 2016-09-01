import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';
import  '../public/styles.css';

/*
class Search extends  Component {
  constructor() {
    super(...arguments);
    this.state = {
      searchText: "React"
    }
  }

  handleChange(event) {
    this.setState({searchText: event.target.value.substr(0, 10)});
  }

  render() {
    return (
      <div>
        Search Item: <input type="search"
                            value={this.state.searchText}
                            onChange={this.handleChange.bind(this)} />
        <select value="B">
          <option value="A">AAA</option>
          <option value="B">BBB</option>
          <option value="C">CCC</option>
        </select>
      </div>
    );
  }
}

class FiledList extends Component {
  handleSubmit(event) {
    console.log("Name: " + event.target.name.value);
    console.log(`Email: ${event.target.email.value}`);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Name: <input type="text" name="name" defaultValue="huogh"/>
        </div>
        <div>
          Email: <input type="email" name="email"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

class Greeter extends Component {
  render() {
    return (
      <div>{this.props.salutation}</div>
    );
  }
}

let MyValidator = (props, prop, componentName) => {
  console.log('props: ' + props);
  console.log('prop: ' + prop);
  console.log('name: ' + componentName);
  if (props[prop]) {
    let value = props[prop];
    if (typeof value !== 'string' || value.length > 10) {
      return new Error(
        `${prop} in ${componentName} is longer than 10 chars.`
      );
    }
  }
}

Greeter.propTypes = {
  salutation: MyValidator
}

Greeter.defaultProps = {
  salutation: "Hello, ReactJS!"
}
*/

// Main (statefull) component.
// Renders a SearchBar and a ContactList
// Passes down filterText state and handleUserInput callback as props
class ContactApp extends Component {
  constructor() {
    super();
    this.state = {
      filterText: ''
    }
  }

  handleUserInput(searchTerm) {
    this.setState({filterText:searchTerm});
  }

  render() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText}
                   onUserInput={this.handleUserInput.bind(this)} />
        <ContactList contacts={this.props.contacts}
                     filterText={this.state.filterText} />
      </div>
    );
  }
}

ContactApp.propTypes = {
  constacts: PropTypes.arrayOf(PropTypes.object)
}

// Pure component that receives 2 props from the parent
// filterText (string) and onUserInput (callback function)
class SearchBar extends Component {
  handleChange(event) {
    this.props.onUserInput(event.target.value);
  }

  render() {
    return (
      <input type="search"
             placeholder="search"
             value={this.props.filterText}
             onChange={this.handleChange.bind(this)} />
    );
  }
}

SearchBar.propTyps = {
  filterText: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired
}

// Pure component that receives both contacts and filterText as props
// The component is responsible for actualy filtering the
// contacts before displaying them.
class ContactList extends Component {
  render() {
    let filteredContacts = this.props.contacts.filter(
      (contact) => contact.name.indexOf(this.props.filterText) !== -1
    );

    return (
      <ul>
        {filteredContacts.map(
          (contact) => <ContactItem key={contact.email}
                                    name={contact.name}
                                    email={contact.email} />
        )}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  filterText: PropTypes.string.isRequired
}

class ContactItem extends Component {
  render() {
    return (
      <li>{this.props.name} - {this.props.email}</li>
    );
  }
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

let contacts = [
  {name: "Cassio Zen", email: "cassiozen@gmail.com"},
  {name: "Dan Abramov", email: "gaearon@somewhere.com"},
  {name: "Pete Hunt", email: "floydophone@gamil.com"},
  {name: "Paul O'shannessy", email: "huogh@126.com"},
  {name: "Huo GH", email: "huoggg@infomeida.com.cn"},
  {name: "Liu Weijia", email: "liuvg@a.com"}
];


render(<ContactApp contacts={contacts} />, document.getElementById('root'));

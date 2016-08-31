import React, { Component } from 'react';
import {render} from 'react-dom';
import  '../public/styles.css';

// Parent Component
class GroceryList extends Component {
    render() {
        return (
            <ul>
                <ListItem index="1" quantity="1" name="Bread" />
                <ListItem index="2" quantity="6" name="Eggs" />
                <ListItem index="3" quantity="2" name="Milk" />
            </ul>
        );
    }
}

// Child Component 
class ListItem extends Component {
    render() {
        return (
            <li>
                <a href="#">{this.index} {this.props.quantity}•{this.props.name}</a>
            </li>
        );
    }
}

render(<GroceryList />, document.getElementById('root'));

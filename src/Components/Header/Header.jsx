import React from 'react';
import './Header.css';
import AddButton from '../AddButton/AddButton.jsx';

export default function Header(props) {
    return (
      <div className="Header">
          <h1>Title</h1>
          <AddButton showNameBox={props.showNameBox} />
      </div>
    );
}
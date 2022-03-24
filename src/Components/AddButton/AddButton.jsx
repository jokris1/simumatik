import React from 'react';
import './AddButton.css';

export default function AddButton(props) {
    return (
      <button className="AddButton" onClick={props.showNameBox}>Add Person</button>
    );
}
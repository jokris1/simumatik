import React from 'react';
import './BoxName.css';

export default function BoxName(props) {

    return (
        <div className="BoxName box">
            <a onClick={props.close}>X</a>
            <form>
                <input placeholder="Enter Name:"></input>
            </form>
            <button type="submit" onClick={() => {
                props.submitName(props.participants, props.setParticipants);
                props.close();            
            }}>Ok</button>
        </div>
    );
}
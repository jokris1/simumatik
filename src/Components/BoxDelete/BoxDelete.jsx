import React from 'react';
import './BoxDelete.css';

export default function BoxDelete(props) {

    return (
        <div className="BoxDelete box">
            Are you sure you want<br />
            to delete name?
            <div className="btnContainer">
                <button className="btnRed" onClick={() => props.close()}>No</button>
                <button className="btnGreen" onClick={() => {
                    props.deleteName(props.person, props.participants, props.setParticipants);
                    props.close();
                }}>Yes</button>
            </div>
        </div>
    );
}
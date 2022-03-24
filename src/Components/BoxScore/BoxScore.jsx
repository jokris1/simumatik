import React from 'react';
import './BoxScore.css';

export default function BoxScore(props) {

    return (
        <div className="BoxScore box">
            Are you sure you want<br />
            to adjust the score?
            <div className="btnContainer">
                <button className="btnRed" onClick={() => props.close()}>No</button>
                <button className="btnGreen" onClick={() => {
                    props.submitScore(props.person, props.pointType, props.participants, props.setParticipants);
                    props.close()
                }}>Yes</button>
            </div>
        </div>
    );
}
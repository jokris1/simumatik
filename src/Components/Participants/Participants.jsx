import React from 'react';
import './Participants.css';

export default function Participants(props) {

    return (
        <div className="Participants">
            <table>
                <thead>
                    <tr>
                        <th>Participants:</th>
                        <th>Wins:</th>
                        <th>Losses:</th>
                        <th>⇧</th>
                        <th>⇩</th>
                        <th>X</th>
                    </tr>
                </thead>
                    
                <tbody>

                    {props.participants.map((participant) => (

                        <tr key={participant.id} id={participant.id}>
                            <td>{participant.name}</td>
                            <td>{participant.wins}</td>
                            <td>{participant.losses}</td>
                            <td><a className="wins" onClick={() => props.showScoreBox("wins", props.pointType, props.setPointType, participant, props.person, props.setPerson)}>⇧</a></td>
                            <td><a className="losses" onClick={() => props.showScoreBox("losses", props.pointType, props.setPointType, participant, props.person, props.setPerson)}>⇩</a></td>
                            <td><a onClick={() => props.showDeleteBox(participant, props.person, props.setPerson)}>X</a></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}
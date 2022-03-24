// import logo from './Assets/Images/logo.svg';
import React, { useState, useEffect } from 'react';
import './Styles/App.css';
import helpers from './Helpers/helpers.jsx';
import Logo from './Components/Logo/Logo.jsx';
import Header from './Components/Header/Header.jsx';
import DarkBackground from './Components/DarkBackground/DarkBackground.jsx';
import BoxName from './Components/BoxName/BoxName.jsx';
import BoxScore from './Components/BoxScore/BoxScore.jsx';
import BoxDelete from './Components/BoxDelete/BoxDelete.jsx';
import AsideLeft from './Components/AsideLeft/AsideLeft.jsx';
import AsideRight from './Components/AsideRight/AsideRight.jsx';
import Participants from './Components/Participants/Participants.jsx';

function App() {

    // set state variables
    const [participants, setParticipants] = useState( [] );
    const [person, setPerson] = useState( {} )
    const [pointType, setPointType] = useState( "" ) // wins/losses

    // initial and after every change of state
    useEffect(() => {
        // fetch data
        async function getNames() {
            // collect and display data
            await helpers.getParticipants(participants, setParticipants);

        }
        
        // call function to collect data
        getNames();

    }, []); // optional [] meaning if useState variables inside useEffect then they execute only initially

  return (
    <div className="App">
        <Logo />

        <Header showNameBox={helpers.showNameBox} />

        <Participants
            participants={participants}
            setParticipants={setParticipants}
            person={person}
            setPerson={setPerson}
            showScoreBox={helpers.showScoreBox}
            showDeleteBox={helpers.showDeleteBox}
            pointType={pointType}
            setPointType={setPointType}
        />

        <AsideLeft />
        <AsideRight />

        <DarkBackground />
        <BoxName
            close={helpers.close}
            submitName={helpers.submitName}
            participants={participants}
            setParticipants={setParticipants}
            person={person}
            setPerson={setPerson}
        />

        <BoxScore
            close={helpers.close}
            submitScore={helpers.submitScore}
            participants={participants}
            setParticipants={setParticipants}
            person={person}
            setPerson={setPerson} // value set when showScoreBox() executed 
            pointType={pointType} // value set when showScoreBox() executed
        />

        <BoxDelete
            close={helpers.close}
            deleteName={helpers.deleteName}
            participants={participants}
            setParticipants={setParticipants}
            person={person}
            setPerson={setPerson} // value set when showDeleteBox() executed
        />

    </div>
  );
}

export default App;
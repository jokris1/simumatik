const base = "http://localhost:5000";

const helpers = {
    
    handleNetworkErrors: function(response) {
        // network error code
        if (!response.ok) throw new Error(response.status);

        return response;
    },

    showNameBox: function() {
        // add person button
        let darkbg = document.getElementsByClassName("DarkBackground")[0];
        darkbg.style.visibility = "visible";
        
        let nameBox = document.getElementsByClassName("BoxName")[0];
        nameBox.style.visibility = "visible";
    },

    showScoreBox: function(pointType, pointTypeState, setPointType, person, personState, setPerson) {
        // score box
        let darkbg = document.getElementsByClassName("DarkBackground")[0];
        darkbg.style.visibility = "visible";
        
        let scoreBox = document.getElementsByClassName("BoxScore")[0];
        scoreBox.style.visibility = "visible";

        // set state variables clicked person and point type for submitScore()
        setPerson(personState = person) // {id, name, wins, losses}
        setPointType(pointTypeState = pointType) // wins/losses
    },

    showDeleteBox: function(person, personState, setPerson) {
        // delete box
        let darkbg = document.getElementsByClassName("DarkBackground")[0];
        darkbg.style.visibility = "visible";
        
        let deleteBox = document.getElementsByClassName("BoxDelete")[0];
        deleteBox.style.visibility = "visible";

        // set state variables clicked person and point type for deleteName()
        setPerson(personState = person) // {id, name, wins, losses}
    },

    close: function() {
        // hide boxes and cleanup input 
        let darkbg = document.getElementsByClassName("DarkBackground")[0];
        let scoreBox = document.getElementsByClassName("BoxScore")[0];
        let nameBox = document.getElementsByClassName("BoxName")[0];
        let deleteBox = document.getElementsByClassName("BoxDelete")[0];
        let input = nameBox.querySelectorAll("input")[0];

        input.value = '';
        darkbg.style.visibility = "hidden";
        nameBox.style.visibility = "hidden";
        scoreBox.style.visibility = "hidden";
        deleteBox.style.visibility = "hidden";
    },

    getParticipants: async function(participantsState, setParticipants) {
        let names;

        try {
            await fetch(`${base}/names`)
            .then(response => response.json())
            .then(data => {
                names = data[0].participants;
                setParticipants(participantsState = names);
            })
        } catch {
            console.log("data couldn't be collected")
            return

        } finally {

        }

        // return after awaiting fetch
        return names
    },

    submitName: async function(participantsState, setParticipants) {
        let body;

        try {
            // get input value
            let input = document.getElementsByClassName("BoxName")[0].querySelectorAll("input")[0];

            // specify data to submit
            body = {
                name: input.value,
                wins: "0",
                losses: "0"
            };

            await fetch(`${base}/names/add`, {
                method: 'post',
                //in order to show data in backend:
                body: JSON.stringify(body),
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .catch((error) => {console.log(error)})
            .then(response => response.json())
            .then(data => {
                let names = data.result.value.participants;
                console.log(names);
                console.log(participantsState);
                console.log(setParticipants)
                setParticipants(participantsState = names);
            })

        } catch {
            console.log("no data was inserted")

        } finally {

        }
    },

    submitScore: async function(person, pointType, participantsState, setParticipants) {

        try {
            // add extra win or loss to person object
            pointType === "wins" ? person.wins++ : person.losses++;

            await fetch(`${base}/names/update`, {
                method: 'post',
                //in order to show data in backend:
                body: JSON.stringify(person),
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .catch((error) => {console.log(error)})
            .then(response => response.json())
            .then(data => {
                console.log("hej")
                console.log(data);
                let names = data.result.value.participants;

                setParticipants(participantsState = names);
            })

        } catch {
            console.log("no data was updated")

        } finally {

        }

    },

    deleteName: async function(person, participantsState, setParticipants) {

        try {
            await fetch(`${base}/names/delete`, {
                method: 'post',
                //in order to show data in backend:
                body: JSON.stringify(person),
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .catch((error) => {console.log(error)})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let names = data.result.value.participants;

                setParticipants(participantsState = names);
            })

        } catch {
            console.log("no data was deleted")

        } finally {

        }
    },

}

export default helpers;
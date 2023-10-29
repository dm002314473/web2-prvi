import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Schedule from './Schedule';

function UnosIObrada() {
    const { isAuthenticated } = useAuth0();
    
    const [state, setState] = useState({
        competitors: ''
    });

    const [showSchedule, setShowSchedule] = useState(false);

    const navigate = useNavigate();

    const getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setState(prevState => ({
            ...prevState,
            [name]: value
        })); 
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const modifiedCompetitors = state.competitors.replace(/\n/g, '-');
        setShowSchedule(true);
        navigate(`/Schedule/${state.name}/${modifiedCompetitors}/${state.sport}`);
    };
    
    return (
        isAuthenticated && (
        <div>
            <form action="">
                <div>
                    <label>Competiton name:</label>
                    <input type="text" onChange={ getValue } name = 'name'/>
                </div>
                <br/>
                <div>
                    <label>Competitors:</label>
                    <textarea onChange={ getValue } name = 'competitors'/>
                </div>
                <br/>
                <div>
                    <label>Sport:</label><br/>
                    <input type="radio" onChange={getValue} name="sport" value="Football 3-1-0" /> Nogomet 3/1/0
                </div>
                <div>
                    <input type="radio" onChange={getValue} name="sport" value="Basketball 2-0-1" /> Košarka 2/0/1
                </div>
                <div>
                    <input type="radio" onChange={getValue} name="sport" value="Chess 1-0.5-0" /> Šah 1/0.5/0
                </div>

                <button onClick={ handleSubmit }>Submit</button>
            </form>
            {showSchedule && <Schedule name={state.name} competitors={state.competitors} sport={state.sport} />}
        </div>
        )
    )
};

export default UnosIObrada;

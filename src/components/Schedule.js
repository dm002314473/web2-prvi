import { useParams } from "react-router";
import React, { useState } from "react";

function Schedule() {
    const { name, competitors, sport } = useParams();

    const splitCompetitors = () => {
        if (competitors) {
            const competitorsArray = competitors.split('-');
            return competitorsArray;
        }
        return [];
    };
    const competitorsArray = splitCompetitors();

    const [results, setResults] = useState(Array(competitorsArray.length).fill(""));

    const [standings, setStandings] = useState([]);

    function handleResultChange(matchIndex, result) {
        const newResults = [...results];
        newResults[matchIndex] = result;
        setResults(newResults);
    };

    const postData = async () => {
        const data = {
          field1: 'value1',
          field2: 'value2',
          field3: 'value3',
        };
      
        try {
          const response = await fetch('http://192.168.1.26:5000/insert-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (response.ok) {
            console.log('Data inserted successfully');
          } else {
            console.error('Error:', response.statusText);
          }
        } catch (error) {
        console.error('Error:', error);
        }
      };

    const competitorsInOrder = [];

    const createSchedule = (competitors) => {
        const schedule = [];

        if (competitors.length % 2 !== 0) {
            competitors.push('X');
        }

        const rounds = competitors.length - 1;

        for (let i = 0; i < rounds; i++) {
            const round = [];

            for (let j = 0; j < competitors.length / 2; j++) {
                const match = {
                    competitor1: competitors[j],
                    competitor2: competitors[competitors.length - 1 - j],
                };
                competitorsInOrder.push(competitors[j]);
                competitorsInOrder.push(competitors[competitors.length - 1 - j]);
                round.push(match);
            }

            schedule.push(round);

            competitors.splice(1, 0, competitors.pop());
        }

        return schedule;
    };

    const handleCalculateStandings = () => {
        const sportData = sport.split(' ');
        const scoringCriteria = sportData[1].split('-').map(parseFloat);

        const arrayWithPoints = [];
        for (let i = 0; i < competitorsArray.length; i++) {
            const teamObject = {
              name: competitorsArray[i],
              points: 0
            };
            arrayWithPoints.push(teamObject);
          }

        const points = (result1, result2) => {
            if (result1 > result2) return 1;
            if (result1 === result2) return 2;
            return 3;
        };

        for(let i = 0; i < arrayWithPoints.length; i++) {
            arrayWithPoints[i].points = 0;
        }

        const calculatedStandings = () => {
            for(let i = 0; i < results.length; i += 2) {
                const result1 = parseFloat(results[i]);
                const result2 = parseFloat(results[i + 1]);
                const totalPoints1 = scoringCriteria[points(result1, result2) - 1];
                const totalPoints2 = scoringCriteria[3 - points(result1, result2)];
                for(let j = 0; j < competitorsArray.length; j++) {
                    if(arrayWithPoints[j].name === competitorsInOrder[i]) {
                        arrayWithPoints[j].points += totalPoints1;
                    }
                    if(arrayWithPoints[j].name === competitorsInOrder[i + 1]) {
                        arrayWithPoints[j].points += totalPoints2;
                    }
                }
            }

            postData();
            
            return arrayWithPoints;
    };
    
    const standings = calculatedStandings();
    standings.sort((a, b) => b.points - a.points);
    setStandings(standings);
    };

    const roundSchedule = createSchedule(competitorsArray);

    return (
        <div>
            <br/><br/>
            <label>Schedule for {name}:</label><br />
            <table align="center">
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Match</th>
                        <th>Competitor 1</th>
                        <th>Competitor 2</th>
                    </tr>
                </thead>
                <tbody>
            {roundSchedule.map((round, roundIndex) => (
                round.map((match, matchIndex) => {
                    const totalMatchIndex = roundIndex * roundSchedule[0].length + matchIndex;
                    return (
                        <tr key={totalMatchIndex}>
                            {matchIndex === 0 && (
                                <td rowSpan={round.length}>
                                    Round {roundIndex + 1}
                                </td>
                            )}
                            <td>{totalMatchIndex + 1}</td>
                            <td>{match.competitor1}</td>
                            <td>{match.competitor2}</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Result 1"
                                    value={results[2 * totalMatchIndex]}
                                    onChange={(e) => handleResultChange(2 * totalMatchIndex, e.target.value)}
                                />
                                :
                                <input
                                    type="text"
                                    placeholder="Result 2"
                                    value={results[2 * totalMatchIndex + 1]}
                                    onChange={(e) => handleResultChange(2 * totalMatchIndex + 1, e.target.value)}
                                />
                            </td>
                        </tr>
                    );
                })
            ))}
        </tbody>
            </table>
            <br/>
            <button onClick={handleCalculateStandings}>Standings</button>
            <table align="center">
    <thead>
        <tr>
            <th>Competitor</th>
            <th>Points</th>
        </tr>
    </thead>
    <tbody>
        {standings && standings.map((standing, index) => (
            <tr key={index}>
                <td>{standing.name}</td>
                <td>{standing.points}</td>
            </tr>
        ))}
    </tbody>
</table>
        </div>
    );
}

export default Schedule;

import { useState, useEffect } from "react";
import axios from 'axios'; 

// CORS 
//
export default function APIs() {
    const baseUrl1 = "http://localhost:5000/";
    const [idea, setIdea] = useState(null);

    useEffect(() => {
        axios.get(baseUrl1).then((response) => {
            console.log(response.data)
            setIdea(response.data)
        }).catch((error) => {
            console.log(error) // FIXME  time out/interval(JS) 
        });

    }, []); // empty array means only run once
    

    // .get()
    //        => asyn
    if (!idea) 
        return null;


    // TODO     when to get return value from flask application
    return (
        <div>
            <ul>
                <li>id: {idea.id}</li>
                <li>proposer: {idea.proposer}</li>
                <li>title: {idea.title}</li>
                <li>vote: {idea.vote}</li>
            </ul>
        </div>
    )

    

    /*
    reponse
    data:[{"key": , "title": , "content": , "proposer": , "vote": }, {}]

    status code: 200


    */
}
    
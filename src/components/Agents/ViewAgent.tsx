import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState, Fragment } from 'react';
import type { FC } from "react";
import { IAgent } from "../../types/Agent";
import axios from "axios";
import './Agent.css';

const ViewAgent: FC = () => {
    const  agentId = useParams().id;
    const [newReview, setNewReview] = useState<String>("");
    const [reviews, setReviews] = useState<Array<String>>([]);
    const [agentData, setAgentData] = useState<IAgent>({
        id: '',
        firstName : '',
        lastName : '',
        photoUrl : '',
        agentLicence : '',
        address : '',
        practiceAreas :'',
        aboutMe : ''
    });

    const {
        id,
        firstName,
        lastName,
        photoUrl,
        agentLicence,
        address,
        practiceAreas,
        aboutMe
    } = agentData;

    //While starting, get this agent Data from server.
    useEffect(() => {
        async function getAgentData() {
            try {
            const response = await axios.get(`/review/${agentId}`);
            setAgentData(response.data);
            const tReviews = response.data.reviews.split(':');
            setReviews(tReviews);
            } catch (err) {
                console.log(err);
                alert('Server have a problem or you are not connected to network');
            }
        }
        getAgentData();
      }, []);
    
    //Here, give review about this agent to server. 
    const giveReview = () => {
        async function subGiveReview() {
            try {
                const response = await axios.post(`/review/${agentId}`, {newReview});
                setNewReview('');
                setReviews([...reviews, newReview]);
            } catch (err) {
                console.log(err);
                alert('Server have a problem or you are not connected to network');
            }
        }
        subGiveReview();
    }
    return (
        <div className="panel">
            <div className="inputReview">
                <div className="inputGroup">
                    <div className="profile">
                        <div className="avatar-holder">
                            <img src="http://localhost:3001/avatar" className="avatar" alt={firstName} />
                        </div>
                        <div className="ava" >
                            <input className="first" value={`${firstName} ${lastName}`} readOnly/>
                            <input className="first" value={address} readOnly/>
                            <input className="first" value={agentLicence} readOnly/>
                            <input className="first" value={practiceAreas} readOnly/>
                        </div>
                    </div>
                </div>
                <textarea className="textarea" placeholder="Input Text" onChange={(e) => setNewReview(e.target.value)}>{newReview}</textarea>
                <button className="rate" onClick={giveReview}>Give Review</button>
            </div>
            {reviews.map((review) => (
                <div>
                    <div className="review">
                        <div className="reviewContainer">
                            <label>{review}</label>
                        </div>
                    </div>
                    <hr/>
                </div>
            ))}        
        </div>
    );
};

export default ViewAgent;
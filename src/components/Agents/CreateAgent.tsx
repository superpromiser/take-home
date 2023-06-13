import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, Fragment } from 'react';
import type { FC } from "react";
import { AgentData } from "../../types/agentData";
import axios from "axios";

const CreateAgent: FC = (history) => {
    const navigate = useNavigate();
    const [agentData, setAgentData] = useState<AgentData>({
        firstName : '',
        lastName : '',
        photoUrl : '',
        agentLicence : '',
        address : '',
        practiceAreas :'',
        aboutMe : ''
    });

    const {
        firstName,
        lastName,
        photoUrl,
        agentLicence,
        address,
        practiceAreas,
        aboutMe
    } = agentData;

    const onChange = (e : any) =>
        setAgentData({ ...agentData, [e.target.name]: e.target.value });
    const onSubmit = (e : any) => {
        e.preventDefault();
        async function submitData() {
            try {
                const response = await axios.post("/jointeam", agentData);
                navigate('/', { replace: true });
            }catch (err) {
                console.log(err);
                alert('Server have a problem or you are not connected to network');
            }
        }
        submitData();
    };
    return (
        <div className='panel'>
            <h1 className='large text-primary'>Write Agent's profile</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='First Name'
                        name='firstName'
                        value={firstName}
                        onChange={e => onChange(e)}
                        required
                    />
                    <small className='form-text'>
                        Input your First Name
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Last Name'
                        name='lastName'
                        value={lastName}
                        onChange={e => onChange(e)}
                        required                        
                    />
                    <small className='form-text'>
                        Input your Last Name
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Photo'
                        name='photoUrl'
                        value={photoUrl}
                        onChange={e => onChange(e)}
                        required                        
                    />
                    <small className='form-text'>
                        Input your Photo
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Agent Licence'
                        name='agentLicence'
                        value={agentLicence}
                        onChange={e => onChange(e)}
                        required                        
                    />
                    <small className='form-text'>
                        Input your Agent Licence
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Address'
                        name='address'
                        value={address}
                        onChange={e => onChange(e)}
                        required                        
                    />
                    <small className='form-text'>
                        Input your Address
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Practice Areas'
                        name='practiceAreas'
                        value={practiceAreas}
                        onChange={e => onChange(e)}
                        required                        
                    />
                    <small className='form-text'>
                        Input your Practice Areas
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='About'
                        name='aboutMe'
                        value={aboutMe}
                        onChange={e => onChange(e)}
                        required                        
                    />
                    <small className='form-text'>
                        Input your about me
                    </small>
                </div>
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/'>
                    Go Back
                </Link>
            </form>
        </div>
  );
};

export default CreateAgent;
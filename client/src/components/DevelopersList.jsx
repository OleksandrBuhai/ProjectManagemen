import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_DEVS } from '../queries/developerQueries';
import { Link } from 'react-router-dom';


const DevelopersList = () => {
    const { loading, error, data } = useQuery(GET_DEVS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const developers = data.developers;

    console.log(developers)

    return (
        <div>
            <h2>All Developers</h2>
            <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
                Back
            </Link>
            
            <ul>
                {developers.map((developer) => (
                    <li key={developer.id}>
                        <strong>{developer.name}</strong> - {developer.position}
                        {!developer.projectId ? <p>free</p> : <strong>{developer.projectId}</strong>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DevelopersList;

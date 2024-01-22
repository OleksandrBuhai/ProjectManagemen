import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_DEVS } from '../queries/developerQueries';
import { GET_PROJECTS } from '../queries/projectsQueries';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { REMOVE_DEVS } from '../mutation/developerMutation';
import AddDeveloperModal from './AddDeveloperModal';



const DevelopersList = () => {


    const { loading, error, data } = useQuery(GET_DEVS);
    const { loading: projectLoading, error: projectError, data: projectData } = useQuery(GET_PROJECTS);


    const [filters, setFilters] = useState({
        position: 'all',
        showUnassigned: false,
        title: 'all',
    });


    const [deleteDev] = useMutation(REMOVE_DEVS, {
        refetchQueries: [{ query: GET_DEVS }],
    });

    const handleDeleteDeveloper = (id) => {

        deleteDev({ variables: { id } })

    };


    if (loading || projectLoading) return <p>Loading...</p>;
    if (error || projectError) return <p>Error: {error ? error.message : projectError.message}</p>;


    const developers = data.developers;
    const projects = projectData.projects;

    const filteredDevelopers = developers.filter(developer => {
        const positionCondition = filters.position === 'all' || developer.position === filters.position;
        const unassignedCondition = filters.showUnassigned ? !developer.projectId : true;
        const titleCondition = filters.title === 'all' || developer.title === filters.title;
        return positionCondition && unassignedCondition && titleCondition;
    });

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
    };

    const handleClearFilters = () => {

        handleFilterChange('position', 'all');
        handleFilterChange('title', 'all');
        handleFilterChange('showUnassigned', false);

    };

    return (
        <div>
            <div>

                <h2>All Developers</h2>
                <AddDeveloperModal />
                <Link to='/' className='btn btn-black mx-2'>
                    Back
                </Link>
            </div>
            <div className='my-5' >
                <form style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            id="filterFrontend"
                            className="form-check-input"
                            checked={filters.position === 'frontend'}
                            onChange={() => handleFilterChange('position', filters.position === 'frontend' ? 'all' : 'frontend')}
                        />
                        <label htmlFor="filterFrontend" className="form-check-label">Front End</label>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            id="filterBackend"
                            className="form-check-input"
                            checked={filters.position === 'backend'}
                            onChange={() => handleFilterChange('position', filters.position === 'backend' ? 'all' : 'backend')}
                        />
                        <label htmlFor="filterBackend" className="form-check-label">Back End</label>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            id="filterDesign"
                            className="form-check-input"
                            checked={filters.position === 'design'}
                            onChange={() => handleFilterChange('position', filters.position === 'design' ? 'all' : 'design')}
                        />
                        <label htmlFor="filterDesign" className="form-check-label">UI/UX Design</label>
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            id="filterJunior"
                            className="form-check-input"
                            checked={filters.title === 'junior'}
                            onChange={() => handleFilterChange('title', filters.title === 'junior' ? 'all' : 'junior')}
                        />
                        <label htmlFor="filterJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            id="filterMiddle"
                            className="form-check-input"
                            checked={filters.title === 'middle'}
                            onChange={() => handleFilterChange('title', filters.title === 'middle' ? 'all' : 'middle')}
                        />
                        <label htmlFor="filterMiddle" className="form-check-label">Middle</label>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            id="filterSenior"
                            className="form-check-input"
                            checked={filters.title === 'senior'}
                            onChange={() => handleFilterChange('title', filters.title === 'senior' ? 'all' : 'senior')}
                        />
                        <label htmlFor="filterSenior" className="form-check-label">Senior</label>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            id="showUnassigned"
                            className="form-check-input"
                            checked={filters.showUnassigned}
                            onChange={() => handleFilterChange('showUnassigned', !filters.showUnassigned)}
                        />
                        <label htmlFor="showUnassigned" className="form-check-label">Unassigned Developers</label>
                    </div>

                </form>
                <button type="button" className="btn btn-secondary" onClick={handleClearFilters}>
                    Clear Filters
                </button>
            </div>

            <table className='table table-hover mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>eMail</th>
                        <th>Position</th>
                        <th>Title</th>
                        <th>Project</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDevelopers.map((developer) => (
                        <tr key={developer.id}>
                            <td><strong>{developer.name}</strong></td>
                            <td><strong>{developer.phone}</strong></td>
                            <td><strong>{developer.email}</strong></td>
                            <td>{developer.position}</td>
                            <td>{developer.title}</td>
                            <td>
                                {!developer.projectId ? <p>free</p> : (
                                    <strong>
                                        {projects.map((project) => (
                                            project.id === developer.projectId ? project.name : null
                                        ))}
                                    </strong>
                                )}

                            </td>
                            <td>
                                <button className='btn btn-danger btn-sm' onClick={() => handleDeleteDeveloper(developer.id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
        </div>
    );
};

export default DevelopersList;

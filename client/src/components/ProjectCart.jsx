import React from 'react'
import { useState } from 'react';


export default function ProjectCard({ project }) {

    const [showDeveloperModal, setShowDeveloperModal] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState(null);

    const handleShowDeveloperModal = (developer) => {
        setSelectedDeveloper(developer);
        setShowDeveloperModal(true);
    };

    const handleCloseDeveloperModal = () => {
        setSelectedDeveloper(null);
        setShowDeveloperModal(false);
    };

    return (
        <div className='col-md-6'>
            <div className='card mb-3'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h5 className='card-title'>{project.name}</h5>
                        <a className='btn btn-light' href={`/projects/${project.id}`}>
                            View
                        </a>
                    </div>
                    <p className='small'>
                        Status: <strong>{project.status}</strong>
                    </p>
                    <div>
                        Developers:
                        <ul>
                            <li>
                                <a
                                    href="#"
                                    onClick={() => handleShowDeveloperModal(project.frontendDeveloper)}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {project.frontendDeveloper.name}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={() => handleShowDeveloperModal(project.backendDeveloper)}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {project.backendDeveloper.name}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={() => handleShowDeveloperModal(project.designDeveloper)}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {project.designDeveloper.name}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {selectedDeveloper && showDeveloperModal && (
                    <div className='modal fade show' role='dialog' style={{ display: 'block' }}>
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title'>{selectedDeveloper.name}</h5>
                                    <button
                                        type='button'
                                        className='btn-close'
                                        onClick={handleCloseDeveloperModal}
                                    ></button>
                                </div>
                                <div className='modal-body'>
                                    <p>Phone: {selectedDeveloper.phone}</p>
                                    <p>Position: {selectedDeveloper.position}</p>
                                    <p>Title: {selectedDeveloper.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
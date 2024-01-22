import React, { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutation/projectMutation';
import { GET_PROJECTS } from '../queries/projectsQueries';
import { GET_CLIENTS } from '../queries/clientsQueries';
import { GET_FRONTEND_DEVS, GET_BACKEND_DEVS, GET_DESIGN_DEVS } from '../queries/developerQueries';

export default function AddProjectModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [frontendDeveloperId, setFrontendDeveloperId] = useState('');
  const [backendDeveloperId, setBackendDeveloperId] = useState('');
  const [designDeveloperId, setDesignDeveloperId] = useState('');

  const [status, setStatus] = useState('new');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name,
      description,
      status,
      clientId,
      frontendDeveloperId,
      backendDeveloperId,
      designDeveloperId,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    }
  });


  const { loading: clientLoading, error: clientError, data: clientData } = useQuery(GET_CLIENTS);

  const { loading: frontendDevLoading, error: frontendDevError, data: frontendDevData } = useQuery(GET_FRONTEND_DEVS, {
    variables: { position: 'Front End' },
  });

  const { loading: backendDevLoading, error: backendDevError, data: backendDevData } = useQuery(GET_BACKEND_DEVS, {
    variables: { position: 'Back End' },
  });
  
  const { loading: designDevLoading, error: designDevError, data: designDevData } = useQuery(GET_DESIGN_DEVS, {
    variables: { position: 'UI/UX Design' },
  });


  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addProject({
        variables: {
          name,
          description,
          status,
          clientId,
          frontendDeveloperId,
          backendDeveloperId,
          designDeveloperId,
        },
      });

      setName('');
      setDescription('');
      setStatus('new');
      setClientId('');
      setFrontendDeveloperId('');
      setBackendDeveloperId('');
      setDesignDeveloperId('');

    } catch (error) {
      console.error('Mutation Error:', error.message);

    }
  };



  if (clientLoading || frontendDevLoading || backendDevLoading || designDevLoading) return null;
  if (clientError || frontendDevError || backendDevError || designDevError) return 'Something Went Wrong';


  const filterDevelopersWithoutProject = (developers) => {
    return developers.filter((dev) => !dev.projectId);
  };
  return (
    <>
      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#addProjectModal'
      >
        <div className='d-flex align-items-center'>
          <FaList className='icon' />
          <div>New Project</div>
        </div>
      </button>
      <div
        className='modal fade'
        id='addProjectModal'
        aria-labelledby='addProjectModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addProjectModalLabel'>
                New Project
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit} className='row'>
                <div className='col-md-6'>
                  <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <input
                      type='text'
                      className='form-control'
                      id='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Description</label>
                    <textarea
                      className='form-control'
                      id='description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='mb-3'>
                    <label className='form-label'>Status</label>
                    <select
                      id='status'
                      className='form-select'
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value='new'>Not Started</option>
                      <option value='progress'>In Progress</option>
                      <option value='completed'>Completed</option>
                    </select>
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Client</label>
                    <select
                      id='clientId'
                      className='form-select'
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                    >
                      <option value=''>Select Client</option>
                      {clientData.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Developer</label>
                    {frontendDevData && (
                      <>
                        <select
                          id='frontendDeveloperId'
                          className='form-select'
                          value={frontendDeveloperId}
                          onChange={(e) => setFrontendDeveloperId(e.target.value)}
                        >
                          <option value=''>Select Frontend Developer</option>
                          {frontendDevData.developers
                            .filter(dev => !dev.projectId)
                            .map((dev) => (
                              <option key={dev.id} value={dev.id}>
                                {dev.name}
                              </option>
                            ))}
                          {frontendDevData.developers.every(dev => dev.projectId) && (
                            <option disabled>No available developers</option>
                          )}
                        </select>
                      </>
                    )}
                    {backendDevData && (
                      <>
                        <select
                          id='backendDeveloperId'
                          className='form-select'
                          value={backendDeveloperId}
                          onChange={(e) => setBackendDeveloperId(e.target.value)}
                        >
                          <option value=''>Select Backend Developer</option>
                          {backendDevData.developers
                            .filter(dev => !dev.projectId)
                            .map((dev) => (
                              <option key={dev.id} value={dev.id}>
                                {dev.name}
                              </option>
                            ))}
                          {backendDevData.developers.every(dev => dev.projectId) && (
                            <option disabled>No available developers</option>
                          )}
                        </select>
                      </>
                    )}
                    {designDevData && (
                      <>
                        <select
                          id='designDeveloperId'
                          className='form-select'
                          value={designDeveloperId}
                          onChange={(e) => setDesignDeveloperId(e.target.value)}
                        >
                          <option value=''>Select Design Developer</option>
                          {designDevData.developers
                            .filter(dev => !dev.projectId)
                            .map((dev) => (
                              <option key={dev.id} value={dev.id}>
                                {dev.name}
                              </option>
                            ))}
                          {designDevData.developers.every(dev => dev.projectId) && (
                            <option disabled>No available developers</option>
                          )}
                        </select>
                      </>
                    )}
                  </div>
                </div>
                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className='btn btn-primary'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

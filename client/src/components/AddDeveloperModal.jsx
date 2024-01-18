import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Spinner from './Spinner';
import { GET_DEVS } from '../queries/developerQueries';

export default function AddDeveloperModal() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const { loading, error, data } = useQuery(GET_DEVS);

  const onSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addProject(name, description, clientId, status);

  
    setName('');
    setTitle('');
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <form onSubmit={onSubmit}>
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
        <label className='form-label'>Title</label>
        <input
          type='text'
          className='form-control'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Client</label>
        <select
          id='clientId'
          className='form-select'
          value='test' 
        >
          <option value=''>Select Client</option>
          {data.developers.map((developer) => (
            <option key={developer.id} value={developer.id}>
              {developer.name}
            </option>
          ))}
        </select>
      </div>
      <button type='submit' data-bs-dismiss='modal' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
}

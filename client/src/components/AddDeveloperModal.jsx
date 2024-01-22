import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Spinner from './Spinner';
import { GET_DEVS } from '../queries/developerQueries';
import { ADD_DEVS } from '../mutation/developerMutation';
import { FaList } from 'react-icons/fa';


export default function AddDeveloperModal() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('')

  const { loading, error, data } = useQuery(GET_DEVS);


  const [addDeveloper] = useMutation(ADD_DEVS, {
    refetchQueries: [{ query: GET_DEVS }],
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {

      const { data: { addDeveloper: newDeveloper } } = await addDeveloper({
        variables: {
          name,
          phone,
          email,
          position,
          title,
          projectId,

        },
      });

      console.log('New Developer:', newDeveloper);

      setName('');
      setPhone('');
      setEmail('');
      setPosition('');
      setTitle('');
      setProjectId()
    } catch (error) {
      console.error('Error adding developer:', error.message);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>

      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#addDeveloperModal'
      >
        <div className='d-flex align-items-center'>
          <FaList className='icon' />
          <div>Add Developer</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addDeveloperModal'
        aria-labelledby='addDeveloperModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addProjectModalLabel'>
                New Developer
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>

              <form onSubmit={onSubmit}>

                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    type='text'
                    className='form-control'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    type='text'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Position</label>
                  <select
                    className='form-select'
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value=''>Select Position</option>
                    <option value='frontend'>Front End</option>
                    <option value='backend'>Back End</option>
                    <option value='design'>UI/UX Design</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Title</label>
                  <select
                    className='form-select'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  >
                    <option value=''>Select Title</option>
                    <option value='junior'>Junior</option>
                    <option value='middle'>Middle</option>
                    <option value='senior'>Senior</option>
                  </select>
                </div>
                <button type='submit' className='btn btn-primary'>
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

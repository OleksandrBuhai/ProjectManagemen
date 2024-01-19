import React from 'react'
import Clients from '../components/Clients'
import AddCLientsModal from '../components/AddCLientsModal'
import Projects from '../components/Projects'
import AddProjectModal from '../components/AddProjectModal'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <div className='d-flex gap-3 mb-4'>
                <AddCLientsModal />
                <AddProjectModal />
                <Link to="/developers">
                    <button className="btn btn-primary">View Developers</button>
                </Link>
            </div>
            <div className='container'>
                <Projects />
                <hr />
                <Clients />
            </div>
        </>
    )
}

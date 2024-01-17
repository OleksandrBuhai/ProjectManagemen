import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_PROJECTS } from '../queries/projectsQueries'
import Spinner from './Spinner'
import ProjectCard from './ProjectCart'

export default function Projects() {

    const { loading, error, data } = useQuery(GET_PROJECTS)

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong</p>

    return (
        <>
            {data.projects.length > 0 ? (
                <div className='row mt-4'>
                    {data.projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <p>No Project</p>
            )}
        </>
    )
}
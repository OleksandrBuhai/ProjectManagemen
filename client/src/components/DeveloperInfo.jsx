import React from 'react'

export default function DeveloperInfo({ frontEnd, backEnd, design }) {

    console.log(frontEnd)

    return (
        <>
            <h5 className='mt-5'>Developers Information</h5>
            <table className='table table-hover mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{frontEnd.name}</td>
                        <td>{frontEnd.position}</td>
                        <td>{frontEnd.title}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>{backEnd.name}</td>
                        <td>{backEnd.position}</td>
                        <td>{backEnd.title}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>{design.name}</td>
                        <td>{design.position}</td>
                        <td>{design.title}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

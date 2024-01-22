import { gql } from "@apollo/client";



const GET_PROJECTS = gql`
    query getProjects {
        projects {
            id
            name
            status
            frontendDeveloper {
                id
                name
                position
                title
                phone 
                email
            }
            backendDeveloper {
                id
                name
                position
                title
                phone 
                email
            }
            designDeveloper {
                id
                name
                position
                title
                phone 
                email
            }
        }
    }
`

const GET_PROJECT = gql`
query getProject($id: ID!){
    project(id: $id) {
        id
        name
        description
        status
        client {
            id
            name
            email
            phone
        }
        frontendDeveloper {
            id
            name
            phone
            email
            position
            title
        }
        backendDeveloper {
            id
            name
            position
            title
        }
        designDeveloper {
            id
            name
            position
            title
        }
    
    }
}`


export { GET_PROJECTS, GET_PROJECT }
import { gql } from "@apollo/client";

const GET_DEVS = gql`
  query getDevelopers {
    developers {
      id
      name
      email
      phone
      position
      title
      projectId
    }
  }
`;


const GET_FRONTEND_DEVS = gql`
query getFront($position: String!) {
  developers(position: $position) {
    id
    name
    phone
    email
    projectId
  }
}
`;

const GET_BACKEND_DEVS = gql`
query getBack($position: String!) {
  developers(position: $position) {
    id
    name
    phone
    email
    projectId
  }
}
`;

const GET_DESIGN_DEVS = gql`
query getDesign($position: String!) {
  developers(position: $position) {
    id
    name
    phone
    email
    projectId
  }
}
`;

export { GET_DEVS, GET_FRONTEND_DEVS, GET_BACKEND_DEVS, GET_DESIGN_DEVS};

import { gql } from "@apollo/client";

const ADD_DEVS = gql`
  mutation AddDeveloper(
    $name: String!
    $position: DeveloperPosition!
    $title: DeveloperTitle!
    $email: String!
    $phone: String!
    
  ) {
    addDeveloper(
      name: $name
      position: $position
      title: $title
      email: $email
      phone: $phone
      
    ) {
      id
      name
      position
      title
      email
      phone
    
    }
  }
`;

const REMOVE_DEVS = gql`

  mutation DeleteDeveloper($id: ID!) {
    deleteDeveloper(id: $id) {
      id
    }
  }


`


export { ADD_DEVS, REMOVE_DEVS };

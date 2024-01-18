import { gql } from "@apollo/client";

const GET_DEVS = gql`
  query getDevelopers {
    developers {
      id
      name
      email
      phone
    }
  }
`;

export { GET_DEVS };

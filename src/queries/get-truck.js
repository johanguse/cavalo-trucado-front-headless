import { gql } from '@apollo/client';

export default gql`
  GET_VEHICLE($id: ID = "140") {
    vehicle(id: $id, idType: DATABASE_ID) {
      slug
      vehicleId
      vehicle_infos {
        vehicleModelName
        vehiclePrice
        vehicleYear
      }
    }
  }
`;
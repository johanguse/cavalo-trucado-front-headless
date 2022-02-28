import { gql } from '@apollo/client';

export default gql`
  {
    vehicles(where: {status: PUBLISH}, first: 10) {
      nodes {
        slug
        vehicleId
        vehicle_infos {
          vehicleModelName
          vehicleMainPhoto {
            sourceUrl(size: MEDIUM)
          }
        }
        brands {
          nodes {
            brandId
            name
          }
        }
      }
    }
  }
  `;
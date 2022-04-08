import { gql } from '@apollo/client';

export default gql`
  {
    vehicles(where: {status: PUBLISH}, first: 10) {
      nodes {
        slug
        vehicleId
        vehicle_infos {
          vehicleModelName
          vehiclePrice
          vehicleYear
          vehicleShortText1
          vehicleShortText2
          vehicleShortText3
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
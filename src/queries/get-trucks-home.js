import { gql } from '@apollo/client';

export default gql`
  {
    vehicles(where: {status: PUBLISH}, first: 10) {
      nodes {
        slug
        vehicleId
        vehicle_infos {
          vehicleModelName
          vehicleShortText1
          vehicleShortText2
          vehicleShortText3
          vehicleShowPrice
          vehiclePrice
          vehicleYear
          vehicleYearModel
          vehicleState
          vehicleKm
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
import { gql } from '@apollo/client';

export default gql`
query($slug: String = "") {
  vehicleBy(slug: $slug) {
    slug
    vehicleId
    vehicle_infos {
      vehicleModelName
      vehicleLongText
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
        sourceUrl(size: MEDIUM_LARGE)
      }
      vehiclePhotos {
        sourceUrl(size: THUMBNAIL)
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
`;
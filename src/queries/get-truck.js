import { gql } from '@apollo/client';

export default gql`
query($slug: String = "") {
  vehicleBy(slug: $slug) {
    slug
    vehicleId
    vehicle_infos {
      vehicleModelName
      vehicleMainPhoto {
        sourceUrl(size: MEDIUM)
      }
    }
    brands {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
}
`;
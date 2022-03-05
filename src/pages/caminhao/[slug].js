import client from "@/lib/apollo-client";
import { GET_TRUCK } from "@/queries/index";
function TruckPage({ data }) {

  console.log(data);

  const slug = data.vehicleBy.slug;

  //const { vehicle } = data || {}

  console.log(slug);

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      {data ? (
        <>
          <h3>{data.vehicleBy.vehicle_infos.vehicleModelName}</h3>
          <p>{data.vehicleBy.vehicleId}</p>
        </>
      ) : (
        null
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const { data } = await client.query({
    query: GET_TRUCK,
    variables: {
      slug: slug
    },
  });

  return {
    props: {
      data
    },
  };
}



export default TruckPage
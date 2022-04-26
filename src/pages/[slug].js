import Head from "next/head";
import client from "@/lib/apollo-client";
import { GET_TRUCK } from "@/queries/index";
import Navbar from "@/components/Navbar";
function TruckPage({ data }) {
  const slug = data.vehicleBy.slug;

  return (
    <>
      <Head>
        <title>Cavalo Trucado - Compra e venda de caminhões</title>
        <meta name="description" content="Especializado na compra e venda de caminhões em todo Brasil." />
        <meta name="keywords" content="compra, venda, caminhões, carretas, cavalos" />
      </Head>
      <Navbar />
      {data ? (
        <main className="flex flex-col items-center justify-center flex-1 w-full px-2 py-8 mx-auto bg-gray-100 max-w-7xl sm:px-6 lg:px-8">
          <div className="container w-full">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
              <div className="md:5/12 lg:w-5/12">
                aaaa
              </div>
              <div className="md:7/12 lg:w-6/12">
                <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">Nuxt development is carried out by passionate developers</h2>
                <p className="mt-6 text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
                <p className="mt-4 text-gray-600"> Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.</p>
              </div>
            </div>
          </div>

          <div className="container">
            <h3>{data.vehicleBy.vehicle_infos.vehicleModelName}</h3>
            <p>{data.vehicleBy.vehicleId}</p>
          </div>
        </main>
      ) : (
        null
      )}
    </>
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
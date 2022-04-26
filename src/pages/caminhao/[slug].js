import Head from "next/head";
import Image from "next/image";
import client from "@/lib/apollo-client";
import { GET_TRUCK } from "@/queries/index";
import Navbar from "@/components/Navbar";
function TruckPage({ data }) {
  const slug = data.vehicleBy.slug;
  const truckName = data.vehicleBy.vehicle_infos.vehicleModelName;
  const description = data.vehicleBy.vehicle_infos.vehicleLongText;
  const brandName = data.vehicleBy.brands.nodes[0].name;
  const showPrice = data.vehicleBy.vehicle_infos.vehicleShowPrice;
  const stateShort = data.vehicleBy.vehicle_infos.vehicleState[0];
  const state = data.vehicleBy.vehicle_infos.vehicleState[1];
  const year = data.vehicleBy.vehicle_infos.vehicleYear;
  const yearModel = data.vehicleBy.vehicle_infos.vehicleYearModel;
  const allPhotos = data.vehicleBy.vehicle_infos.vehiclePhotos;

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
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:gap-12">
              <div className="md:5/12 lg:w-5/12">
                <Image
                  className="rounded-lg"
                  src={data.vehicleBy.vehicle_infos.vehicleMainPhoto.sourceUrl}
                  alt={data.vehicleBy.vehicle_infos.vehicleModelName}
                  width="480"
                  height="560"
                  objectFit="cover"
                />
              </div>
              <div className="md:7/12 lg:w-6/12">
                <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">
                  <span>{brandName}</span>
                  <span className="ml-2 text-red-700">{truckName}</span>
                </h2>
                <div className="max-w-2xl mx-auto">
                  <div
                    className="mt-6 text-gray-600"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              </div>
            </div>
          </div>

          {allPhotos ? (
            <div className="container">
              {allPhotos.map((photoItem, index) => {
                return (
                  <div key={index} className="whatever">
                    <Image
                      className="rounded-lg"
                      src={photoItem.sourceUrl}
                      width="200"
                      height="200"
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            null
          )}
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
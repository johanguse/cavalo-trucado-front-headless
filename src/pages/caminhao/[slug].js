import Head from "next/head";
import Image from "next/image";
import client from "@/lib/apollo-client";
import { GET_TRUCK } from "@/queries/index";
import Navbar from "@/components/Navbar";
import IconPointMap from '../../assets/icon_mappoint.svg'
import { isNonEmptyArray } from "@apollo/client/utilities";
function TruckPage({ data }) {
  const slug = data.vehicleBy.slug;
  const truckName = data.vehicleBy.vehicle_infos.vehicleModelName;
  const description = data.vehicleBy.vehicle_infos.vehicleLongText;
  const brandName = data.vehicleBy.brands.nodes[0].name;
  const showPrice = data.vehicleBy.vehicle_infos.vehicleShowPrice;
  const price = data.vehicleBy.vehicle_infos.vehiclePrice;
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
      <div className="w-full bg-gray-50">
        <div className="container px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="py-3 space-y-6 text-xs text-gray-500 md:space-y-0">Caminhoes <span className="mx-2 text-sm">></span> {brandName} {truckName}</div>
        </div>
      </div>
      {data ? (
        <main className="w-full mb-5 bg-white border-t border-gray-200">
          <div className="container flex flex-col items-center justify-center flex-1 mx-auto bg-white max-w-7xl sm:px-6 lg:px-0">
            <div className="p-8 space-y-6 md:space-y-0 md:flex md:gap-6 lg:gap-12">
              <div className="md:5/12 lg:w-5/12">
                <Image
                  className="rounded-lg"
                  src={data.vehicleBy.vehicle_infos.vehicleMainPhoto.sourceUrl}
                  alt={data.vehicleBy.vehicle_infos.vehicleModelName}
                  width="480"
                  height="560"
                  layout="responsive"
                />
                {allPhotos ? (
                  <div className="flex gap-4 pl-5 mt-4 overflow-x-hidden lg:grid lg:grid-cols-3 lg:px-0">
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
              </div>
              <div className="md:7/12 lg:w-6/12">
                <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-4xl">
                  <span>{brandName}</span>
                  <span className="ml-2 text-red-700">{truckName}</span>
                </h1>

                <div className="mb-5 text-2xl">
                  {(showPrice != true || showPrice == null) ?
                    <p>{price.toLocaleString('pt-BR', { minimumFractionDigits: 3, style: 'currency', currency: 'BRL' }) || ''}</p>
                    :
                    <p>Valor sob consulta</p>
                  }
                </div>
                <div className="flex flex-row mr-3 text-gray-500">
                  <div className="pr-1 icon">
                    <Image src={IconPointMap} width="18" height="22" />
                  </div>
                  {(stateShort == null || stateShort == "NO") ?
                    <p>Brasil</p>
                    :
                    <p>{state} </p>
                  }
                </div>
                <div className="flex flex-row mt-5 text-xl text-gray-500 capitalize">
                  <span className="mr-2">{data.vehicleBy.vehicle_infos.vehicleShortText1}</span>
                  <span className="mr-2">{data.vehicleBy.vehicle_infos.vehicleShortText2}</span>
                  <span className="mr-2">{data.vehicleBy.vehicle_infos.vehicleShortText3}</span>
                </div>
                {(description != null || description === '') ?
                  <div className="mt-6">
                    <h6 className="mt-5 mb-3 text-lg font-bold lg:mb-5 lg:text-2xl">Descrição</h6>
                    <div
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{ __html: description }} />
                  </div>
                  : null
                }
                <div className="mt-14">
                  <h6 className="mt-5 mb-3 text-lg font-bold lg:mb-5 lg:text-2xl">Enviei uma menssagem</h6>
                  <form className="w-full">
                    <div className="flex flex-wrap mb-6 -mx-3">
                      <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                        <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-first-name">
                          First Name
                        </label>
                        <input className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                        <p className="text-xs italic text-red-500">Please fill out this field.</p>
                      </div>
                      <div className="w-full px-3 md:w-1/2">
                        <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-last-name">
                          Last Name
                        </label>
                        <input className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-100 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-6 -mx-3">
                      <div className="w-full px-3">
                        <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-password">
                          Email Address
                        </label>
                        <input className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="********@*****.**" />
                      </div>
                    </div>

                    <div className="flex flex-wrap mb-6 -mx-3">
                      <div className="w-full px-3">
                        <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-password">
                          Your Message
                        </label>
                        <textarea rows="10" className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500">

                        </textarea>
                      </div>
                      <div className="flex justify-between w-full px-3">
                        <div className="md:flex md:items-center">
                          <label className="block font-bold text-gray-500">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">
                              Send me your newsletter!
                            </span>
                          </label>
                        </div>
                        <button className="px-6 py-2 font-bold text-white bg-red-700 rounded shadow hover:bg-red-500 focus:shadow-outline focus:outline-none" type="submit">
                          Send Message
                        </button>
                      </div>

                    </div>

                  </form>
                </div>

              </div>

            </div>
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
import Head from "next/head";
import Image from "next/image";
import client from "@/lib/apollo-client";
import { GET_TRUCK } from "@/queries/index";
import Navbar from "@/components/Navbar";
import FormTruck from "@/components/FormTruck";
import IconPointMap from '@/assets/icon_mappoint.svg'
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
  const currentEncodeURI = encodeURIComponent(process.env.NEXT_PUBLIC_BASEURL + '/' + slug);

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
                  alt={truckName + " - " + brandName}
                  title={truckName + " - " + brandName}
                  width="480"
                  height="560"
                  layout="responsive"
                  loading="eager"
                  priority={true}
                />
                {allPhotos ? (
                  <div className="flex gap-4 pl-5 mt-4 overflow-x-hidden lg:grid lg:grid-cols-3 lg:px-0">
                    {allPhotos.map((photoItem, index) => {
                      return (
                        <div key={index}>
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
                    <Image src={IconPointMap} alt="Localização" width="18" height="22" />
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
                  <h6 className="mt-5 mb-1.5 text-lg font-bold lg:text-2xl">Vamos fechar negócio?</h6>
                  <p className="mb-8">Envie uma messagem pelo Whatsapp ou um contato via e-mail pelo formulário abaixo:</p>
                  <div className="w-full mb-14">
                    <div className="flex overflow-hidden rounded">
                      <a href={`https://api.whatsapp.com/send?phone=554796708959&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20${brandName}%20${truckName}%20Ano%20${year}%20${currentEncodeURI}`}
                        target="_blank"
                        className="block px-4 py-3 font-sans text-sm font-bold tracking-wide text-white uppercase transition duration-300 bg-green-700 shadow-border hover:bg-green-600">
                        Chamar no Whatsapp
                      </a>
                      <div className="p-3 bg-green-800 shadow-border">
                        <div className="w-4 h-4">
                          <svg className="text-white fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mb-10">
                    <h5 className="mb-1.5 text-lg">Enviar menssagem por e-mail</h5>
                    <p className="mb-5 text-xs text-gray-500">Campos com asteristico (*) são obrigatórios</p>
                    <FormTruck />
                  </div>
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
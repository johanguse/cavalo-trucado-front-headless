import React, { useState, useMemo } from 'react';
import FsLightbox from 'fslightbox-react';
import Head from 'next/head';
import Image from 'next/image';
import { getTruck } from '@/lib/rest/wordpress';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import FormTruck from '@/components/FormTruck';
import IconPointMap from '@/assets/icon_mappoint.svg';
import { data } from 'autoprefixer';

function TruckPage({ vehicle }) {
  const vehicleId = vehicle.id;
  const vehicleUrl = `/${encodeURIComponent(vehicle.slug)}`;
  const vehicleModelName = vehicle.vehicle_model_name;
  const km = vehicle.vehicle_km;
  const brandName = vehicle.brand;
  const showPrice = vehicle.vehicle_show_price;
  const price = vehicle.vehicle_price;
  const stateShort = vehicle.vehicle_state.value;
  const state = vehicle.vehicle_state.label;
  const year = vehicle.vehicle_year;
  const yearModel = vehicle.vehicle_year_model;
  const vehicleMainPhoto = vehicle.vehicle_main_photo;
  const description = vehicle.vehicle_long_text;
  const vehicleShortText1 = vehicle.vehicle_short_text_1;
  const vehicleShortText2 = vehicle.vehicle_short_text_2;
  const vehicleShortText3 = vehicle.vehicle_short_text_3;
  const vehicleShortTexts = [
    vehicleShortText1,
    vehicleShortText2,
    vehicleShortText3,
  ];
  const slug = vehicle.slug;
  const currentEncodeURI = encodeURIComponent(
    process.env.NEXT_PUBLIC_BASEURL + '/' + slug
  );

  const allPhotos = vehicle.photos;
  const [lightBoxSource, setlightBoxSource] = useState();

  useMemo(() => {
    if (allPhotos) {
      const urls = allPhotos.map((photo) => photo.sizes.large);
      setlightBoxSource(urls);
    }
  }, [allPhotos]);

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }

  const titlePage = `${vehicleModelName} - ${brandName} | Cavalo Trucado Caminhões`;
  const descriptionPage = `${brandName} - ${vehicleModelName} - ${year} - ${state}`;
  const breadcrumbText = `${brandName} - ${vehicleModelName}`;

  return (
    <>
      <Head>
        <title>{titlePage}</title>
        <meta name="description" content={descriptionPage} />
        <meta
          name="keywords"
          content="compra, venda, caminhões, carretas, cavalos"
        />
      </Head>
      <Navbar />
      <Breadcrumb
        BreadcrumbData={[
          {
            title: 'Caminhões',
            href: '/busca',
          },
          {
            title: breadcrumbText,
          },
        ]}
      />
      {vehicle && (
        <main className="w-full mb-5 bg-white">
          <div className="container flex flex-col items-center justify-center flex-1 mx-auto bg-white max-w-7xl sm:px-6 lg:px-0">
            <div className="p-8 space-y-6 md:space-y-0 md:flex md:gap-6 lg:gap-12">
              <div className="md:5/12 lg:w-5/12">
                <Image
                  className="rounded-lg"
                  src={vehicleMainPhoto}
                  alt={vehicleModelName + ' - ' + brandName}
                  title={vehicleModelName + ' - ' + brandName}
                  width="480"
                  height="560"
                  layout="responsive"
                  loading="eager"
                  priority={true}
                />
                {allPhotos ? (
                  <div className="grid grid-cols-3 gap-2 mt-4 overflow-x-hidden sm:gap-1 md:gap-2 lg:gap-4">
                    <FsLightbox
                      toggler={lightboxController.toggler}
                      sources={lightBoxSource}
                      slide={lightboxController.slide}
                      type="image"
                    />
                    {allPhotos.map((photoItem, index) => {
                      return (
                        <div
                          className="cursor-pointer"
                          key={index}
                          onClick={() => openLightboxOnSlide(index + 1)}
                        >
                          <Image
                            key={photoItem.url}
                            className="rounded-lg img-responsive"
                            src={photoItem.sizes.thumbnail}
                            width="300"
                            height="300"
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div className="md:7/12 lg:w-6/12">
                <h1 className="mb-4 text-2xl font-bold text-red-700 md:text-4xl">
                  <span>
                    {brandName} - {vehicleModelName}
                  </span>
                </h1>

                <div className="mb-5 text-2xl">
                  {showPrice != true || showPrice == null ? (
                    <h2>
                      R${' '}
                      {price?.toLocaleString('pt-BR', {
                        minimumFractionDigits: 3,
                        style: 'currency',
                        currency: 'BRL',
                      }) || ''}
                    </h2>
                  ) : (
                    <h2>Valor sob consulta</h2>
                  )}
                </div>
                <div className="flex flex-row mr-3 text-gray-500">
                  <div className="mr-6 year">
                    <h3>
                      Ano: {year} {yearModel && ' / ' + yearModel}
                    </h3>
                  </div>
                  <div className="flex flex-row text-gray-500">
                    <div className="pr-1 icon">
                      <Image
                        src={IconPointMap}
                        alt="Localização"
                        width="18"
                        height="22"
                      />
                    </div>
                    {stateShort == null || stateShort == 'NO' ? (
                      <p>Brasil (Consulte localização)</p>
                    ) : (
                      <p>{state}</p>
                    )}
                  </div>
                </div>
                {vehicleShortTexts && vehicleShortTexts.length > 0 ? (
                  <div className="flex flex-row mt-5 text-base text-gray-500 capitalize">
                    <ul className="flex flex-wrap items-center">
                      {vehicleShortTexts.map((vehicleShortText, index) => {
                        if (vehicleShortText == null) {
                          return null;
                        }
                        return (
                          <li
                            className={
                              'after:content-["-"] after:ml-2 mr-2 last:mr-0 last:after:content-[""]'
                            }
                            key={index}
                          >
                            {vehicleShortText}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
                {(description != null || description === '') && (
                  <div className="mt-6 mb-8">
                    <h4 className="mt-5 mb-3 text-lg font-bold lg:mb-5 lg:text-2xl">
                      Descrição
                    </h4>
                    <div
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </div>
                )}

                <div className="mt-14">
                  <h5 className="mt-5 mb-1.5 text-lg font-bold lg:text-2xl">
                    Vamos fechar negócio?
                  </h5>
                  <p className="mb-8">
                    Envie uma messagem pelo Whatsapp ou um contato via e-mail
                    pelo formulário abaixo:
                  </p>
                  <div className="w-full mb-14">
                    <div className="flex overflow-hidden rounded">
                      <a
                        href={`https://api.whatsapp.com/send?phone=554796708959&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20${brandName}%20${vehicleModelName}%20Ano%20${year}%20${currentEncodeURI}`}
                        target="_blank"
                        className="block px-4 py-3 font-sans text-sm font-bold tracking-wide text-white uppercase transition duration-300 bg-green-700 shadow-border hover:bg-green-600"
                      >
                        Chamar no Whatsapp
                      </a>
                      <div className="p-3 bg-green-800 shadow-border">
                        <div className="w-4 h-4">
                          <svg
                            className="text-white fill-current"
                            viewBox="0 0 448 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mb-10">
                    <h5 className="mb-1.5 text-lg">
                      Enviar menssagem por e-mail
                    </h5>
                    <p className="mb-5 text-xs text-gray-500">
                      Campos com asteristico (*) são obrigatórios
                    </p>
                    <FormTruck />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const vehicle = await getTruck(slug);

  return {
    props: {
      vehicle: vehicle.data,
    },
  };
}

export default TruckPage;

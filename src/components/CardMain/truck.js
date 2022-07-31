import Link from 'next/link';
import Image from 'next/image';
import IconPointMap from '@/assets/icon_mappoint.svg';

const Truck = ({ vehicle }) => {
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
  const vehicleShortText1 = vehicle.vehicle_short_text_1;
  const vehicleShortText2 = vehicle.vehicle_short_text_2;
  const vehicleShortText3 = vehicle.vehicle_short_text_3;

  return (
    <div
      key={vehicleId}
      class="col-span-1 flex flex-col transition duration-300 bg-white border border-gray-200 rounded-lg hover:shadow-md"
    >
      <div className="p-0">
        <Link href={vehicleUrl}>
          <div className="w-full cursor-pointer">
            {
              <Image
                className="rounded-t-lg"
                src={vehicleMainPhoto}
                alt={`${brandName} - ${vehicleModelName}`}
                title={`${brandName} - ${vehicleModelName}`}
                width="480"
                height="560"
                objectFit="cover"
              />
            }
          </div>
        </Link>
      </div>
      <div class="mb-1 px-4 flex flex-wrap">
        <div className="">
          <Link href={vehicleUrl}>
            <h2 className="mb-2 text-2xl cursor-pointer">
              <span>{brandName}</span>
              <span className="ml-2 text-red-700">{vehicleModelName}</span>
            </h2>
          </Link>
          <div className="price text-lg mb-1.5">
            {showPrice != true || showPrice == null ? (
              <p>
                R${' '}
                {price?.toLocaleString('pt-BR', {
                  minimumFractionDigits: 3,
                  style: 'currency',
                  currency: 'BRL',
                }) || ''}
              </p>
            ) : (
              <p>Valor sob consulta</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row px-4 text-xs text-gray-700 year-km">
        <div className="year mr-2.5">
          Ano: {year} {yearModel && ' / ' + yearModel}
        </div>
        <div className="km">km: {km}</div>
      </div>
      <div class="my-3 text-md px-4 flex flex-wrap justify-start text-xs text-gray-500 capitalize short-descritpions">
        <span className="mr-2">{vehicleShortText1}</span>
        <span className="mr-2">{vehicleShortText2}</span>
        <span className="mr-2">{vehicleShortText3}</span>
      </div>
      <div class="flex px-4 flex-wrap mt-auto py-1.5 text-xs border-t place-items-center text-gray-500 border-t-gray-100">
        <div className="pr-1 icon">
          <Image src={IconPointMap} alt="Localização" width="18" height="22" />
        </div>
        {stateShort == null || stateShort == 'NO' ? (
          <p>Brasil (Consulte localização)</p>
        ) : (
          <p>{state} </p>
        )}
      </div>
    </div>
  );
};

export default Truck;

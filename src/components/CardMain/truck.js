import Link from "next/link";
import Image from "next/image";
import IconPointMap from '@/assets/icon_mappoint.svg'

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
    <div key={vehicleId} className="transition duration-300 bg-white border border-gray-200 rounded-lg hover:shadow-md">
      <Link href={vehicleUrl}>
        <div className="w-full cursor-pointer">
          {<Image
            className="rounded-t-lg"
            src={vehicleMainPhoto}
            alt={`${brandName} - ${vehicleModelName}`}
            title={`${brandName} - ${vehicleModelName}`}
            width="480"
            height="560"
            objectFit="cover"
          />}
        </div>
      </Link>
      <div className="px-4 py-2">
        <Link href={vehicleUrl}>
          <h2 className="mb-2 text-2xl cursor-pointer">
            <span>{brandName}</span>
            <span className="ml-2 text-red-700">{vehicleModelName}</span>
          </h2>
        </Link>
        <div className="price mb-1.5">
          {(showPrice != true || showPrice == null) ?
            <p>R$ {price?.toLocaleString('pt-BR', { minimumFractionDigits: 3, style: 'currency', currency: 'BRL' }) || ''}</p>
            :
            <p>Valor sob consulta</p>
          }
        </div>
        <div className="flex flex-row justify-start mb-2 text-xs text-gray-500 capitalize short-descritpions">
          <span className="mr-2">{vehicleShortText1}</span>
          <span className="mr-2">{vehicleShortText2}</span>
          <span className="mr-2">{vehicleShortText3}</span>
        </div>
        <div className="flex flex-row mb-3 text-xs text-gray-700 year-km">
          <div className="year mr-2.5">Ano: {year} {yearModel && " / " + yearModel}</div>
          <div className="km">km: {km}</div>
        </div>
        <div className="flex flex-row pt-1.5 text-xs text-gray-500 border-t place-items-center state border-t-gray-100">
          <div className="pr-1 icon">
            <Image src={IconPointMap} alt="Localização" width="18" height="22" />
          </div>
          {(stateShort == null || stateShort == "NO") ?
            <p>Brasil</p>
            :
            <p>{state} </p>
          }
        </div>
      </div>
    </div >
  )
}

export default Truck;
import Link from "next/link";
import Image from "next/image";
import IconPointMap from '../../assets/icon_mappoint.svg'
import { BgCard, ImgCard, TextCard } from "./styles";

const Truck = ({ vehicle }) => {
  const brandName = vehicle.brands.nodes[0].name;
  const showPrice = vehicle.vehicle_infos.vehicleShowPrice;
  const stateShort = vehicle.vehicle_infos.vehicleState[0];
  const state = vehicle.vehicle_infos.vehicleState[1];
  const year = vehicle.vehicle_infos.vehicleYear;
  const yearModel = vehicle.vehicle_infos.vehicleYearModel;

  return (
    <BgCard key={vehicle.vehicleId}>
      <Link href={`/caminhao/${encodeURIComponent(vehicle.slug)}`}>
        <ImgCard>
          <Image
            className="rounded-t-lg"
            src={vehicle.vehicle_infos.vehicleMainPhoto.sourceUrl}
            alt={vehicle.vehicle_infos.vehicleModelName}
            width="480"
            height="560"
            objectFit="cover"
          />
        </ImgCard>
      </Link>
      <TextCard>
        <Link href={`/caminhao/${encodeURIComponent(vehicle.slug)}`}>
          <h2 className="mb-2 text-2xl cursor-pointer">
            <span>{brandName}</span>
            <span className="ml-2 text-red-700">{vehicle.vehicle_infos.vehicleModelName}</span>
          </h2>
        </Link>
        <div className="price mb-1.5">
          {(showPrice != true || showPrice == null) ?
            <p>{vehicle.vehicle_infos.vehiclePrice?.toLocaleString('pt-BR', { minimumFractionDigits: 3, style: 'currency', currency: 'BRL' }) || ''}</p>
            :
            <p>Valor sob consulta</p>
          }
        </div>
        <div className="flex flex-row justify-start mb-2 text-xs text-gray-500 capitalize short-descritpions">
          <span className="mr-2">{vehicle.vehicle_infos.vehicleShortText1}</span>
          <span className="mr-2">{vehicle.vehicle_infos.vehicleShortText2}</span>
          <span className="mr-2">{vehicle.vehicle_infos.vehicleShortText3}</span>
        </div>
        <div className="flex flex-row mb-3 text-xs text-gray-700 year-km">
          <div className="year mr-2.5">Ano: {year} {yearModel && " / " + yearModel}</div>
          <div className="km">km: {vehicle.vehicle_infos.vehicleKm?.toFixed(3) || ''}</div>
        </div>
        <div className="flex flex-row pt-1.5 text-xs text-gray-500 border-t place-items-center state border-t-gray-100">
          <div className="pr-1 icon">
            <Image src={IconPointMap} width="18" height="22" />
          </div>
          {(stateShort == null || stateShort == "NO") ?
            <p>Brasil</p>
            :
            <p>{state} </p>
          }
        </div>
      </TextCard>
    </BgCard >
  )
}

export default Truck;
import Link from "next/link";
import Image from "next/image";
import { BgCard, ImgCard, TextCard } from "./styles";

const Truck = ({ vehicle }) => {
  const brandName = vehicle.brands.nodes[0].name;
  const showPrice = vehicle.vehicle_infos.vehicleShowPrice;
  const state = vehicle.vehicle_infos.vehicleState;
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
            <p>Sob Consulta</p>
          }
        </div>
        <div className="flex flex-row justify-around mb-1.5 text-sm text-gray-500 short-descritpions">
          <span>{vehicle.vehicle_infos.vehicleShortText1}</span>
          <span>{vehicle.vehicle_infos.vehicleShortText2}</span>
          <span>{vehicle.vehicle_infos.vehicleShortText3}</span>
        </div>
        <div className="flex flex-row mb-1.5 text-xs text-gray-700 year-km">
          <div className="year">Ano: {year} {yearModel && " / " + yearModel}</div>
          <div className="km">km: {vehicle.vehicle_infos.vehicleKm?.toFixed(3) || ''}</div>
        </div>
        <div className="flex flex-row text-xs text-gray-500 state">
          <div className="pr-1 icon">
            a
          </div>
          {(state == null || state == "NO") ?
            <p>Brasil</p>
            :
            <p>{vehicle.vehicle_infos.vehicleState} </p>
          }
        </div>
      </TextCard>

    </BgCard >
  )
}

export default Truck;
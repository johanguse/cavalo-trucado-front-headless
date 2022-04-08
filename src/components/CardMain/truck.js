import Link from "next/link";
import Image from "next/image";
import { BgCard, ImgCard, TextCard } from "./styles";

const Truck = ({ vehicle }) => {
  /*
    if (isEmpty(product)) {
      return null;
    }
  
    const img = product?.images?.[0] ?? {};
    const productType = product?.type ?? '';
  */
  const brandName = vehicle.brands.nodes[0].name;
  return (
    <BgCard key={vehicle.vehicleId}>
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
      <TextCard>
        <h2 className="text-2xl">
          <span>{brandName}</span>
          <span className="ml-2 text-red-700">{vehicle.vehicle_infos.vehicleModelName}</span>
        </h2>
        <p>{vehicle.vehicleId}</p>
        <p>{vehicle.vehiclePrice}</p>
        <br />
        <Link href={`/caminhao/${encodeURIComponent(vehicle.slug)}`}>Link</Link>
        <br /><br />
      </TextCard>
    </BgCard>
  )
}

export default Truck;
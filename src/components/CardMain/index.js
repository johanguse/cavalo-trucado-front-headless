import Link from "next/link";
import Image from "next/image";
import { BgCard, ImgCard, TextCard } from "./styles";
import Truck from "./truck";

export default function CardMain({ vehicles }) {

  console.log(vehicles)
  //let brandName = vehicles.brands.nodes[0].name;
  //console.log(brandName)

  return (
    <main className="flex items-center justify-center flex-1 w-full px-2 py-8 bg-gray-100">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 max-w-7xl sm:px-4 lg:px-8">
        {vehicles.length ? vehicles.map(vehicles => {
          return (
            <Truck key={vehicles?.vehicleId} vehicle={vehicles} />
          )
        }) : null}
      </div>
    </main>
  )
}


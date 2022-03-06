import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";
import { INDEX_QUERY } from "@/queries/index";
import tw, { styled } from "twin.macro";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";

export default function Home({ vehicles }) {
  //console.log(vehicles)
  return (
    <>
      <Head>
        <title>Cavalo Trucado - Compra e venda de caminhões</title>
        <meta name="description" content="Especializado na compra e venda de caminhões em todo Brasil." />
        <meta name="keywords" content="compra, venda, caminhões, carretas, cavalos" />
      </Head>
      <Navbar />
      <main className="flex items-center justify-center flex-1 w-full px-2 py-8 bg-gray-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 max-w-7xl sm:px-4 lg:px-8">

          {vehicles.nodes.map((vehicle) => (

            <div className="text-center bg-white border border-gray-200 rounded-lg hover:shadow-lg align-center" key={vehicle.vehicleId}>
              <div className="w-full">
                <Image
                  className="rounded-t-lg"
                  src={vehicle.vehicle_infos.vehicleMainPhoto.sourceUrl}
                  alt={vehicle.vehicle_infos.vehicleModelName}
                  width="480"
                  height="560"
                  objectFit="cover"
                />
              </div>
              <h3>{vehicle.vehicle_infos.vehicleModelName}</h3>
              <p>{vehicle.vehicleId}</p>
              {vehicle.brands.nodes.map((brand) => (
                <div key={brand.brandId}><p>{brand.name}</p></div>
              ))}
              <br />
              <Link href={`/caminhao/${encodeURIComponent(vehicle.slug)}`}>Link</Link>
              <br /><br />
            </div>
          ))}

        </div>
      </main>
      <div>
        <Button />
        <br />
        <StyledButton>In Style</StyledButton>
        <br />
        <TailwindButton>In Tailwind Style</TailwindButton>
        <br />
        <ConditionalButton isRed={true}>Conditional Tailwind</ConditionalButton>
        <br />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: INDEX_QUERY
  });

  return {
    props: {
      vehicles: data.vehicles,
    },
  };
}

// still works despite importing from twin.macro
const StyledButton = styled.button`
  background: red;
  color: white;
  font-size: 1em;
  text-align: center;
  padding: 0.25em 1em;
  border: 2px solid black;
`;

const TailwindButton = tw.button`
  bg-red-500
  hover:bg-red-700
  text-white
  font-bold
  py-2
  px-4
  border
  border-black
  rounded
`;

const ConditionalButton = styled.button(({ isRed }) => [
  isRed ? tw`bg-red-500 hover:bg-red-700` : tw`bg-blue-500 hover:bg-blue-500`,
  tw`px-4 py-2 font-bold text-white border border-black rounded `,
]);

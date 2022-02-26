import Head from "next/head";
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";
import tw, { styled } from "twin.macro";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";

export default function Home({ vehicles }) {
  //console.log(vehicles)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
      </Head>

      <Navbar />

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 py-8 text-center bg-gray-100">
        <Button />
        <br />
        <StyledButton>In Style</StyledButton>
        <br />
        <TailwindButton>In Tailwind Style</TailwindButton>
        <br />
        <ConditionalButton isRed={true}>Conditional Tailwind</ConditionalButton>
        <br />
        <div>
          {vehicles.nodes.map((vehicle) => (
            <div key={vehicle.id}>
              <h3>{vehicle.vehicle_infos.vehicleModelName}</h3>
              <p>{vehicle.slug}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query indexQuery {
        vehicles {
          nodes {
            vehicle_infos {
              vehicleModelName
            }
            slug
            id
            brands {
              nodes {
                name
              }
            }
          }
        }
      }
    `,
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

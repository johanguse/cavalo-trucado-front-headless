import Head from "next/head";
import client from "@/lib/apollo-client";
import { INDEX_QUERY } from "@/queries/index";
import CardMain from "@/components/CardMain";
import Navbar from "@/components/Navbar";

export default function HomePage({ vehicles }) {
  return (
    <>
      <Head>
        <title>Cavalo Trucado - Compra e venda de caminhões</title>
        <meta name="description" content="Especializado na compra e venda de caminhões em todo Brasil." />
        <meta name="keywords" content="compra, venda, caminhões, carretas, cavalos" />
      </Head>
      <Navbar />
      <CardMain vehicles={vehicles.nodes} />
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
      revalidate: 7200
    },
  };
}


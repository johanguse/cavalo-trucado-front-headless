import Head from 'next/head'
import { getRandom4Trucks } from '@/lib/rest/wordpress'
import CardMain from '@/components/CardMain'
import Navbar from '@/components/Navbar'

export default function HomePage({ vehicles }) {
  return (
    <>
      <Head>
        <title>Cavalo Trucado - Compra e venda de caminhões</title>
        <meta
          name="description"
          content="Especializado na compra e venda de caminhões em todo Brasil."
        />
        <meta
          name="keywords"
          content="compra, venda, caminhões, carretas, cavalos"
        />
      </Head>
      <Navbar />
      <CardMain vehicles={vehicles} />
    </>
  )
}

export async function getStaticProps() {
  const vehicles = await getRandom4Trucks()

  return {
    props: {
      vehicles,
      revalidate: 7200,
    },
  }
}

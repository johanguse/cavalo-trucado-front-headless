import Head from "next/head";
import Link from "next/link";
import { INDEX_QUERY } from "@/queries/index";
import Navbar from "@/components/Navbar";
import FormTruck from "@/components/FormTruck";

export default function ContatoPage({ vehicles }) {
  return (
    <>
      <Head>
        <title>Cavalo Trucado - Compra e venda de caminhões - Entre em Contato</title>
        <meta name="description" content="Especializado na compra e venda de caminhões em todo Brasil." />
        <meta name="keywords" content="compra, venda, caminhões, carretas, cavalos" />
      </Head>
      <Navbar />
      <div className="w-full bg-gray-50">
        <div className="container px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="py-3 space-y-6 text-xs text-gray-500 md:space-y-0">Contato</div>
        </div>
      </div>
      <main className="w-full py-8 mb-5 bg-white border-t border-gray-200">
        <div className="container flex flex-col items-center justify-center flex-1 mx-auto bg-white max-w-7xl sm:px-6 lg:px-0">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl mb-1.5">Contato</h2>
            <p className="text-lg leading-6 text-gray-500 ">We'd love to know how we can add value to your company</p>
          </div>
          <div className="w-1/2 px-3">
            <FormTruck />
          </div>
        </div>
      </main>
    </>
  );
}

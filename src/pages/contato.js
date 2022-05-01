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
      <main className="w-full mb-5 bg-white border-t border-gray-200">
        <div className="container flex flex-col items-center justify-center flex-1 mx-auto bg-white max-w-7xl sm:px-6 lg:px-0">
          <FormTruck />
        </div>
      </main>
    </>
  );
}

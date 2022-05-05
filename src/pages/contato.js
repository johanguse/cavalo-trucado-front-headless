import Head from "next/head";
import { INDEX_QUERY } from "@/queries/index";
import Navbar from "@/components/Navbar";
import FormContact from "@/components/FormContact";

export default function ContatoPage({ vehicles }) {
  return (
    <>
      <Head>
        <title>Cavalo Trucado - Compra e venda de caminhões - Entre em Contato</title>
        <meta name="description" content="Especializado na compra e venda de caminhões em todo Brasil." />
        <meta name="keywords" content="compra, venda, caminhões, carretas, cavalos" />
      </Head>
      <Navbar />
      <div className="w-full border-b bg-gray-50 border-t-gray-200">
        <div className="container px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="py-3 space-y-6 text-xs text-gray-500 md:space-y-0">Contato</div>
        </div>
      </div>
      <main className="flex flex-col w-full max-w-4xl px-2 py-8 mx-auto mb-5 space-y-6 sm:px-6 lg:px-8 md:flex-row md:space-x-6 md:space-y-0 sm:p-12">
        <div className="w-full">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl mb-1.5">Contato</h2>
            <p className="text-lg leading-6 text-gray-500 ">Deixei sua messagem, retornaremos o mais breve possível!</p>
          </div>
          <div className="w-full">
            <FormContact />
          </div>
        </div>
      </main>
    </>
  );
}

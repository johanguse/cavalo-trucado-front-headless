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
      <main className="flex flex-col w-full max-w-4xl px-2 py-8 mx-auto mb-5 space-y-6 shadow-lg sm:px-6 lg:px-8 md:flex-row md:space-x-6 md:space-y-0 sm:p-12 rounded-xl">
        <div className="w-full">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl mb-1.5">Contato</h2>
            <p className="text-lg leading-6 text-gray-500 ">We'd love to know how we can add value to your company</p>
          </div>
          <div className="grid w-full grid-cols-40/60">
            <div className="">
              <h3>Infos Contato</h3>

              <div class="flex space-x-4">
                <a href="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
                <a href="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
            <div className="">
              <FormTruck />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

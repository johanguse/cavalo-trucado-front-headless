import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../assets/logo_cavalo-trucado.png'
import WhatsLogo from '../../assets/whatsapp.svg'
import { Container } from "./styles";

function Navbar() {
  return (
    <header class="w-full">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center space-x-10">
            <Image src={Logo} width="200" height="70" alt="Logo Cavalo Trucado" className="w-8 h-8 mr-2" />

            <nav class="hidden space-x-10 text-sm font-medium lg:flex">
              <Link href="">Estoque</Link>
              <Link href="">Contato</Link>
            </nav>
          </div>

          <div class="items-center justify-end hidden sm:flex">
            <div className="flex items-center">
              <div>
                <Image src={WhatsLogo} width="80" height="35" alt="Logo Cavalo Trucado" className="w-8 h-8 mr-2" />
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://wa.me/554796708959" target="_blank"
                  class="inline-flex items-center text-xs font-bold tracking-widest text-gray-900 uppercase"
                >
                  Entre em contato
                </a>
                <a href="https://wa.me/554796708959" target="_blank" class="text-sm font-medium">47 99670-8959</a>
              </div>
            </div>
          </div>

          <div class="sm:hidden">
            <button class="p-2 text-gray-100 bg-gray-800 rounded-lg" type="button">
              <span class="sr-only">Open menu</span>

              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewbox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
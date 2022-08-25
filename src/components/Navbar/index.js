import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo_cavalo-trucado.png';
import WhatsLogo from '@/assets/whatsapp.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

  const handlerMenu = () => {
    if (isOpen === true) {
      document.body.style.overflow = 'unset';
      return setIsOpen(false);
    }

    setIsOpen(true);
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <header className="w-full border-b border-gray-200">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-10">
            <Link href="/">
              <a>
                <Image
                  src={Logo}
                  width="200"
                  height="70"
                  alt="Logo Cavalo Trucado"
                  className="w-8 h-8 mr-2 cursor-pointer"
                />
              </a>
            </Link>
            <nav className="hidden space-x-10 text-sm font-medium md:flex">
              <Link href="/busca">Busca Avançada</Link>
              <Link href="/contato">Contato</Link>
            </nav>
          </div>

          <div className="items-center justify-end hidden sm:flex">
            <div className="flex items-center">
              <div>
                <Image
                  src={WhatsLogo}
                  width="80"
                  height="35"
                  alt="Logo Cavalo Trucado"
                  className="w-8 h-8 mr-2"
                />
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://wa.me/554796708959"
                  target="_blank"
                  className="inline-flex items-center text-xs font-bold tracking-widest text-gray-900 uppercase"
                >
                  Entre em contato
                </a>
                <a
                  href="https://wa.me/554796708959"
                  target="_blank"
                  className="text-sm font-medium"
                >
                  47 99670-8959
                </a>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              className="flex flex-col items-center justify-center w-12 h-12 border-2 border-red-300 rounded group"
              onClick={() => handlerMenu()}
            >
              <div
                className={`${genericHamburgerLine} ${
                  isOpen
                    ? 'rotate-45 translate-y-3 opacity-50 group-hover:opacity-100'
                    : 'opacity-50 group-hover:opacity-100'
                }`}
              />
              <div
                className={`${genericHamburgerLine} ${
                  isOpen ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'
                }`}
              />
              <div
                className={`${genericHamburgerLine} ${
                  isOpen
                    ? '-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100'
                    : 'opacity-50 group-hover:opacity-100'
                }`}
              />
            </button>
            <div
              className={
                isOpen
                  ? 'showMenuNav z-50 top-24 border-t border-gray-200 left-0 right-0 h-screen absolute bg-white'
                  : 'hideMenuNav hidden'
              }
            >
              <ul className="flex flex-col items-center justify-between min-h-[250px]">
                <li className="my-8 uppercase border-b border-gray-400">
                  <a href="/about">About</a>
                </li>
                <li className="my-8 uppercase border-b border-gray-400">
                  <a href="/portfolio">Portfolio</a>
                </li>
                <li className="my-8 uppercase border-b border-gray-400">
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

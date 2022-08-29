import Link from 'next/link';
import Image from 'next/image';
import Truck from './truck';

export default function CardMain({ vehicles }) {
  return (
    <main className="flex items-center justify-center flex-1 w-full px-2 py-6 border-t border-gray-200 bg-gray-50">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:px-4 lg:px-8">
        {vehicles.length &&
          vehicles.map((vehicles) => {
            return <Truck key={vehicles.id} vehicle={vehicles} />;
          })}
      </div>
    </main>
  );
}

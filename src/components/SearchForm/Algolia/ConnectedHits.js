import React from 'react';
import Link from 'next/link';
import { connectHits } from 'react-instantsearch-hooks-web';

const HitComponent = ({ hit }) => {
  const { slug } = hit;
  return (
    <Link href={slug}>
      <div className="flex flex-col col-span-1 transition duration-300 bg-white border border-gray-200 rounded-lg hit hover:shadow-md">
        <div className="p-0">
          <div className="w-full cursor-pointer">
            {
              <Image
                className="rounded-t-lg"
                src={`${hit.vehicle_main_photo}`}
                alt={`${hit.brand} - ${hit.vehicle_model_name}`}
                title={`${hit.brand} - ${hit.vehicle_model_name}`}
                width="260"
                height="360"
                objectFit="cover"
              />
            }
          </div>
        </div>

        <div className="flex flex-wrap px-4 mb-1">
          <div className="flex flex-col">
            <span>{hit.vehicle_model_name}</span>
            <span>{hit.vehicle_year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ConnectedHits = connectHits(CustomHits);

export default ConnectedHits;

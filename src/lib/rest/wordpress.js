const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

function getCache() {
  const env = process.env.NODE_ENV;
  if (env == 'development') {
    return '?skip_cache=1';
  }
  return '';
}

export async function getRandom4Trucks() {
  const currentURL = BASE_URL + '/custom/v1/random_4_trucks' + getCache();
  const postsRes = await fetch(currentURL);
  const random4Trucks = await postsRes.json();
  return random4Trucks;
}

export async function getTruck(slug) {
  const currentURL = BASE_URL + '/custom/v1/truck/' + slug + getCache();
  const postsRes = await fetch(currentURL);
  const truck = await postsRes.json();
  return truck;
}

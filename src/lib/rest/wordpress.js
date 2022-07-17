const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function getRandom4Trucks() {
  const postsRes = await fetch(BASE_URL + "/custom/v1/random_4_trucks?skip_cache=1");
  const random4Trucks = await postsRes.json();
  return random4Trucks;
}

export async function getTruck(slug) {
  const postsRes = await fetch(BASE_URL + "/custom/v1/truck/" + slug + "?skip_cache=1");
  const truck = await postsRes.json();
  return truck;
}

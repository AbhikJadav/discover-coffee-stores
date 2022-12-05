import { createApi } from "unsplash-js";

const apiKey = "fsq34kbkAE+h8+fMRymGHH5BpnEbJTXFs0aZc+3kReEsrj4=";
const client_id = process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_SECRET;
const unsplash_access_key = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const unsplashApi = createApi({
  accessKey: unsplash_access_key,
  //...other fetch options
});

/*below code is used to get the photos of unsplash for coffee store*/

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "Coffee",
    perPage: 40,
  });
  const unsplashResults = photos.response.results;

  return unsplashResults.map((elements) => elements.urls["small"]);
};

/*below code is use to fetch the data of coffee store.*/

const getAuthoRization = () => {
  const methodParams = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: apiKey,
    },
  };
  return methodParams;
};

export const fetchAllCoffeeStore = async (
  latLong = "21.1702,72.8311",
  limit = 6
) => {
  // const response = await fetch(
  //   "https://api.foursquare.com/v3/places/search?ll=21.1702,72.8311&query=cafe coffee day&client_id=3GA35MNFHFYJURY3VZSTU3GNVTRTIDRES3PGDE4RGU1OEU2R&client_secret=QE2VASYMVUW5PO20KIVLKDPMOQ4EMD4FUSF2HHXGB2RAB0YZ&v=2022122"
  // );
  const photosResponse = await getListOfCoffeeStorePhotos();
  const searchParams = new URLSearchParams({
    query: "Coffee",
    ll: latLong,
    client_id,
    client_secret,
    limit,
    // open_now: 'true',
    // sort: 'DISTANCE'
  });
  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?${searchParams}`,
    getAuthoRization()
  );
  const data = await response.json();
  return data.results.map((results, index) => {
    return {
      ...results,
      id: results.fsq_id,
      name: results.name,
      address:
        results.location.address || results.location.formatted_address || "",
      neighbourhood:
        results.location.neighborhood || results.location.cross_street || "",
      imgUrl: photosResponse[index],
    };
  });
};

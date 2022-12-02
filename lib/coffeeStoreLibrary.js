const apiKey = "fsq34kbkAE+h8+fMRymGHH5BpnEbJTXFs0aZc+3kReEsrj4=";
const client_id = process.env.FOURSQUARE_CLIENT_ID;
const client_secret = process.env.FOURSQUARE_CLIENT_SECRET;

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

export const fetchAllCoffeeStore = async () => {
  // const response = await fetch(
  //   "https://api.foursquare.com/v3/places/search?ll=21.1702,72.8311&query=cafe coffee day&client_id=3GA35MNFHFYJURY3VZSTU3GNVTRTIDRES3PGDE4RGU1OEU2R&client_secret=QE2VASYMVUW5PO20KIVLKDPMOQ4EMD4FUSF2HHXGB2RAB0YZ&v=2022122"
  // );
  const searchParams = new URLSearchParams({
    query: "tea",
    ll: "21.1702,72.8311",
    client_id,
    client_secret,
    limit: 6,
    // open_now: 'true',
    // sort: 'DISTANCE'
  });
  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?${searchParams}`,
    getAuthoRization()
  );
  const data = await response.json();
  return data;
};

export const fetchDetailCoffeeStore = async () => {
  const response = await fetch(
    `https://api.foursquare.com/v3/places/d56bc096e61942b86ecdb4aa`,
    getAuthoRization()
  );
  // console.log("response:", response);
  const data = await response;
  // console.log("data:", data);
  return data;
};

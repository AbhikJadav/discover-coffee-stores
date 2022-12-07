import { fetchAllCoffeeStore } from "../../lib/coffeeStoreLibrary";

const getCoffeeStoreByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchAllCoffeeStore(latLong, limit);
    res.json(response);
  } catch (error) {
    console.log("Their is an error", error);
    res.status(500);
    res.json({ message: "Something went wrong!!", error });
  }
};

export default getCoffeeStoreByLocation;

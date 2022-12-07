import { getMiniFiedRecords, table } from "./airTable";

const createStore = async (req, res) => {
  if (req.method === "POST") {
    //find record is available or not!!
    const { Id, Name, Address, ImageUrl, Neighbourhood, Voting } = req.body;
    try {
      if (Id) {
        const findCoffeeStore = await table
          .select({
            filterByFormula: `id="${Id}"`,
          })
          .firstPage();
        if (findCoffeeStore.length !== 0) {
          const records = getMiniFiedRecords(findCoffeeStore);
          res.json(records);
        } else {
          //create record
          if (Name) {
            const createRecord = await table.create([
              {
                fields: {
                  Neighbourhood,
                  Id,
                  Name,
                  Voting,
                  Address,
                  ImageUrl,
                },
              },
            ]);
            const records = getMiniFiedRecords(createRecord);
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "id is missing" });
      }
    } catch (error) {
      console.log("Error creating or finding store:", error);
      res.status(500);
      res.json({ message: "Error creating or finding store" }, error);
    }
  }
};

export default createStore;

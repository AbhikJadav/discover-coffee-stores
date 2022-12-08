const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

export const table = base("coffee-store");

const getMiniFiedRecord = (record) => {
  return { recordId: record.id, ...record.fields };
};

export const getMiniFiedRecords = (records) => {
  return records.map((record) => {
    return getMiniFiedRecord(record);
  });
};
export const findRecordsByFilter = async (Id) => {
  const findCoffeeStoreRecords = await table
    .select({ filterByFormula: `id="${Id}"` })
    .firstPage();

  return getMiniFiedRecords(findCoffeeStoreRecords);
};

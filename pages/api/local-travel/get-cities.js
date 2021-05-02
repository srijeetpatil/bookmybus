export default async function GetCities(req, res) {
  if (req.method === "GET") {
    let cities = [
      "Panvel",
      "Khandeshwar",
      "Mansarovar",
      "Kharghar",
      "Belapur",
      "Seawoods",
      "Nerul",
      "Juinagar",
      "Sanpada",
      "Vashi",
      "Turbhe",
      "Koparkhairne",
      "Ghansoli",
      "Rabale",
      "Airoli",
      "Thane",
    ];
    res.status(200).json({ cities: cities });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export default async function Test(req, res) {
  let variables = process.env;
  res.status(200).json({ vars: variables });
}

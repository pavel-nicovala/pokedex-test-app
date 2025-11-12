import fetch from "node-fetch";

const gqlRequest = (query, variables = {}) =>
  fetch(`https://beta.pokeapi.co/graphql/v1beta`, {
    method: "post",
    headers: { "content-type": "application/graphql" },
    body: JSON.stringify({ query, variables }),
  })
    .then((res) => res.json())
    .then(({ data, errors }) => {
      if (errors?.length) {
        console.log(errors);
        return {};
      }
      return data;
    });

export const gqlRoute =
  ({ query, variables = () => ({}), result = (x) => x }) =>
  async (req, res) => {
    let v;
    try {
      v = variables(req);
    } catch (error) {
      return res.status(400).json({ error: { message: error.message } });
    }
    try {
      const data = await gqlRequest(query, v);
      const response = result(data);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  };

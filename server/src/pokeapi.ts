import fetch from "node-fetch";
import { Request, Response } from "express";
import { GraphQLResponse, GraphQLVariables, GqlRouteConfig, GqlRouteHandler } from "./types.js";

const gqlRequest = async <T = any>(
  query: string,
  variables: GraphQLVariables = {}
): Promise<T> => {
  const response = await fetch(`https://beta.pokeapi.co/graphql/v1beta`, {
    method: "post",
    headers: { "content-type": "application/graphql" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json() as GraphQLResponse<T>;
  const { data, errors } = json;

  if (errors?.length) {
    console.log(errors);
    return {} as T;
  }
  return data as T;
};

export const gqlRoute = <TVariables = any, TData = any, TResult = any>({
  query,
  variables = () => ({} as TVariables),
  result = (x: TData) => x as unknown as TResult,
}: GqlRouteConfig<TVariables, TData, TResult>): GqlRouteHandler => {
  return async (req: Request, res: Response): Promise<Response | void> => {
    let v: TVariables;
    try {
      v = variables(req);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: { message: err.message } });
    }
    try {
      const data = await gqlRequest<TData>(query, v as GraphQLVariables);
      const response = result(data);
      return res.status(200).json(response);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: { message: err.message } });
    }
  };
};


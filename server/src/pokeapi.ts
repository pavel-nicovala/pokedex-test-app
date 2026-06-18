import fetch from "node-fetch";
import { Request, Response } from "express";
import { GraphQLResponse, GraphQLVariables, GqlRouteConfig, GqlRouteHandler } from "./types.js";

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

const gqlRequest = async <T = any>(
  query: string,
  variables: GraphQLVariables = {}
): Promise<T> => {
  const response = await fetch(`https://beta.pokeapi.co/graphql/v1beta`, {
    method: "post",
    headers: { "content-type": "application/json" },
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

export const gqlFetch = <TVariables = any, TData = any, TResult = any>({
  query,
  variables = () => ({} as TVariables),
  result = (x: TData) => x as unknown as TResult,
}: GqlRouteConfig<TVariables, TData, TResult>) => {
  return async (req: Request): Promise<TResult> => {
    let v: TVariables;
    try {
      v = variables(req);
    } catch (error) {
      throw new BadRequestError((error as Error).message);
    }
    const data = await gqlRequest<TData>(query, v as GraphQLVariables);
    return result(data);
  };
};

export const gqlRoute = <TVariables = any, TData = any, TResult = any>(
  config: GqlRouteConfig<TVariables, TData, TResult>
): GqlRouteHandler => {
  const fetcher = gqlFetch(config);
  return async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const response = await fetcher(req);
      return res.status(200).json(response);
    } catch (error) {
      const err = error as Error;
      if (err instanceof BadRequestError) {
        return res.status(400).json({ error: { message: err.message } });
      }
      return res.status(500).json({ error: { message: err.message } });
    }
  };
};

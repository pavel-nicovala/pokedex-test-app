import { Request, Response } from "express";

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export interface GraphQLVariables {
  [key: string]: any;
}

export interface GqlRouteConfig<TVariables = any, TData = any, TResult = any> {
  query: string;
  variables?: (req: Request) => TVariables;
  result?: (data: TData) => TResult;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  localised: Array<{
    name: string;
  }>;
}

export interface PokemonType {
  names: {
    name: string;
  };
}

export interface PokemonItem {
  item: {
    name: string;
  };
}

export interface PokemonEvolution {
  id: number;
  name: string;
  localised: Array<{
    name: string;
  }>;
}

export interface PokemonSpeciesDetails {
  id: number;
  name: string;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  base_happiness: number;
  capture_rate: number;
  gender_rate: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  localised: Array<{
    name: string;
  }>;
  evolution_chain?: {
    evolutions: PokemonEvolution[];
  };
  flavor_text?: Array<{
    id: number;
    flavor_text: string;
  }>;
}

export interface PokemonDetails {
  height: number;
  weight: number;
  species: PokemonSpeciesDetails;
  types: PokemonType[];
  items: PokemonItem[];
}

export interface SearchQueryParams {
  query: string;
  langId: number;
}

export interface LookupParams {
  name: string;
}

export type GqlRouteHandler = (req: Request, res: Response) => Promise<Response | void>;


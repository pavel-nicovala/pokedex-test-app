import { useFetch } from "use-http";
export const useSearch = (query) =>
  useFetch(`/api/search?${new URLSearchParams({ query })}`, {});

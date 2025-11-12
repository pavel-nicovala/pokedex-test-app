import useFetch from "use-http";

export const useDetails = (name) => useFetch(`/api/lookup/${name}`, {}, [name]);


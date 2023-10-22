import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPokemons = async (pageLimit: number, pageNumber: number) => {
  const instance = axios.create();

  const response = await instance.request({
    url: `${API_BASE_URL}pokemon`,
    method: "get",
    params: {
      limit: pageLimit,
      offset: pageNumber,
    },
  });

  const { data } = response;

  return data;
};

export const searchPokemon = async (searchNumber: string) => {
  const instance = axios.create();

  const response = await instance.request({
    url: `${API_BASE_URL}pokemon/${searchNumber}`,
    method: "get",
  });
  const { data } = response;

  return data;
};

export const getEvolutionChain = async (pokemonNumber: string) => {
  const instance = axios.create();

  const response = await instance.request({
    url: `${API_BASE_URL}evolution-chain/${pokemonNumber}`,
    method: "get",
  });
  const { data } = response;

  return data;
};

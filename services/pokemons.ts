import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const instance = axios.create({
  timeout: 3000,
});

// 포켓몬 리스트 패칭
export const fetchPokemons = async (pageLimit: number, pageNumber: number) => {
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

// 포켓몬 번호 검색, 포켓몬 상세 정보 패칭
export const searchPokemon = async (searchNumber: string) => {
  const instance = axios.create();

  const response = await instance.request({
    url: `${API_BASE_URL}pokemon/${searchNumber}`,
    method: "get",
  });
  const { data } = response;

  return data;
};

//포켓몬 진화 정보 패칭
export const getEvolutionChain = async (pokemonNumber: string) => {
  const instance = axios.create();

  //포켓몬 스피시즈에서 해당 포켓몬 진화 정보를 먼저 가져오기
  const { data } = await instance.request({
    url: `${API_BASE_URL}pokemon-species/${pokemonNumber}`,
    method: "get",
  });

  const { data: responseData } = await instance.request({
    url: data.evolution_chain.url,
    method: "get",
  });

  return responseData.chain;
};

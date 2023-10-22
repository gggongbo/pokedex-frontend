import { Store } from "@reduxjs/toolkit";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { Context } from "next-redux-wrapper";
import { useRouter } from "next/router";
import { queryClient } from "~/pages/_app";
import { getEvolutionChain, searchPokemon } from "~/services/pokemons";
import { wrapper } from "~/store";
import _ from "lodash";
import { useEffect } from "react";
import { isNumber } from "~/utils/validation";
import Image from "next/image";

//서버사이드에서 url로 포켓몬 검색하고 없으면 목록화면으로 리다이렉트
const PokemonId: NextPage = () => {
  const {
    query: { pokemonId },
  } = useRouter();

  if (!_.isString(pokemonId) || !isNumber(pokemonId)) {
    throw new Error("Invalid Request Url : pokemonId is invalid");
  }

  const { data, isFetching } = useQuery(["searchPokemon", pokemonId], () =>
    searchPokemon(pokemonId)
  );

  const { data: evolutionData, isFetching: evolutionFetching } = useQuery(
    ["getEvolutionChain", pokemonId],
    () => getEvolutionChain(pokemonId)
  );

  console.log("test", evolutionData);

  return (
    <div className="w-full flex flex-col p-5">
      {isFetching && <div>loading...</div>}
      <div className="w-full flex flex-col">
        <div className="font-bold self-center text-center mb-5 text-xl">
          포켓몬 정보
        </div>
        <div className="flex flex-row gap-x-3 self-center w-fit justify-center">
          <Image
            src={data.sprites.other["official-artwork"].front_default}
            width={300}
            height={300}
            alt={data.name}
            priority
          />
          <div className="flex flex-1 flex-col gap-y-2 justify-center">
            <div className="flex flex-row items-center gap-x-2 itmes-center mb-2">
              <div className="text-rose-500 text-lg font-bold">
                No.{data.id}
              </div>
              <div className="text-xl font-bold">{data.name}</div>
            </div>
            <div className="flex flex-row items-center gap-x-2 itmes-center">
              <div className="rounded-md bg-rose-500 px-2 text-white py-1">
                키
              </div>
              <div>{data.height / 10}m</div>
              <div className="rounded-md bg-rose-500 px-2 text-white py-1">
                몸무게
              </div>
              <div>{data.weight / 10}kg</div>
            </div>
            <div className="flex flex-row items-center gap-x-2 itmes-center">
              <div className="rounded-md bg-rose-500 px-2 text-white py-1">
                타입
              </div>
              <div className="flex flex-row gap-x-2 itmes-center">
                {data.types?.map(
                  (typeItem: { type: { name: string } }, index: number) => {
                    return (
                      <div
                        key={`${typeItem}${index}`}
                        className="flex rounded-md border border-1 border-rose-500 px-2 pb-1"
                      >
                        {typeItem?.type?.name ?? "unknown"}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-2 itmes-center">
              <div className="rounded-md bg-rose-500 px-2 text-white py-1">
                기술
              </div>
              <div className="flex flex-row gap-x-2 itmes-center">
                {data.abilities?.map(
                  (
                    abilityItem: { ability: { name: string } },
                    index: number
                  ) => {
                    return (
                      <div
                        key={`${abilityItem}${index}`}
                        className="flex rounded-md border border-1 border-rose-500 px-2 pb-1"
                      >
                        {abilityItem?.ability?.name ?? "unknown"}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-2 itmes-center">
              <div className="rounded-md bg-rose-500 px-2 text-white py-1">
                진화
              </div>
              <div className="flex flex-row gap-x-2 itmes-center">
                {data.abilities?.map(
                  (
                    abilityItem: { ability: { name: string } },
                    index: number
                  ) => {
                    return (
                      <div
                        key={`${abilityItem}${index}`}
                        className="flex rounded-md border border-1 border-rose-500 px-2 pb-1"
                      >
                        {abilityItem?.ability?.name ?? "unknown"}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonId;

//ServerSide에서 데이터 prefetch
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store: Store) => async ({ resolvedUrl }) => {
    const pokemonId = resolvedUrl.replace("/pokemons/", "").replaceAll("/", "");

    try {
      await searchPokemon(pokemonId);
      await Promise.all([
        queryClient.prefetchQuery(["searchPokemon", pokemonId], () =>
          searchPokemon(pokemonId)
        ),
        queryClient.prefetchQuery(["getEvolutionChain", pokemonId], () =>
          getEvolutionChain(pokemonId)
        ),
      ]);
    } catch (errors) {
      //없는 번호로 페이지 이동시 리다이렉트 처리
      return {
        redirect: {
          destination: "/pokemons/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  });

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Link from "next/link";
import { useRef, useMemo, useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { VariableSizeList } from "react-window";

import Button from "@components/atoms/Button";
import Search from "@components/atoms/Search";
import { useInClick } from "@hooks/useInClick";
import { useIntersectObserver } from "@hooks/useIntersectObserver";
import useUpdateEffect from "@hooks/useUpdateEffect";
import { fetchPokemons, searchPokemon } from "@services/pokemons";
import { PokemonSliceState } from "@slices/pokemon";
import { userActions } from "@slices/user";
import { ReduxStore, useReduxDispatch } from "~/store";

const ROW_HEIGHT = 50;
const PAGE_LIMIT = 10;

const Pokemons: NextPage = () => {
  const { isDetailLoading } = useSelector<ReduxStore, PokemonSliceState>(
    ({ pokemon }) => pokemon,
  );
  const dispatch = useReduxDispatch();
  const observerRef = useRef(null);
  const searchButtonFef = useRef(null);
  const { inClicked: inSearchClicked } = useInClick(searchButtonFef);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearchClicked, setSearchClicked] = useState<boolean>(false);

  // 포켓몬 리스트 패칭
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["pokemons"],
      ({ pageParam = 0 }) => fetchPokemons(PAGE_LIMIT, PAGE_LIMIT * pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length;

          return lastPage?.results?.length ? nextPage : undefined;
        },
        enabled: !isSearchClicked && !searchValue?.length,
      },
    );

  // 포켓몬 번호 검색
  const {
    data: searchData,
    isFetching: isSearchFetching,
    isSuccess: isSearchSuccess,
    isError: isSearchError,
    refetch: searchRefetch,
  } = useQuery(
    ["searchPokemon", searchValue],
    () => searchPokemon(searchValue),
    {
      enabled: !!isSearchClicked && !!searchValue?.length,
    },
  );

  // IntersectObserver를 사용한 무한 스크롤
  useIntersectObserver({
    ref: observerRef,
    hasNextPage,
    enableObserver: !isSearchClicked && !isSearchSuccess,
    fetchNextPage,
  });

  // 잘못된 번호로 검색한 경우 alert
  useEffect(() => {
    if (!isSearchFetching && isSearchError) {
      alert("입력한 포켓몬 번호를 확인해주세요");
    }
  }, [isSearchFetching, isSearchError]);

  // 포켓몬 번호 검색 버튼 클릭 여부 체크
  useEffect(() => {
    setSearchClicked(inSearchClicked);
  }, [inSearchClicked]);

  //현재 페이지 세팅
  useUpdateEffect(() => {
    dispatch(userActions.setCurrentPage((data?.pages?.length ?? 1) - 1));
  }, [data?.pages]);

  // 포켓몬 리스트 데이터 세팅
  const pokemonList = useMemo(
    () => (data ? data.pages.flatMap(({ results }) => results) : []),
    [data],
  );

  // DOM 최적화를 위한 VariableSizeList Row 컴포넌트
  const variableSizeListRow = ({ index }: { index: number }) => {
    const pokemonItem = pokemonList?.[index];

    return rowComponent({
      id: pokemonItem.url
        .replace(`${process.env.NEXT_PUBLIC_API_BASE_URL}pokemon`, "")
        .replaceAll("/", ""),
      name: pokemonItem.name,
    });
  };

  const rowComponent = ({ id, name }: { id: number; name: number }) => {
    return (
      <Link href={`/pokemons/${id}`} passHref>
        <div
          style={{ height: ROW_HEIGHT }}
          className="flex flex-row mb-2 border border-1 border-gray-400 shadow-sm rounded-md px-5 items-center gap-x-2"
        >
          <div className="rounded-md bg-rose-500 px-2 text-white">No.{id}</div>
          <div>{name}</div>
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full flex flex-col p-3">
      <div className="font-bold self-center text-center mb-2 text-xl">
        포켓몬 도감
      </div>
      {isDetailLoading ? (
        <div>loading...</div>
      ) : (
        <div className="flex flex-col">
          <div className="w-full flex flex-row flex-shrink-0 flex-wrap whitespace-nowrap rounded-lg gap-x-2">
            <div className="rounded-lg bg-rose-500 text-white px-3 py-1">
              포켓몬 번호
            </div>
            <Search
              value={searchValue}
              placeholder="포켓몬 번호 검색..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchValue(e?.target?.value);
              }}
            />
            <div ref={searchButtonFef}>
              <Button
                label="Search"
                onClick={() => {
                  searchRefetch();
                }}
              />
            </div>
            <Button
              label="Reset"
              color="noColor"
              onClick={() => {
                setSearchValue("");
                setSearchClicked(false);
              }}
            />
          </div>
          {isSearchClicked && isSearchSuccess ? (
            <div className="py-5">
              {rowComponent({ id: searchData.id, name: searchData.name })}
            </div>
          ) : (
            <>
              {isSuccess && (
                <VariableSizeList
                  style={{
                    overflowY: "hidden",
                  }}
                  height={ROW_HEIGHT * pokemonList.length}
                  width="100%"
                  itemCount={pokemonList.length}
                  itemSize={() => ROW_HEIGHT}
                  className="py-5"
                  itemData={pokemonList}
                >
                  {variableSizeListRow}
                </VariableSizeList>
              )}
              <div className="h-1" ref={observerRef}>
                {isFetchingNextPage && hasNextPage && <div>loading...</div>}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Pokemons;

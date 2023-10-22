import { configureStore, combineReducers, Store } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import user, { UserSliceState } from "@slices/user";
import pokemon, { PokemonSliceState } from "@slices/pokemon";

export type ReduxStore = {
  user: UserSliceState;
  pokemon: PokemonSliceState;
};

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem() {
    return Promise.resolve();
  },
  removeItem() {
    return Promise.resolve();
  },
});

const sessionStorage =
  typeof window !== "undefined"
    ? createWebStorage("session")
    : createNoopStorage();

const rootPersistConfig = {
  key: "root",
  storage: sessionStorage,
  blacklist: ["user"],
};

const userPersistConfig = {
  key: "user",
  storage: sessionStorage,
  blacklist: [],
};

const pokemonPersistConfig = {
  key: "pokemon",
  storage: sessionStorage,
  blacklist: ["isDetailLoading"],
};

const appReducer = combineReducers({
  user: persistReducer(userPersistConfig, user),
  pokemon: persistReducer(pokemonPersistConfig, pokemon),
});

const rootReducer = (state: any, action: any) => {
  //Server - Client Store 싱크 맞춤
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    // Client Store에서만 관리하는 Slices 처리(Server Store로 덮어써지지 않도록) START
    nextState.user = state.user;
    nextState.pokemon = state.pokemon;
    // Client Store에서만 관리하는 Slices 처리(Server Store로 덮어써지지 않도록) END

    return nextState;
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export const wrapper = createWrapper<Store>(() => store);
// store debug 시 주석해제
// export const wrapper = createWrapper<Store>(() => store, { debug: process.env.NODE_ENV !== 'production' });
export type ReduxDispatch = typeof store.dispatch;
export const useReduxDispatch: () => ReduxDispatch = useDispatch;

// Server-Side에서 store 접근시 server state dispatch => client 반영은 가능, client에 있는 store를 꺼내올 수는 없음
// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
//   (store: Store) => async (context: Context) => {
//     store.dispatch(userActions.setCurrentPage('1');

//     return {
//       props: {},
//     };
//   },
// );

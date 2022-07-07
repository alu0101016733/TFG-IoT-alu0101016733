import {
  createContext,
  useReducer,
  Dispatch,
  FC,
  useContext,
  ReactNode,
} from "react";

type appContextOptions = {
  state: undefined;
};

const initialState: appContextOptions = {
  state: undefined,
};

export type AppContextProps = {
  appContextState: appContextOptions;
  setBaseLayoutState: Dispatch<appContextOptions>;
};

export const AppContext = createContext<AppContextProps>({
  appContextState: initialState,
  setBaseLayoutState: () => initialState,
});

export const useAppContext = () => useContext(AppContext);

export type AppContextProviderProps = {
  children: ReactNode;
};

const reducerFunction = (
  state: appContextOptions,
  action: appContextOptions
) => {
  state = action;
  return state;
};

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}) => {
  const [appContextState, setBaseLayoutState] = useReducer(
    reducerFunction,
    initialState
  );

  return (
    <AppContext.Provider value={{ appContextState, setBaseLayoutState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

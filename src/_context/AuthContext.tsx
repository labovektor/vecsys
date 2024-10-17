"use client";

import { getAdminAction } from "@/_actions/auth.action";
import { AdminModel } from "@/_model/admin_model";
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

interface State {
  admin: AdminModel | null;
}

export const initialState: State = {
  admin: null,
};

const AuthContext = createContext<AuthContextType | null>(null);

export enum AuthActionKind {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

interface AuthAction {
  type: AuthActionKind;
  payload?: AdminModel;
}

interface AuthContextType {
  state: State;
  dispatch: Dispatch<AuthAction>;
}

export const authReducer = (state: State, action: AuthAction): State => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload);
      if (action.payload) {
        return { admin: action.payload };
      }
    case "LOGOUT":
      return { admin: null };
    default:
      return state;
  }
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const initiateAdmin = async () => {
    const { data } = await getAdminAction();
    if (data) {
      dispatch({
        type: AuthActionKind.LOGIN,
        payload: data,
      });
    }
  };

  useEffect(() => {
    initiateAdmin();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "The App Context must be used within an AuthContextProvider"
    );
  }

  return context;
}

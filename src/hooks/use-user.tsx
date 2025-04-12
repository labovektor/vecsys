import { AuthContext } from "@/provider/auth-provider";
import { useContext } from "react";

export function useUser() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "The App Context must be used within an AuthContextProvider"
    );
  }

  return context;
}

import { ParticipantAuthContext } from "@/provider/participant-auth-provider";
import { useContext } from "react";

export function useParticipant() {
  const context = useContext(ParticipantAuthContext);

  if (!context) {
    throw new Error(
      "The App Context must be used within an AuthContextProvider"
    );
  }

  return context;
}

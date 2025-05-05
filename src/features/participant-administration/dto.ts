import { Event } from "../event/dto";
import { Participant, ParticipantProgressStep } from "../participant/dto";

export type ParticipantAdmistration = Participant & {
  event: Event | null;
};

export type ParticipantData = {
  is_locked: boolean;
  is_verfied: boolean;
  participant: ParticipantAdmistration & {};
};

export type ParticipantState = {
  is_locked: boolean;
  is_verfied: boolean;
  step: ParticipantProgressStep;
};

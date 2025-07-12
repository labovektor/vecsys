import { EventCategory } from "../event-category/dto";
import { EventRegion } from "../event-region/dto";
import { Event } from "../event/dto";
import { Participant, ParticipantProgressStep } from "../participant/dto";

export type ParticipantAdmistration = Participant & {
  event: Event | null;
};

export type ParticipantData = {
  is_locked: boolean;
  is_verfied: boolean;
  participant: ParticipantAdmistration & {
    category: EventCategory;
    region: EventRegion;
  };
};

export type ParticipantState = {
  is_locked: boolean;
  is_verified: boolean;
  step: ParticipantProgressStep;
};

export type EventCategoriesNRegions = {
  categories: EventCategory[];
  regions: EventRegion[];
};

import { EventCategory } from "../event-category/dto";
import { Institution } from "../event-instansi/dto";
import { EventRegion } from "../event-region/dto";
import { Event } from "../event/dto";

export type PaymentStep = "all" | "paid" | "unpaid";

export type Participant = {
  id: string;
  event_id: string;
  event: Event | null;
  region_id: string;
  region: EventRegion | null;
  category_id: string;
  category: EventCategory | null;
  name: string;
  institution_id: string;
  institution: Institution | null;
  email: string;
  progress_step: string;
  verified_at: string;
  locked_at: string;
  created_at: string;
  updated_at: string;
};

import { EventCategory } from "../event-category/dto";
import { EventRegion } from "../event-region/dto";

export type PaymentStep = "all" | "paid" | "unpaid";

export type Participant = {
  id: string;
  event_id: string;
  region_id: string;
  region: EventRegion | null;
  category_id: string;
  category: EventCategory | null;
  name: string;
  institution_id: string;
  email: string;
  progress_step: string;
  verified_at: string;
  locked_at: string;
  created_at: string;
  updated_at: string;
};

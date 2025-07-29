import { EventCategory } from "../event-category/dto";
import { Institution } from "../event-instansi/dto";
import { PaymentOption } from "../event-payment/dto";
import { PaymentOptionSchemaType } from "../event-payment/schema";
import { EventReferral } from "../event-referral/dto";
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
  payment: PaymentData | null;
};

export type PaymentData = {
  id: string;
  participant_id: string;
  bank_name: string;
  bank_account: string;
  referal_id: string | null;
  referal: EventReferral | null;
  date: string;
  invoice: string;
  payment_option_id: string;
  payment_option: PaymentOption | null;
  created_at: string;
  updated_at: string;
};

export type ParticipantProgressStep =
  | "registered"
  | "categorized"
  | "paid"
  | "verified"
  | "select_institution"
  | "fill_biodatas"
  | "locked";
import { EventCategory } from "../event-category/dto";
import { Institution } from "../event-instansi/dto";
import { PaymentOption } from "../event-payment/dto";
import { EventReferral } from "../event-referral/dto";
import { EventRegion } from "../event-region/dto";

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
  biodata: BiodataMember[] | null;
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

export type BiodataMember = {
  id: string;
  name: string;
  gender: "male" | "female";
  email: string;
  phone: string;
  id_number: string; // NIS/NISN
  id_card_picture?: string;
};

export type ParticipantDetail = Participant;

import { EventCategory } from "../event-category/dto";
import { Institution } from "../event-instansi/dto";
import { PaymentOption } from "../event-payment/dto";
import { EventRegion } from "../event-region/dto";
import { Event } from "../event/dto";
import { Participant, ParticipantProgressStep } from "../participant/dto";

export type ParticipantAdmistration = Participant & {
  event: Event;
};

export type ParticipantData = {
  is_locked: boolean;
  is_verfied: boolean;
  participant: ParticipantAdmistration & {
    category: EventCategory | null;
    region: EventRegion | null;
    institution: Institution | null;
    payment: ParticipantPayment | null;
    biodata: ParticipantBiodata[] | null;
  };
};

export type ParticipantBiodata = {
  id: string;
  name: string;
  gender: "male" | "female";
  phone: string;
  email: string;
  id_number: string;
  id_card_picture: string;
};

export type ParticipantPayment = {
  bank_name: string;
  bank_account: string;
  referal_id: string;
  date: string;
  invoice: string;
  payment_option_id: string;
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

export type EventPaymentOptions = PaymentOption[];

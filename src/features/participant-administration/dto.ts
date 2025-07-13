import { EventCategory } from "../event-category/dto";
import { PaymentOption } from "../event-payment/dto";
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
    payment: ParticipantPayment | null;
  };
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

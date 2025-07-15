export type ParticipantProgressStep =
  | "registered"
  | "categorized"
  | "paid"
  | "verified"
  | "select_institution"
  | "fill_biodatas"
  | "locked";
import { EventCategory } from "../event-category/dto";
import { EventRegion } from "../event-region/dto";

export type PaymentStep = "all" | "paid" | "unpaid";

export type Event = {
	id: string;
	admin_id: string;
	name: string;
	desc: string;
	group_member_num: number;
	icon: string;
	participant_target: number;
	period: string;
	active: boolean;
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
};

export type Participant = {
	id: string;
	event_id: string;
	event: Event;
	region_id: string | null;
	region: EventRegion | null;
	category_id: string | null;
	category: EventCategory | null;
	name: string;
	institution_id: string | null;
	email: string;
	biodata: BiodataMember[];
	progress_step: ParticipantProgressStep;
	verified_at?: string;
	locked_at?: string;
	created_at: string;
	updated_at: string;
};

export type ParticipantDetail = Participant;

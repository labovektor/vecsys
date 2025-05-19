export interface Institution {
	id: string;
	event_id: string;
	name: string;
	email: string;
	pendamping_name: string;
	pendamping_phone: string;
	issuer: string;
	created_at: string;
	updated_at: string | null;
}

export interface CreateInstitutionDTO {
	name: string;
	email: string;
	pendamping_name: string;
	pendamping_phone: string;
}

export interface UpdateInstitutionDTO {
	name: string;
	email: string;
	pendamping_name: string;
	pendamping_phone: string;
}

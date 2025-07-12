export interface PaymentOption {
	id: string;
	event_id: string;
	provider: string;
	account: string;
	name: string;
	as_qr: boolean;
	created_at: string;
	updated_at: string | null;
}

export interface PaymentOption {
  id: string;
  event_id: string;
  provider: string;
  account: string;
  name: string;
  as_qr: boolean;
  amount: number;
  created_at: string;
  updated_at: string | null;
}

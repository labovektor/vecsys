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

export type EventCategory = {
  id: string;
  event_id: string;
  name: string;
  is_group: boolean;
  visible: boolean;
  created_at: string;
  updated_at: string;
};

export interface Discipline {
  _id: string;
  name: string;
  period: string;
  attended: string;
  type: string;
  ramification: string;
  credits: string;
  total_hours: string;
  credit_lock: string;
  class_in_period: string;
  discipline_id: string;
  requirements: {
    type: string;
    description: string;
  }[];
  classes: {
    number: string;
    preferential: string;
    times: string;
    teacher: string;
    offered_uerj: string;
    occupied_uerj: string;
    offered_vestibular: string;
    occupied_vestibular: string;
    request_uerj_offered: string;
    request_uerj_total: string;
    request_uerj_preferential: string;
    request_vestibular_offered: string;
    request_vestibular_total: string;
    request_vestibular_preferential: string;
  }[];
  code: string; // This will be extracted from name
  department: string; // This will be extracted from name
}

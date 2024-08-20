export enum EventCategory {
  CONCERT = 'CONCERT',
  CONFERENCE = 'CONFERENCE',
  WORKSHOP = 'WORKSHOP',
  SEMINAR = 'SEMINAR',
  EXHIBITION = 'EXHIBITION',
  MEETUP = 'MEETUP',
  FESTIVAL = 'FESTIVAL'
}

export interface EventModel {
  id: number;
  title: string;
  category: EventCategory;
  description: string;
  startDate: string;
  endDate: string;   
  location: string;
  photo: string;
  rating?: number; 
  createdDate: string; 
}

export type NewEvent = Omit<EventModel, 'id'>;

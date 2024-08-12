import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { EventModel } from '../dashboard/event-page/event';
import { EventService } from '../dashboard/event-page/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  events: EventModel[] = [];
  noEventsMessage: string = ''; 
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.fetchEvents();
  }
 
  fetchEvents(page: number = 0, size: number = 6): void {
    this.eventService.getAllEvents(page, size).subscribe({
      next: (response: any) => {
        const events: EventModel[] = response.content;
        const sortedEvents = events
          .map(event => ({
            ...event,
            // Temporarily convert startDate to Date object for comparison
            startDateTemp: new Date(event.startDate)
          }))
          .sort((a, b) => b.startDateTemp.getTime() - a.startDateTemp.getTime())
          .slice(0, 3) // Limit to the latest 3 events
          .map(event => ({
            ...event,
            startDate: event.startDateTemp.toISOString().split('T')[0] // Convert back to string in YYYY-MM-DD format
          }));
  
        if (sortedEvents.length === 0) {
          this.noEventsMessage = 'Oops! You have to wait. The events are coming soon.';
        } else {
          this.events = sortedEvents;
          this.noEventsMessage = '';
        }
      },
      error: (err: any) => {
        console.error('Error fetching events', err);
        this.noEventsMessage = 'Oops! There was an error fetching events.';
      }
    });
  }
  

  onSubmit(contactForm: any) {
    console.log('Contact Form Data:', this.contact);
  }
  onCancel() {
    console.log('Cancel button clicked');
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
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
  allEvents: EventModel[] = [];
  noEventsMessage: string = ''; 
  noAllEventsMessage: string = '';
  showAllEvents: boolean = false;
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
            startDateTemp: new Date(event.startDate)
          }))
          .sort((a, b) => b.startDateTemp.getTime() - a.startDateTemp.getTime())
          .slice(0, 3)
          .map(event => ({
            ...event,
            startDate: event.startDateTemp.toISOString().split('T')[0]
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
  fetchAllEvents(): void {
    this.showAllEvents = true;
    this.eventService.getAllEvents(0, 1000).subscribe({
      next: (response: any) => {
        this.allEvents = response.content;
        if (this.allEvents.length === 0) {
          this.noAllEventsMessage = 'Oops! No events found.';
        } else {
          this.noAllEventsMessage = '';
        }
      },
      error: (err: any) => {
        console.error('Error fetching all events', err);
        this.noAllEventsMessage = 'Oops! There was an error fetching all events.';
      }
    });
  }
  toggleAllEvents(): void {
    if (this.showAllEvents) {
      // Hide all events
      this.showAllEvents = false;
    } else {
      // Show all events
      this.fetchAllEvents();
      this.showAllEvents = true;
    }
  }
  rateEvent(eventId: number): void {
    // Prompt the user for rating input (could be a modal or a simple prompt)
    const rating = prompt('Enter your rating (1-5):');
    if (rating) {
      this.eventService.rateEvent(eventId, parseInt(rating)).subscribe({
        next: () => {
          alert('Rating submitted successfully!');
          // Refresh the event list or the specific event details as needed
        },
        error: (err: any) => {
          console.error('Error submitting rating', err);
          alert('Oops! There was an error submitting your rating.');
        }
      });
    }
  }
}
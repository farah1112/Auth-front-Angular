import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { EventCategory, EventModel } from '../dashboard/event-page/event';
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
  latestEvents: EventModel[] = [];
  filteredEvents: EventModel[] = [];
  noEventsMessage: string = ''; 
  noAllEventsMessage: string = '';
  showAllEvents: boolean = false;
  selectedCategory: string = ''; 

  contact = {
    name: '',
    email: '',
    message: ''
  };

  eventCategories: EventCategory[] = Object.values(EventCategory);

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.fetchLatestEvents();
  }

 
  fetchLatestEvents(): void {
    this.eventService.getLatestEvents().subscribe({
      next: (events: EventModel[]) => {
        this.latestEvents = events;
        this.filteredEvents = events; 
        if (this.latestEvents.length === 0) {
          this.noEventsMessage = 'No latest events found.';
        }
      },
      error: (err: any) => {
        console.error('Error fetching latest events:', err);
        this.noEventsMessage = 'Error fetching latest events.';
      }
    });
  }

  fetchEvents(page: number = 0, size: number = 6): void {
    this.eventService.getAllEvents(page, size).subscribe({
      next: (response: any) => {
        const events: EventModel[] = response.content;
  
        const sortedEvents = events
          .map(event => {
            const createdDate = new Date(event.createdDate);
            return {
              ...event,
              createdDateTemp: isNaN(createdDate.getTime()) ? new Date(0) : createdDate // Default to epoch if invalid
            };
          })
          .sort((a, b) => b.createdDateTemp.getTime() - a.createdDateTemp.getTime());
  
        // Assign the first 3 most recent events to this.events
        this.events = sortedEvents.slice(0, 3);
  
        // Assign the rest of the events to this.filteredEvents after the top 3
        this.filteredEvents = this.events.concat(sortedEvents.slice(3));
  
        if (this.events.length === 0) {
          this.noEventsMessage = 'Oops! You have to wait. The events are coming soon.';
        } else {
          this.noEventsMessage = '';
        }
      },
      error: (err: any) => {
        console.error('Error fetching events:', err);
        this.noEventsMessage = 'Oops! There was an error fetching events.';
      }
    });
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
        console.error('Error fetching all events:', err);
        this.noAllEventsMessage = 'Oops! There was an error fetching all events.';
      }
    });
  }


  toggleAllEvents(): void {
    this.showAllEvents = !this.showAllEvents;
    if (this.showAllEvents) {
      this.fetchAllEvents();
    }
  }

  
  onSubmit(contactForm: any): void {
    if (contactForm.valid) {
      console.log('Contact Form Data:', this.contact);
    } else {
      console.error('Contact form is invalid');
    }
  }


  onCancel(): void {
    console.log('Cancel button clicked');
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

 /* rateEvent(eventId: number): void {
    const rating = prompt('Enter your rating (1-5):');
    if (rating) {
      const ratingValue = parseInt(rating);
      if (ratingValue >= 1 && ratingValue <= 5) {
        this.eventService.rateEvent(eventId, ratingValue).subscribe({
          next: () => {
            alert('Rating submitted successfully!');
          },
          error: (err: any) => {
            console.error('Error submitting rating:', err);
            alert('Oops! There was an error submitting your rating.');
          }
        });
      } else {
        alert('Please enter a valid rating between 1 and 5.');
      }
    }
  }*/
    rateEvent(eventId: number): void {
      const rating = prompt('Enter your rating (1-5):');
      if (rating) {
        const ratingValue = parseInt(rating, 10);
        if (ratingValue >= 1 && ratingValue <= 5) {
          this.eventService.rateEvent(eventId, ratingValue).subscribe({
            next: (response: any) => {
              alert(response.message); // Handle the success message from the response
            },
            error: (err: any) => {
              console.error('Error submitting rating:', err);
              alert('Oops! There was an error submitting your rating.');
            }
          });
        } else {
          alert('Please enter a valid rating between 1 and 5.');
        }
      }
    }
    
  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;
    
    if (selectedCategory) {
      this.filteredEvents = this.latestEvents.filter(
        (event) => event.category === selectedCategory
      );
    } else {
      this.filteredEvents = this.latestEvents;
    }
     // Set no events message if no events are found
  this.noEventsMessage = this.filteredEvents.length === 0 ? 'No events found for this category' : '';
  }
  isExpired(event: EventModel): boolean {
    const today = new Date();
    const endDate = new Date(event.endDate); // Assuming endDate is a property of EventModel
    return endDate < today;
  }
  
}

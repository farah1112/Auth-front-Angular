import { Component, OnInit } from '@angular/core';
import { EventCategory, EventModel, NewEvent } from './event';
import { EventService } from './event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  events: EventModel[] = [];
  eventCategories = Object.values(EventCategory);
  showAddEventModal = false;
  showEditEventModal = false;
  showViewEventModal = false;
  newEvent: NewEvent = this.initializeNewEvent();
  selectedEvent: EventModel = this.initializeSelectedEvent();
  selectedFile: File | null = null; 
  baseUrl: string = 'http://localhost:8089/uploaded-photos/';
  currentPage = 0; // Start from page 0
  totalPages = 1;
  eventsPerPage = 6;
  isLoading = false; // For loading spinner


  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
    
  }
  loadEvents(): void {
    this.eventService.getAllEvents(this.currentPage, this.eventsPerPage).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.events = response.content; // Change this if your structure is different
        this.totalPages = response.totalPages;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      }
    });
}

  
  
  openAddEventModal(): void {
    this.showAddEventModal = true;
  }

  closeAddEventModal(): void {
    this.showAddEventModal = false;
    this.newEvent = this.initializeNewEvent();
    this.selectedFile = null; // Reset the file selection
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  
  addEvent(): void {
    const formData = new FormData();
    formData.append('title', this.newEvent.title);
    formData.append('category', this.newEvent.category);
    formData.append('description', this.newEvent.description);
    formData.append('startDate', this.newEvent.startDate);
    formData.append('endDate', this.newEvent.endDate);
    formData.append('location', this.newEvent.location);
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.eventService.addEvent(formData).subscribe({
      next: () => {
        this.loadEvents();
        this.closeAddEventModal();
      },
      error: (err) => {
        console.error('Error adding event:', err);
      }
    });
  }

  openEditEventModal(event: EventModel): void {
    this.selectedEvent = { ...event };
    this.showEditEventModal = true;
  }

  closeEditEventModal(): void {
    this.showEditEventModal = false;
    this.selectedEvent = this.initializeSelectedEvent();
    this.selectedFile = null; 
  }

  updateEvent(): void {
    const formData = new FormData();
    formData.append('title', this.selectedEvent.title);
    formData.append('category', this.selectedEvent.category);
    formData.append('description', this.selectedEvent.description);
    formData.append('startDate', this.selectedEvent.startDate);
    formData.append('endDate', this.selectedEvent.endDate);
    formData.append('location', this.selectedEvent.location);
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.eventService.updateEvent(this.selectedEvent.id, formData).subscribe(() => {
      this.loadEvents();
      this.closeEditEventModal();
    });
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
    });
  }

  openViewEventModal(event: EventModel): void {
    this.selectedEvent = { ...event };
    this.showViewEventModal = true;
  }

  closeViewEventModal(): void {
    this.showViewEventModal = false;
    this.selectedEvent = this.initializeSelectedEvent();
  }

  private initializeNewEvent(): NewEvent {
    return {
      title: '',
      category: EventCategory.CONCERT,
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      photo: '',
      createdDate: ''
    };
  }

  private initializeSelectedEvent(): EventModel {
    return {
      id: 0,
      title: '',
      category: EventCategory.CONCERT,
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      photo: '',
      createdDate: ''
    };
  }

  getPhotoUrl(photo: string): string {
    return this.baseUrl + photo;
  }
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEvents();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadEvents();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { EventModel } from '../dashboard/event-page/event';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EventService } from '../dashboard/event-page/event.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event: EventModel | undefined;
  stars: number[] = [1, 2, 3, 4, 5]; // Define the number of stars
  currentRating: number = 0;
  similarEvents: EventModel[] = [];
  routeSub: Subscription | undefined;


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private snackBar: MatSnackBar

  ) {}
  
  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.routeSub = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      this.loadEventDetails(id);
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.routeSub?.unsubscribe();
  }
  loadEventDetails(id: number): void {
    this.eventService.getEventById(id).subscribe((data: EventModel) => {
      this.event = data;
      this.currentRating = data.rating || 0;

      // Fetch similar events
      this.eventService.getSimilarEvents(id).subscribe((events: EventModel[]) => {
        this.similarEvents = events;
      });
    });
  }

  rateEvent(rating: number): void {
    if (this.event) {
      this.currentRating = rating;
      this.eventService.rateEvent(this.event.id, rating).subscribe(() => {
        console.log('Rating saved successfully');
      });
    }
  }
  logEvent(id: number | undefined): void {
    console.log('Navigating to event with ID:', id);
  }
  
  subscribeToEvent(): void {
    if (this.event) {
      // Assuming you have the email from the current user's session
      const email = "user@example.com"; // Replace with actual user email

      this.eventService.subscribe(this.event.id, email).subscribe({
        next: (response: string) => {
          // Display success message in a pop-up
          this.snackBar.open(response, 'Close', { duration: 5000 });
        },
        error: (err: any) => {
          // Display error message in a pop-up
          this.snackBar.open(err.error || 'An error occurred', 'Close', { duration: 5000 });
        }
      });
    }
  }
}

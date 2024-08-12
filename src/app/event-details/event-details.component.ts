import { Component, OnInit } from '@angular/core';
import { EventModel } from '../dashboard/event-page/event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../dashboard/event-page/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event: EventModel | undefined;
  stars: number[] = [1, 2, 3, 4, 5]; // Define the number of stars
  currentRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(id).subscribe((data: EventModel) => {
      this.event = data;
      this.currentRating = data.rating || 0;
    });
  }

  rateEvent(rating: number): void {
    if (this.event) {
      this.currentRating = rating;
      this.eventService.rateEvent(this.event.id, { rating }).subscribe(() => {
        console.log('Rating saved successfully');
      });
    }
  }
}

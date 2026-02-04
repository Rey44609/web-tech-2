import { Component, signal } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-activity-1',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './activity-1.component.html',
    styleUrls:['./activity-1.component.scss']
})

export class ActivityComponent {
    public title = signal('Activity ');
    
}
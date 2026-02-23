import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentRefreshService {
  private refreshTrigger = new Subject<Date>();
  refresh$ = this.refreshTrigger.asObservable();

  triggerRefresh() {
    console.log('Refresh service: triggering refresh at', new Date().toISOString());
    this.refreshTrigger.next(new Date());
  }
}

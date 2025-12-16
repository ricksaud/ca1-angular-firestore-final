import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilterService {
  private filtersSource = new Subject<any>();
  filters$ = this.filtersSource.asObservable();

  applyFilters(filters: any) {
    this.filtersSource.next(filters);
  }
}

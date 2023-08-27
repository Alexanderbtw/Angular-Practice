import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isVisible$ = new BehaviorSubject<boolean>(false);

  Open() {
    this.isVisible$.next(true);
  }

  Close() {
    this.isVisible$.next(false);
  }

  constructor() { }
}

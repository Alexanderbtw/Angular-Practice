import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
   error$ = new Subject<string>();

   Handle(message: string) {
    this.error$.next(message);
   }

   Clear() {
    this.error$.next("");
   }
}

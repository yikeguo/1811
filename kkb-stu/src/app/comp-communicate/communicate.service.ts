import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {
  private subject = new Subject<string>();

  ob = this.subject.asObservable();

  emit(msg) {
    this.subject.next(msg);
  }
  constructor() { }
}

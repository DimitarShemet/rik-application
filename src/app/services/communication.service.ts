import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private subject: Subject<any> = new Subject<string>();

  emit(message: string, payload?: any) {
    payload
      ? this.subject.next({ message, payload })
      : this.subject.next(message);
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}

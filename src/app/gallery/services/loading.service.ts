import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading = new BehaviorSubject<boolean>(false)

  constructor() { }

  startLoading() {
    this.isLoading.next(true)
  }

  stopLoading() {
    this.isLoading.next(false)
  }
}

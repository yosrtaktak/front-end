import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIdServiceService {

  private _userId: number;

  constructor() { }

  setUserId(userId: number): void {
    this._userId = userId;
  }

  getUserId(): number {
    return this._userId;
  }
}

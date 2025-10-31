import { Injectable, NgZone } from '@angular/core';
import { AuthService } from '../authentication/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  private readonly INACTIVITY_TIMEOUT = 1 * 60 * 1000;
  private timer: any;

  constructor(
    private authService: AuthService,
    private ngZone: NgZone 
  ) 
  {
    
  }

  initListener(): void {
    this.ngZone.runOutsideAngular(() => { 
      this.resetTimer();
      window.addEventListener('mousemove', () => this.resetTimer());
      window.addEventListener('click', () => this.resetTimer());
      window.addEventListener('keydown', () => this.resetTimer());
      window.addEventListener('scroll', () => this.resetTimer());
    });
  }

  private resetTimer(): void {
    clearTimeout(this.timer);
    if (this.authService.isLoggedIn()) {
      this.timer = setTimeout(() => {
    
        this.ngZone.run(() => {
          this.authService.logout();
        });
      }, this.INACTIVITY_TIMEOUT);
    }
  }
}
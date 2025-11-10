import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = null; 
    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.router.navigate(['/fee']);
        
        } else
        {
          this.errorMessage = 'Invalid username or password. Please try again.';
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Login request failed', err);
        this.errorMessage = 'An unexpected error occurred. Please check your connection and try again.';
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee',
  imports: [],
  templateUrl: './fee.component.html',
  styleUrl: './fee.component.css'
})
export class FeeComponent implements OnInit {

  constructor(private authService: AuthService,private route:Router) {}

  ngOnInit(): void {
    
  }

  createFee(): void {
    this.route.navigate(['/rbac']);
    console.log('Create Fee button clicked');
  }


}

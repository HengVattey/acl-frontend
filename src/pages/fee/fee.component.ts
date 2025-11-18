import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select'; // ✅ fix here
import { FeeService } from './fee.service';
import { Fee } from './fee.model';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-fee',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule], // ✅ fix
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css'] // ✅ fix
})
export class FeeComponent implements OnInit {
  selectedFee: Fee | null = null; 
  feeName: string = '';
  feeAmount: number | null = null;
  feeList: Fee[] = [];
  reportData = [
    {Title: 'Sales Report',  Date: '2024-01-01'},
    { Name: 'John Doe', Age: 30, City: 'New York' },
    { Name: 'Jane Smith', Age: 25, City: 'London' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private feeService: FeeService
  ) {}

  ngOnInit(): void {
    this.feeService.getFees().subscribe({
      next: (fees: Fee[]) => {
        this.feeList = fees;
        console.log('Fetched Fees:', this.feeList);
      },
      error: (err) => console.error('Error fetching fees:', err)
    });
  }

  onSelectFee(event: any): void {
    console.log('Selected fee:', this.selectedFee);
  }

  createFee(): void {
    // if (this.selectedFee) {
    //   alert(`Selected Fee: ${this.selectedFee.name} - Amount: ${this.selectedFee.amount}`);
    // } else {
    //   alert('Please select a fee first!');
    // }
  }

  exportReport(): void {
    const fileName = 'Sales_Report';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reportData);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}

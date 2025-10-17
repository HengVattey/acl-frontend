import { Component } from '@angular/core';
import { RbacService } from './rbac.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-rbac',
  imports: [CommonModule,FormsModule],
  templateUrl: './rbac.component.html',
  styleUrl: './rbac.component.css'
})
export class RBACComponent {


   user = {
    username: '',
    password: '',
    email: ''
  };



  

creatUser() {


}

  constructor(private rbacService: RbacService) {
  console.log("RBAC Component Loaded");
  this.rbacService.getUsers().subscribe(data=>{
  console.log(data);
});





//  this.rbacService.getRoles().subscribe({
//   next: (data) => {
//     console.log('Roles:', data);
//   },
//   error: (err) => {
//     if (err.status === 403) {
//       console.error('Access denied: You do not have permission.');
//       alert('You are not allowed to access this resource.');
//     } else if (err.status === 401) {
//       console.error('Unauthorized: Please login again.');
      
//     } else {
//       console.error('Other error:', err);
//     }
//   }
// });



}

 onSubmit() {
    this.rbacService.createUser(this.user).subscribe({
      next: (res) => {
        console.log('✅ Success:', res);
        alert('User created successfully!');
      },
      error: (err) => {
        console.error('❌ Error:', err);
        if (err.status === 403) alert('Access denied');
        else if (err.status === 401) alert('Unauthorized');
        else alert('Something went wrong');
      }
    });
  }


}

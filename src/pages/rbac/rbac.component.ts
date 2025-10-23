import { Component } from '@angular/core';
import { RbacService } from './rbac.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-rbac',
  imports: [CommonModule,FormsModule, TabsModule, BadgeModule, AvatarModule],
  templateUrl: './rbac.component.html',
  styleUrl: './rbac.component.css'
})
export class RBACComponent {


roles:any[]=[];

  // user = {
  //   username: '',
  //   password: '',
  //   email: '',
  //   roleId:null as number | null
  // };

    user = {
    username: '',
    password: '',
    email: ''
  };


  role = {
    name: '',
    description: ''
  };



  assignRoleToUser={
    userId: 28,
    roleId:2
  }
  constructor(private rbacService: RbacService) {
  console.log("RBAC Component Loaded");
  
  this.rbacService.getRoles().subscribe(data=>{
    this.roles = data;
    console.log(" These are roles : ", this.roles[0]);
  });
  this.rbacService.getUsers().subscribe(data=>{
  console.log(" Theses are users : ", data);
  });

}


assignRoleToUserSubmit(){
  this.rbacService.assignRoleToUser(this.assignRoleToUser).subscribe({
    next: (res) => {
        console.log(' Success:', res);
        alert('Role assigned successfully!');
      },
      error: (err) => {
        console.error(' Error:', err);  
        if (err.status === 403) alert('Access denied');
        else if (err.status === 401) alert('Unauthorized');
        else alert('Something went wrong');
      }
    });
  }

createRole(){
this.rbacService.CreateRole(this.role).subscribe({
next: (res) => {
        console.log(' Success:', res);
        alert('successfully!');
      },
      error: (err) => {
        console.error(' Error:', err);
        if (err.status === 403) alert('Access denied');
        else if (err.status === 401) alert('Unauthorized');
        else alert('Something went wrong');
      }


});

}


 onSubmit() {
    this.rbacService.createUser(this.user).subscribe({
      next: (res) => {
        console.log(' Success:', res);
        alert('User created successfully!');
      },
      error: (err) => {
        console.error(' Error:', err);
        if (err.status === 403) alert('Access denied');
        else if (err.status === 401) alert('Unauthorized');
        else alert('Something went wrong');
      }
    });
  }


}

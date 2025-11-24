import { Component, OnInit } from '@angular/core';
import { RbacService } from './rbac.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { Product } from './domain/product';
import { ProductService } from './product-service.service';
import {  User } from './domain/user';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Role, UpdateUser } from './rbac.model';
import { Dialog } from 'primeng/dialog';


@Component({
  selector: 'app-rbac',
  imports: [CommonModule,FormsModule, TabsModule, BadgeModule, AvatarModule, ButtonModule, InputTextModule,SelectModule,Dialog],
  templateUrl: './rbac.component.html',
  styleUrl: './rbac.component.css'
})
export class RBACComponent implements OnInit {

products: Product[] = [];
  roles: Role[] = [];
  users: User[] = [];
  selectedUser: any = {};
  roleList: Role[] = [];
  selectedRole: Role | null = null; 
  newPassword: string = '';
  newUsername: string = '';
  newPhoneNumber: string = '';
  speaking: string = '';


  visible: boolean = false;

   onSelectRole(event: any): void {
    console.log('Selected Role:', this.selectedRole?.roleId);
    this.user.roleId = this.selectedRole?.roleId || null;
  }
  onSubmitUpdatingUser(){
const updatedData: UpdateUser = {
  "username":this.selectedUser.username,
  "password": this.newPassword,
  "phoneNumber": this.selectedUser.phoneNumber
};
this.rbacService.updateUser(this.selectedUser.id!, updatedData).subscribe( (data:any) => {
  alert(" User updated successfully " + data);
});
  }

  showDialog(user:any) {
    this.selectedUser = { ...user };
        this.visible = true;
  }

  user = {
    username: '',
    password: '',
    email: '',
    enabled: true,
    phoneNumber: '',
    roleId: null as number | null
  };

  role = {
    name: '',
    description: ''
  };

  grantPermission={
    roleId: null as number | null,
    permissionId: null as number | null
  }

  assignRoleToUser={
    userId: null as number | null,
    roleId: null as number | null
  }

  permission={
    name: '',
    description: ''
  }

  constructor(private rbacService: RbacService,private productService: ProductService) {
  console.log("RBAC Component Loaded");
  
}
  ngOnInit(): void {
  this.productService.getProductsMini().then((data) => {
            this.products = data;});
  //this.getAllUsers();
  this.getAllRoles();
  this.getAllUsers();


  }

//Get all users 

getAllUsers() {
  this.rbacService.getUsers().subscribe(data => {
    this.users = data;
    console.log(" These are all users : ", this.users);
  });
}

getAllRoles() {
    this.rbacService.getAllRoles().subscribe({
      next: (roles: Role[]) => {
        this.roleList = roles;
        console.log('Fetched Roles:', this.roleList);
      },
      error: (err) => console.error('Error fetching roles:', err)
    });
}


//Get all roles


graintRolePermission() {
  this.rbacService.graintRolePermission(this.graintRolePermission).subscribe({
    next: (res) => {
        console.log(' Grant Permission Success:', this.graintRolePermission);
    },
    error: (err) => {
        console.error(' Error:', err);
        if (err.status === 403) alert('Access denied');
        else if (err.status === 401) alert('Unauthorized');
        else alert('Something went wrong');
    }
  });
}

assignRoleToUserSubmit(){
  this.rbacService.assignRoleToUser(this.assignRoleToUser).subscribe({
    next: (res) => {
        console.log(' Assign Role Success:', this.assignRoleToUser);
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
  console.log('Creating user with data:', this.user);
    this.rbacService.createUser(this.user).subscribe({
      next: (res) => {

        console.log(' Success:', res);
        alert('User created successfully!');
        this.user = {
          username: '',
          password: '',
          email: '',
          enabled: false,
          phoneNumber: '',
          roleId: null
        };


      },
      error: (err) => {
        console.error(' Error:', err);
        if (err.status === 403) alert('Access denied');
        else if (err.status === 401) alert('Unauthorized');
        else alert('Something went wrong');
      }
    });
}

createPermisson(){
    this.rbacService.createPermisson(this.permission).subscribe({
      next: (res) => {
          console.log(' Create Permission Success:', this.permission);
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

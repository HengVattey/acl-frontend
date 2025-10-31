import { Component, OnInit } from '@angular/core';
import { RbacService } from './rbac.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { Product } from './domain/product';
import { ProductService } from './product-service.service';
import { Role, User } from './domain/user';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-rbac',
  imports: [CommonModule,FormsModule, TabsModule, BadgeModule, AvatarModule,Dialog, ButtonModule, InputTextModule],
  templateUrl: './rbac.component.html',
  styleUrl: './rbac.component.css'
})
export class RBACComponent implements OnInit {

products: Product[] = [];
  roles: Role[] = [];
  users: User[] = [];

  visible: boolean = false;

  showDialog() {
        this.visible = true;
  }

  user = {
    username: '',
    password: '',
    email: ''
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
  this.getAllUsers();
  this.getAllRoles();


  }

//Get all users 

getAllUsers() {
  this.rbacService.getUsers().subscribe(data => {
    this.users = data;
    console.log(" These are all users : ", this.users);
  });
}

getAllRoles() {
  this.rbacService.getRoles().subscribe(data => {
    this.roles = data;
    console.log(" These are all roles : ", this.roles);
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

import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from "../pages/login/login.component";
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserActivityService } from '../pages/authentication/user-activity.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
// export class AppComponent {
//   sidebarWidth = Number(localStorage.getItem('sidebarWidth') ?? 260);
//   private startX = 0;
//   resizing = false;

//   startResize(e: MouseEvent) {
//     e.preventDefault();              // important, stops text selection
//     this.resizing = true;
//     this.startX = e.clientX;
//     document.body.style.cursor = 'col-resize';
//   }

//   @HostListener('window:mousemove', ['$event'])
//   onMouseMove(e: MouseEvent) {
//     if (!this.resizing) return;
//     const dx = e.clientX - this.startX;
//     this.startX = e.clientX;

//     // clamp width
//     const next = Math.min(420, Math.max(160, this.sidebarWidth + dx));
//     if (next !== this.sidebarWidth) this.sidebarWidth = next;
//   }

//   @HostListener('window:mouseup')
//   stopResize() {
//     if (!this.resizing) return;
//     this.resizing = false;
//     document.body.style.cursor = 'default';
//     localStorage.setItem('sidebarWidth', String(this.sidebarWidth));
//   }
// }

export class AppComponent implements OnInit {
   constructor( private auto:UserActivityService ){}
  ngOnInit(): void {
  this.auto.initListener();
  }
  sidebarWidth = Number(localStorage.getItem('sidebarWidth') ?? 260);
  resizing = false;
  collapsed = false;
  private startX = 0;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    if (this.collapsed) {
      this.sidebarWidth = 60; // collapsed width
    } else {
      // restore previous width or default
      const saved = Number(localStorage.getItem('sidebarWidth') ?? 260);
      this.sidebarWidth = saved < 160 ? 260 : saved;
    }
  }

  startResize(e: MouseEvent) {
    if (this.collapsed) return; // don’t resize when collapsed
    this.resizing = true;
    this.startX = e.clientX;
    document.body.style.cursor = 'col-resize';
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.resizing) return;
    const dx = e.clientX - this.startX;
    this.startX = e.clientX;
    this.sidebarWidth = Math.min(420, Math.max(160, this.sidebarWidth + dx));
  }

  @HostListener('window:mouseup')
  stopResize() {
    if (!this.resizing) return;
    this.resizing = false;
    document.body.style.cursor = 'default';
    localStorage.setItem('sidebarWidth', String(this.sidebarWidth));
  }
}

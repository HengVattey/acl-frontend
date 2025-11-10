import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLinkActive, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { UserActivityService } from '../pages/authentication/user-activity.service';
import { AuthService } from '../pages/authentication/auth.service';
import { RoleType } from '../pages/rbac/domain/role.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, CommonModule, RouterLink, RouterLinkActive,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

constructor(private auto: UserActivityService, public authService: AuthService) {}
color: string = '#b6b9d6ff';
logout() {
  this.authService.logout();
}
isSuperAdmin(): boolean {
  return this.authService.hasRole([RoleType.SUPER_ADMIN]);
}

isManager(): boolean {
  return this.authService.hasRole([RoleType.MANAGER, RoleType.SUPER_ADMIN]);
}
  ngOnInit(): void {
   // this.auto.initListener();
}

  sidebarWidth = Number(localStorage.getItem('sidebarWidth') ?? 260);
  resizing = false;
  collapsed = false;
  private startX = 0;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    if (this.collapsed) {
      this.sidebarWidth = 60;
    } else {
      const saved = Number(localStorage.getItem('sidebarWidth') ?? 260);
      this.sidebarWidth = saved < 160 ? 260 : saved;
    }
  }

  startResize(e: MouseEvent) {
    if (this.collapsed) return;
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

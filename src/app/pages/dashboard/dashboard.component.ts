import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  workspace = '';

  constructor(private authService: AuthService) {
    const user = this.authService.getCurrentUser();
    this.workspace = user ? user.workspace : '';
  }
}

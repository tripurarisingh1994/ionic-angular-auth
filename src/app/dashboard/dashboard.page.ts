import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  users = [];

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('users')) {
      this.users = JSON.parse(localStorage.getItem('users'));
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}

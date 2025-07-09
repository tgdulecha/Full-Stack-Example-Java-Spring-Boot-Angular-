import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // <-- fix `styleUrl` typo
})
export class AppComponent implements OnInit {
    title = 'angular-auth-starter'; 
  isAdmin: boolean = false;
  userrole: string = '';
  isloggedin: boolean = false;


  constructor(private router: Router,  public authservice: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
    this.isAdmin = this.authservice.isAdminLoggedin();
    this.isloggedin = this.authservice.isLoggedIn();
    this.userrole = this.authservice.getUserRole();
  })
}
}

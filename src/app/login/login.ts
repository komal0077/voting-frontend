


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
user = {
    username: "",
    password: ""
  }

  constructor(private auth: Auth, private router: Router) {}
login() {
  this.auth.login(this.user).subscribe({
    next: (token) => {
      this.auth.saveToken(token);  
      alert("Login Successful!");
      this.router.navigate(['/home']);
    },
    error: () => alert("Invalid Credentials!")
  });
}
}

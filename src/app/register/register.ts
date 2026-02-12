
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
 
    user = {
    username: "",
    email: "",
    password: ""
  }

  constructor(private auth: Auth, private router: Router) {}

 register() {
  console.log("Register clicked", this.user);

  this.auth.register(this.user).subscribe({
    next: (res) => {
      console.log("Response:", res);
      alert("User Registered Successfully!");
      this.router.navigate(['/login']); 
    },
    error: (err) => {
      console.log("Error:", err);
      alert("Registration Failed!");
    }
  });
}
}




import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Vote } from '../services/vote';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-voter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addvoter.html',
  styleUrls: ['./addvoter.css']
})
export class AddVoter {
  voter = {
    name: '',
    email: '',
    password: '',
    age: null,
    gender: '',
    state: '',
    constituency: ''
  };

  constructor(private voteService: Vote, private router: Router) {}

  addVoter() {
    this.voteService.addVoter(this.voter).subscribe({
      next: () => {
        Swal.fire({
          title: 'Voter Added!',
          text: 'What to proceed further?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Go to Voting',
          cancelButtonText: 'Add Another Voter'
        }).then((res) => {
          if (res.isConfirmed) {
            this.router.navigate(['/vote']);
          } else {
            this.voter = {
              name: '', email: '', password: '',
              age: null, gender: '', state: '', constituency: ''
            };
          }
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add voter.'
        });
      }
    });
  }
}

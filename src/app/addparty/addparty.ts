

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vote } from '../services/vote';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-party',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addparty.html'
})
export class AddParty {
  party = {
    name: '',
    leader: '',
    symbol: ''
  };

  constructor(private voteService: Vote, private router: Router) {}

  submit() {
    this.voteService.addParty(this.party).subscribe({
      next: () => {
        Swal.fire({
          title: 'Party Added!',
          text: 'What to proceed further?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Add Candidate',
          cancelButtonText: 'Add Another Party'
        }).then((res) => {
          if (res.isConfirmed) {
            this.router.navigate(['/add-candidate']);
          } else {
            this.party = { name: '', leader: '', symbol: '' };
          }
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add party.'
        });
      }
    });
  }
}

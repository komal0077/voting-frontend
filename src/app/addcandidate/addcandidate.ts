

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Vote } from '../services/vote';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addandidate',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './addcandidate.html',
  styleUrls: ['./addcandidate.css']
})
export class AddCandidate {

  parties:any[]=[];

  candidate = {
    name: '',
    age: null,
    gender: '',
    state: '',
    constituency: '',
    electionYear: null,
    education: '',
    symbol: '',
    resultStatus: 'PENDING',
    partyId:null
  };

  constructor(private voteService: Vote, private router: Router) {}

  ngOnInit() {
    this.voteService.getParties().subscribe((data)=>{
      this.parties=data;
    });
  }

  addCandidate() {
    this.voteService.addCandidate(this.candidate).subscribe({
      next: () => {
        Swal.fire({
          title: 'Candidate Added!',
          text: 'What to proceed further?',
          icon: 'success',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Add Voter',
          denyButtonText: 'Add Another Candidate',
          cancelButtonText: 'Go to Voting'
        }).then((res) => {
          if (res.isConfirmed) {
            this.router.navigate(['/add-voter']);
          }
          else if (res.isDenied) {
            this.candidate = {
              name: '', age: null, gender: '', state: '', constituency: '',
              electionYear: null, education: '', symbol: '', resultStatus: 'PENDING',
              partyId:null
            };
          }
          else {
            this.router.navigate(['/vote']);
          }
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add candidate.'
        });
      }
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vote } from '../services/vote';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.html'
})
export class Result implements OnInit {

  winner: any = null;
  candidateResults: any[] = [];
  partyResults: any[] = [];

  // Winner Modal
  showWinnerModal = false;
  winnerModalData: any = null;

  constructor(private voteService: Vote) {}

  ngOnInit(): void {
    this.loadWinner();
    this.loadCandidateResults();
    this.loadPartyResults();
  }

  // =======================
  // LOAD DATA
  // =======================
  loadWinner() {
    this.voteService.getWinner().subscribe({
      next: (data) => this.winner = data,
      error: (err) => console.error("Winner fetch error:", err)
    });
  }

  loadCandidateResults() {
    this.voteService.getCandidateResults().subscribe({
      next: (data) => this.candidateResults = data,
      error: (err) => console.error("Candidate results error:", err)
    });
  }

  loadPartyResults() {
    this.voteService.getPartyResults().subscribe({
      next: (data) => this.partyResults = data,
      error: (err) => console.error("Party results error:", err)
    });
  }

  // =======================
  // DELETE PARTY
  // =======================
  deleteParty(partyId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This party will be deleted !!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.voteService.deleteParty(partyId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Party successfully deleted.', 'success');
            this.ngOnInit(); // refresh lists
          },
          error: () => Swal.fire('Error!', 'Something went wrong.', 'error')
        });
      }
    });
  }

  // =======================
  // WINNER MODAL LOGIC
  // =======================
  openWinnerModal() {
    this.winnerModalData = this.winner;
    this.showWinnerModal = true;
  }

  closeWinnerModal() {
    this.showWinnerModal = false;
    this.winnerModalData = null;
  }

}

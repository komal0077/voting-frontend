

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vote } from '../services/vote';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-voting',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './voting.html',
  styleUrls: ['./voting.css'],
})
export class Voting implements OnInit {

  candidates: any[] = [];
  voters: any[] = [];

  selectedVoterId: number | null = null;
  selectedCandidateId: number | null = null;

  message: string = '';
  hasVoted = false;
  isLoading = true;

  // Modal
  showModal = false;
  modalData: any = null;

  // Pagination & Search
  voterPage = 1;
  candidatePage = 1;
  itemsPerPage = 3; // as requested: 2 cards per page

  voterSearch = '';
  candidateSearch = '';

  filteredVoters: any[] = [];
  filteredCandidates: any[] = [];

  voterTotalPages = 1;
  candidateTotalPages = 1;

  constructor(private voteService: Vote) {}

  ngOnInit(): void {
    this.loadCandidates();
    this.loadVoters();
  }

  // Load Candidates
  loadCandidates() {
    this.voteService.getCandidates().subscribe({
      next: (data) => {
        this.candidates = data || [];
        this.filteredCandidates = [...this.candidates];
        this.updateCandidatePagination();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching candidates:', err);
        this.candidates = [];
        this.filteredCandidates = [];
        this.updateCandidatePagination();
        this.isLoading = false;
      }
    });
  }

  // Load Voters
  loadVoters() {
    this.voteService.getVoters().subscribe({
      next: (data) => {
        this.voters = data || [];
        this.filteredVoters = [...this.voters];
        this.updateVoterPagination();
      },
      error: (err) => {
        console.error('Error fetching voters:', err);
        this.voters = [];
        this.filteredVoters = [];
        this.updateVoterPagination();
      }
    });
  }

  // Select Voter
  onVoterSelect(id: number) {
    this.selectedVoterId = id;

    const voter = this.voters.find(v => v.id === id);
    this.hasVoted = voter?.hasVoted || false;
  }

  // Select Candidate
  onCandidateSelect(candidateId: number) {
    this.selectedCandidateId = candidateId;
  }

  // Delete Candidate (with confirmation)
  onDelete(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "This candidate will be deleted !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.voteService.deleteCandidate(id).subscribe({
          next: (msg) => {
            Swal.fire("Deleted!", msg, "success");
            this.loadCandidates();
          },
          error: () => {
            Swal.fire("Failed!", "Failed to delete candidate", "error");
          }
        });

      }
    });
  }

  // Delete Voter (with confirmation)
  onDeleteVoter(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "This voter will be deleted !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.voteService.deleteVoter(id).subscribe({
          next: (msg) => {
            Swal.fire("Deleted!", msg, "success");
            this.loadVoters();
          },
          error: () => {
            Swal.fire("Failed!", "Failed to delete voter", "error");
          }
        });

      }
    });
  }

  // ============================
  // CAST VOTE
  // ============================
  castVote() {
    if (!this.selectedVoterId || !this.selectedCandidateId) {
      Swal.fire("Warning!", "Please select both voter and candidate.", "warning");
      return;
    }

    const voter = this.voters.find(v => v.id === this.selectedVoterId);
    if (voter?.hasVoted) {
      Swal.fire("Error!", "This voter has already voted.", "error");
      return;
    }

    Swal.fire({
      title: "Confirm Vote",
      text: "Are you sure you want to vote?",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.voteService.castVote(this.selectedVoterId!, this.selectedCandidateId!).subscribe({
          next: (response) => {
            Swal.fire("Success!", response, "success");
            this.message = response;
            this.hasVoted = true;

            const index = this.voters.findIndex(v => v.id === this.selectedVoterId);
            if (index !== -1) this.voters[index].hasVoted = true;
          },
          error: () => {
            Swal.fire("Error!", "Something went wrong!", "error");
          }
        });
      }
    });
  }

  // ============================
  // MODAL METHODS (READ MORE)
  // ============================

  openModal(candidate: any) {
    this.modalData = candidate;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalData = null;
  }

  // ============================
  // SEARCH & PAGINATION LOGIC
  // ============================

  // FILTERS
  filterVoters() {
    const q = (this.voterSearch || '').trim().toLowerCase();
    if (!q) {
      this.filteredVoters = [...this.voters];
    } else {
      this.filteredVoters = this.voters.filter(v =>
        (v.name || '').toString().toLowerCase().includes(q)
      );
    }
    this.voterPage = 1;
    this.updateVoterPagination();
  }

  filterCandidates() {
    const q = (this.candidateSearch || '').trim().toLowerCase();
    if (!q) {
      this.filteredCandidates = [...this.candidates];
    } else {
      this.filteredCandidates = this.candidates.filter(c =>
        (c.name || '').toString().toLowerCase().includes(q)
      );
    }
    this.candidatePage = 1;
    this.updateCandidatePagination();
  }

  // VOTER PAGINATION
  updateVoterPagination() {
    this.voterTotalPages = Math.max(1, Math.ceil(this.filteredVoters.length / this.itemsPerPage));
    if (this.voterPage > this.voterTotalPages) this.voterPage = this.voterTotalPages;
  }

  get paginatedVoters() {
    const start = (this.voterPage - 1) * this.itemsPerPage;
    return this.filteredVoters.slice(start, start + this.itemsPerPage);
  }

  nextVoterPage() {
    if (this.voterPage < this.voterTotalPages) this.voterPage++;
  }

  prevVoterPage() {
    if (this.voterPage > 1) this.voterPage--;
  }

  // CANDIDATE PAGINATION
  updateCandidatePagination() {
    this.candidateTotalPages = Math.max(1, Math.ceil(this.filteredCandidates.length / this.itemsPerPage));
    if (this.candidatePage > this.candidateTotalPages) this.candidatePage = this.candidateTotalPages;
  }

  get paginatedCandidates() {
    const start = (this.candidatePage - 1) * this.itemsPerPage;
    return this.filteredCandidates.slice(start, start + this.itemsPerPage);
  }

  nextCandidatePage() {
    if (this.candidatePage < this.candidateTotalPages) this.candidatePage++;
  }

  prevCandidatePage() {
    if (this.candidatePage > 1) this.candidatePage--;
  }
}

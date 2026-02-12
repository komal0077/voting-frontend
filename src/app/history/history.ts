

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Vote } from '../services/vote';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.html',
})
export class History implements OnInit {

  histories: any[] = [];
  searchYear: string = "";
  year = "";
  state = "";
  message = "";

  constructor(private voteService: Vote) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  save() {
    this.voteService.saveHistory(this.year, this.state).subscribe({
      next: (res) => {
        Swal.fire("Success", res, "success");
        this.message = res;
        this.loadHistory();
      },
      error: () => Swal.fire("Error", "Failed to save history", "error")
    });
  }

  loadHistory() {
    this.voteService.getHistory().subscribe({
      next: (data) => {
        console.log("API Response:", data);
        this.histories = data.sort((a: any, b: any) => Number(b.year) - Number(a.year));
      },
      error: () => Swal.fire("Error", "Failed to load history", "error")
    });
  }

  filteredHistory() {
    return this.histories.filter(h =>
      h.year.toString().toLowerCase().includes(this.searchYear.toLowerCase())
    );
  }

  deleteHistory(id: number) {
    Swal.fire({
      title: "Confirm Delete?",
      text: "This record will be removed permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        this.voteService.deleteHistory(id).subscribe({
          next: () => {
            Swal.fire("Deleted!", "Record removed.", "success");
            this.loadHistory();
          },
          error: () => Swal.fire("Error", "Failed to delete record", "error")
        });
      }
    });
  }

}


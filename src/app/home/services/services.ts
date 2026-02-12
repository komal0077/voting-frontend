



import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
services = [
    {
      title: 'Associations',
      image: 'https://logo.com/image-cdn/images/kts928pd/production/c6c1b266366f12756cafe7cd63100e36e3ce645b-731x731.png?w=1080&q=80',
      description: 'Seamless digital elections for large associations ensuring transparency and fairness.'
    },
    {
      title: 'College Clubs',
      image: 'https://img.freepik.com/premium-vector/college-student-logo-template-design-vector-emblem-design-concept-creative-symbol-icon_316488-4350.jpg?w=1380',
      description: 'Conduct quick and fair club elections with secure online voting — perfect for students.'
    },
    {
      title: 'NGOs',
      image: 'https://thumbs.dreamstime.com/b/ngo-organization-black-glyph-icon-non-profit-community-pictogram-web-page-mobile-app-promo-vector-illustration-193374989.jpg',
      description: 'Enable democratic decision-making within NGOs through trusted digital voting.'
    },
    {
      title: 'Unions',
      image: 'https://cdn3.vectorstock.com/i/1000x1000/18/57/logo-union-vector-12031857.jpg',
      description: 'Simplify elections in professional unions with verified members and secure ballots.'
    },
     {
      title: 'Corporate',
      image: 'https://tse2.mm.bing.net/th/id/OIP.4HRsoslKAfl4hmfCioG5IQHaHa?cb=ucfimg2&pid=ImgDet&ucfimg=1&w=192&h=192&c=7&dpr=1.7&o=7&rm=3',
      description: 'eVoting technology for elections, resolutions and opinion polls in Corporates.'
    },
    {
      title: 'Others',
      image: 'https://thumbs.dreamstime.com/b/helping-hands-care-hands-logo-icon-vector-designs-white-background-ai-illustrations-globe-people-helping-hands-care-hands-162171839.jpg',
      description: 'Any group or organization can adopt our secure voting system for reliable results.'
    },
  ];

  // Pagination
  currentPage = 1;
  itemsPerPage = 3;
Math=Math;
  get paginatedServices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.services.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.services.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}


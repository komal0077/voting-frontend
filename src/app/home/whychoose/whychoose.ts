import * as AOS from 'aos';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whychoose',
  imports: [],
  templateUrl: './whychoose.html',
  styleUrl: './whychoose.css',
})
export class Whychoose implements OnInit {
  ngOnInit(): void {
      AOS.init({
        duration:1000,
        once:true
      });
  }

}


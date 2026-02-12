import { Component } from '@angular/core';
import { Banner } from './banner/banner';
import { Whychoose } from './whychoose/whychoose';
import { Services } from './services/services';

@Component({
  selector: 'app-home',
  imports: [Banner,Whychoose,Services],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}

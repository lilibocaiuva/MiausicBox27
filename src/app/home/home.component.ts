import { Component } from '@angular/core';
import { CarrouselComponent } from "../carrousel/carrousel.component";
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarrouselComponent, RouterModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { }


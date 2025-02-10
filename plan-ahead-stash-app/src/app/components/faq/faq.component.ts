import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [AccordionModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

  // can be from db
  tabs = [
    {id: 0, title: "What is Sukuk?", content: "Sit ut elit et magna. Ex consectetur amet veniam ullamco esse non amet dolor adipisicing dolor. Voluptate irure consectetur Lorem Lorem sit incididunt est. Commodo ad esse nostrud ullamco enim. Culpa fugiat eiusmod culpa velit exercitation veniam veniam quis id commodo dolor elit labore. Cupidatat non nulla ex eiusmod dolor. Ea culpa tempor id eiusmod aute in non culpa sint reprehenderit."},
    {id: 1, title: "What is Wakala?", content: "Quis minim cillum irure nulla officia sint adipisicing anim nisi anim reprehenderit ad. Consequat quis aliqua duis ea veniam non id pariatur fugiat ea est et sunt et. Labore sunt voluptate sit aute pariatur nulla elit ex velit sint. Quis cupidatat aute qui excepteur amet ex sint commodo amet velit. Cillum voluptate veniam dolore labore. Minim sint adipisicing excepteur amet."}
  ];
}

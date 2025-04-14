import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isDark = signal<boolean>(false);

  constructor() {
    let mode = localStorage.getItem("mode");
    this.setMode(mode);
  }


  setMode(mode: string | null) {
    if (mode) {
      localStorage.setItem("mode", mode);
    }
  }

  toggleDarkMode() {
    const element = document.querySelector('html')!;
    element.classList.toggle('my-app-dark');
    this.isDark.set(!this.isDark());
    let mode: string = this.isDark() ? "dark" : "light";
    this.setMode(mode);
  }


  
}
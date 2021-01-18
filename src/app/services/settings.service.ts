import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    const theme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';

    this.linkTheme.setAttribute('href', theme);
  }

  // * method to change the theme
  changeTheme(theme: string) {

    const url = `./assets/css/colors/${theme}.css`; // * get the url path

    this.linkTheme.setAttribute('href', url); // * setting the attribute href

    localStorage.setItem('theme', url); // * save on local storage

    this.checkCurrentTheme(); // * call the method

  }

  // * method to check in colors
  checkCurrentTheme() {

    const links =  document.querySelectorAll('.selector'); // * Get all of selectors

    // * looping the elements
    links.forEach(elem => {
      elem.classList.remove('working'); // * if exists the class working is deleted

      const btnTheme = elem.getAttribute('data-theme'); // * get the custom element 'data-theme'
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`; // * change the url path
      const currentTheme = this.linkTheme.getAttribute('href'); // * get the element href

      // * if the path is the same in href
      if(btnThemeUrl ===  currentTheme) {
        elem.classList.add('working'); // * add the class working
      }

    });

  }
}

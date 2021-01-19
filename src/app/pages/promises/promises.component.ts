import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUser()
      .then( user => {
        console.log(user)
      })

    // const promise = new Promise( (resolve, reject) => {

    //   if(false) {
    //     resolve('Hello, World')
    //   } else {
    //     reject('Dont Hello')
    //   }

    // });

    // promise.then( (data) => {
    //   console.log('Give me the hello, ', data)
    // }).catch( error => {
    //   console.log('this is the error, ', error)
    // })

    // console.log('Final')

  }

  getUser() {

    return new Promise( (resolve, reject) => {

      fetch('https://reqres.in/api/users')
        .then( res => res.json())
        .then(body => resolve(body.data))
    })

  }

}

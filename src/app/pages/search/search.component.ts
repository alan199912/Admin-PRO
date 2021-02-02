import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearcherService } from 'src/app/services/searcher.service';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  public users: Array<User> = new Array<User>();
  public doctors: Array<Doctor> = new Array<Doctor>();
  public hospitals: Array<Hospital> = new Array<Hospital>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private searcherService: SearcherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => this.searchAll(term));
  }

  searchAll(term: string) {
    this.searcherService.searchAll(term).subscribe((res: any) => {
      console.log(res);
      this.users = res.user;
      this.doctors = res.doctor;
      this.hospitals = res.hospital;
    });
  }

  openDoctor(doctor: Doctor) {
    this.router.navigateByUrl(`/dashboard/doctor/${doctor._id}`);
  }
}

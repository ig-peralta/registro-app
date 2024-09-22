import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Class } from 'src/app/_utils/interfaces/class.interface';
import { ClassService } from 'src/app/services/class/class.service';

@Component({
  selector: 'app-my-class',
  templateUrl: './my-class.page.html',
  styleUrls: ['./my-class.page.scss'],
})
export class MyClassPage implements OnInit {
  private readonly router = inject(Router);
  private readonly classService = inject(ClassService);

  class: Class | null = null;

  ngOnInit(): void {
    this.classService.class.subscribe((value: Class | null) => {
      if (value) {
        this.class = value;
      }
    });
  }

  goToHome(): void {
    this.router.navigateByUrl('/tabs/home');
  }
}

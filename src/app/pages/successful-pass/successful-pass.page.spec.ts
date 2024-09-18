import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessfulPassPage } from './successful-pass.page';

describe('SuccessfulPassPage', () => {
  let component: SuccessfulPassPage;
  let fixture: ComponentFixture<SuccessfulPassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

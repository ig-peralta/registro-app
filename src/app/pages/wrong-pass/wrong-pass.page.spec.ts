import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WrongPassPage } from './wrong-pass.page';

describe('WrongPassPage', () => {
  let component: WrongPassPage;
  let fixture: ComponentFixture<WrongPassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

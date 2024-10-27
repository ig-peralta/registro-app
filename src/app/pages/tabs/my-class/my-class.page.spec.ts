import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyClassPage } from './my-class.page';

describe('MyClassPage', () => {
  let component: MyClassPage;
  let fixture: ComponentFixture<MyClassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

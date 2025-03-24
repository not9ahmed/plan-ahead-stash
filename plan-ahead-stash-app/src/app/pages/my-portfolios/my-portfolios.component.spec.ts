import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPortfoliosComponent } from './my-portfolios.component';

describe('MyPortfoliosComponent', () => {
  let component: MyPortfoliosComponent;
  let fixture: ComponentFixture<MyPortfoliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPortfoliosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPortfoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

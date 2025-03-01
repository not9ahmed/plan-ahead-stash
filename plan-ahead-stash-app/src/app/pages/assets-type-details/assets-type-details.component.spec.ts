import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsTypeDetailsComponent } from './assets-type-details.component';

describe('AssetsTypeDetailsComponent', () => {
  let component: AssetsTypeDetailsComponent;
  let fixture: ComponentFixture<AssetsTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsTypeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

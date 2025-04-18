import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsTypeComponent } from './assets-type.component';

describe('AssetsTypeComponent', () => {
  let component: AssetsTypeComponent;
  let fixture: ComponentFixture<AssetsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

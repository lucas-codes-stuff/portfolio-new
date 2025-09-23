import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunWithArtComponent } from './funwithart.component';

describe('FunWithArtComponent', () => {
  let component: FunWithArtComponent;
  let fixture: ComponentFixture<FunWithArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunWithArtComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FunWithArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

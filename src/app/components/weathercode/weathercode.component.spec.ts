import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeathercodeComponent } from './weathercode.component';

describe('WeathercodeComponent', () => {
  let component: WeathercodeComponent;
  let fixture: ComponentFixture<WeathercodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeathercodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathercodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

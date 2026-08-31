import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeModule } from './time-module';

describe('TimeModule', () => {
  let component: TimeModule;
  let fixture: ComponentFixture<TimeModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

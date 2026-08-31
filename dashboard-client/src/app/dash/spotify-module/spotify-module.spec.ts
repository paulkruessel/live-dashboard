import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotifyModule } from './spotify-module';

describe('SpotifyModule', () => {
  let component: SpotifyModule;
  let fixture: ComponentFixture<SpotifyModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SpotifyModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

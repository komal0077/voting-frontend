import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addparty } from './addparty';

describe('Addparty', () => {
  let component: Addparty;
  let fixture: ComponentFixture<Addparty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addparty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addparty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addvoter } from './addvoter';

describe('Addvoter', () => {
  let component: Addvoter;
  let fixture: ComponentFixture<Addvoter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addvoter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addvoter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotChangeComponent } from './slot-change.component';

describe('SlotChangeComponent', () => {
  let component: SlotChangeComponent;
  let fixture: ComponentFixture<SlotChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

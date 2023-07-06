import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedPaginationComponent } from './updated-pagination.component';

describe('UpdatedPaginationComponent', () => {
  let component: UpdatedPaginationComponent;
  let fixture: ComponentFixture<UpdatedPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

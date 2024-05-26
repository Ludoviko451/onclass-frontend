import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { MoleculesModule } from '../molecules.module';
import { HttpClientModule } from '@angular/common/http';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculesModule, HttpClientModule],
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a prev and next button', () => {
    component.totalPages = 10;
    component.currentPage = 5;
    const prevButton = fixture.nativeElement.querySelector('.fa-chevron-right');
    const nextButton = fixture.nativeElement.querySelector('.fa-chevron-left');
    expect(prevButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
  });

  it('should have a button for each page', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.pagination__nav-button');
    expect(buttons).toBeTruthy();
  });

  it('should change the current page and emit the pageChanged event on onPageClick', () => {
    spyOn(component.pageChanged, 'emit');

    const pageToClick = 2;
    component.onPageClick(pageToClick);

    expect(component.currentPage).toBe(pageToClick);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(pageToClick);
  });

  it('should update displayed pages correctly', () => {
    component.type = "Tecnologia"
    // Scenario 1: Total pages less than max displayed pages
    component.totalPages = 2;
    component.currentPage = 0;
    component.updateDisplayedPages();
    expect(component.displayedPages).toEqual([0, 1]);

    // Scenario 2: Current page at the start of the range
    component.totalPages = 5;
    component.currentPage = 0;
    component.updateDisplayedPages();
    expect(component.displayedPages).toEqual([0, 1, 2]);

    // Scenario 3: Current page in the middle of the range
    component.totalPages = 5;
    component.currentPage = 2;
    component.updateDisplayedPages();
    expect(component.displayedPages).toEqual([1, 2, 3]);

    // Scenario 4: Current page at the end of the range
    component.totalPages = 5;
    component.currentPage = 4;
    component.updateDisplayedPages();
    expect(component.displayedPages).toEqual([2, 3, 4]);

    // Scenario 5: Total pages more than max displayed pages, current page at the middle
    component.totalPages = 10;
    component.currentPage = 5;
    component.updateDisplayedPages();
    expect(component.displayedPages).toEqual([4, 5, 6]);
  });

  it('should go to next page on goToNext', () => {
    component.totalPages=5
    component.currentPage=2
    component.goToNext();
    expect(component.currentPage).toBe(3);
  });

  it('should go to previous page on goToPrev', () => {
    component.currentPage = 2
    component.goToPrev();
    expect(component.currentPage).toBe(1);
  });

  it('should initialize correctly in ngOnInit when type is Technology', () => {
    component.type = "Tecnologia"
    spyOn(component, 'loadTechnologyList')
    component.ngOnInit();
    expect(component.loadTechnologyList).toHaveBeenCalled();
    expect(component.currentPage).toBe(0);
  })

  it('should initialize correctly in ngOnInit when type is Capacity', () => {
    component.type = "Capacidad"
    spyOn(component, 'loadCapacityList')
    component.ngOnInit();
    expect(component.loadCapacityList).toHaveBeenCalled();
    expect(component.currentPage).toBe(0);
  })

  it('should load technologyList and set totalPages', () => {
    component.type = "Tecnologia"
    component.pageSize = 10
    component.loadTechnologyList();
    expect(component.technologyList$).toBeDefined();
    component.technologyList$.subscribe(technologies => {
      expect(technologies.length).toBe(2);
    })

    expect(component.totalPages).toBe(1);
    expect(component.currentPage).toBe(0);
  })

  it('shoud loac capacityList and set totalPages', () => {
    component.type = "Capacidad"
    component.pageSize = 10
    component.loadCapacityList();
    expect(component.capacityList$).toBeDefined();
    component.capacityList$.subscribe(capacities => {
      expect(capacities.length).toBe(2);
    })
    expect(component.totalPages).toBe(1);
    expect(component.currentPage).toBe(0);
  })
});
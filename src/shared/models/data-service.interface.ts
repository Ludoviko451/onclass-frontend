import { Observable } from 'rxjs';

export interface DataService<T> {
  getData(): Observable<T[]>;
  changeOrder(): void;
  changePage(page: number): void;
  changeSize(size: number): void;
}

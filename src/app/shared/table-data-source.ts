import {DataSource} from '@angular/cdk/table';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {delegateLevelValue} from './constants';


export class AppTableDataSource extends DataSource<any> {

  public data: any = [];
  properties: any;

  constructor(data: any[], properties: any, public paginator: MatPaginator, public sort: MatSort) {
    super();
    this.data = data;
    this.properties = properties;
  }

  connect(): Observable<any[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    // this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      // return this.getPagedData(this.getSortedData([...this.data]));  gunakan ini jika datanya diload semua diawal
      return this.getSortedData([...this.data]);
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }


  private getPagedData(data: any[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: any[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    // const isStringDataTypes = this.properties.

    return data.sort((a: any, b: any) => {

      // case 'uuid': return compare(+a.uuid, +b.uuid, isAsc); pake + jika angka

      const isAsc = this.sort.direction === 'asc';

      let i = 0;
      for (const ident of this.properties.displayedColumns) {
        if (this.sort.active === ident ) {
          return (this.properties.isStringDataTypes[i])
            ? compare(delegateLevelValue(a, this.properties.levelsOnData[i]),
              delegateLevelValue(b, this.properties.levelsOnData[i]), isAsc)
            : compare(+delegateLevelValue(a, this.properties.levelsOnData[i]),
              +delegateLevelValue(b, this.properties.levelsOnData[i]), isAsc);
        }

        i++;
      }

      return 0;
    });
  }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

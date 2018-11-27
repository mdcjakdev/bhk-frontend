import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface MasterUnitTableItem {
  name: string;
  id: number;
}


/**
 * Data source for the MasterUnitTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MasterUnitTableDataSource extends DataSource<any> {
  data: any = [];

  constructor(data: any[], public paginator: MatPaginator, public sort: MatSort) {
    super();
    this.data = data;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MasterUnitTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MasterUnitTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MasterUnitTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a: any, b: any) => {

    // case 'uuid': return compare(+a.uuid, +b.uuid, isAsc); pake + jika angka

      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'tahunAjar':
          return compare(a.uuidKurikulum.uuidTahunAjar.tahunAjar, b.uuidKurikulum.uuidTahunAjar.tahunAjar, isAsc);
        case 'namaPegawai':
          return compare(a.uuidPegawai.namaPegawai, b.uuidPegawai.namaPegawai, isAsc);
        case 'uuid':
          return compare(a.uuid, b.uuid, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

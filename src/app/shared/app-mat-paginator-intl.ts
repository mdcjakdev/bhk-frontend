import {MatPaginatorIntl} from '@angular/material';


export class AppMatPaginatorIntl extends MatPaginatorIntl {

  itemsPerPageLabel = 'Jumlah Item/ Halaman';
  firstPageLabel    = 'Halaman Pertama';
  lastPageLabel     = 'Halaman Terakhir';
  nextPageLabel     = 'Selanjutnya';
  previousPageLabel = 'Sebelumnya';


  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return `0 dari ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} dari ${length}`;
  };


}

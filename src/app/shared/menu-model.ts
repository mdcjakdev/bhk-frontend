

/**
 * Menu Model
 */
export interface MenuModel {

  // url link
  url?: string;

  // icon gambar yang akan digunakan pada menu
  icon?: string;

  // selector id untuk menu
  selector: string[];

  // Deskripsi menu yang ditampilkan
  menu: string;

  // css class dari warna menu yang terpilih
  cssClassOfColor?: string;

  // apakah menggunakan garis menu item atau tidak
  divider?: boolean;

  // Child untuk menu item
  childs?: MenuModel[];

  // jika yang dimasukin sebagai menu, apakah merupakan tombol back
  isBackButton: boolean;


  backButtonCallback: any;

}

import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Ui} from '../../../shared/ui';
import {MatExpansionPanel, MatMenuTrigger, MatPaginator, MatSort} from '@angular/material';
import {MasterUnitService} from '../../../services/master/master-unit.service';
import {delayHttpRequest} from '../../../shared/constants';
import {MasterUnitTableDataSource} from './master-unit-table-datasource';
import {MediaMatcher} from '@angular/cdk/layout';
import {ComponentUtil} from '../../../shared/component-util';

declare const $: any;

@Component({
  selector: 'app-master-unit',
  templateUrl: './master-unit.component.html',
  styleUrls: ['./master-unit.component.scss'],
  providers: [
    MasterUnitService
  ]
})
export class MasterUnitComponent
  extends ComponentUtil
  implements OnInit {

  @ViewChild(MatExpansionPanel) searchPanel;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('triggerMenuRow', { read: MatMenuTrigger}) menuData: MatMenuTrigger;

  awaitRefresh = false;
  awaitSearchIsCollapsed = false;
  awaitSearch = false;
  firstInit = false;

  receivedData: any;


  dataSource: MasterUnitTableDataSource;
  displayedColumns = ['uuid', 'namaPegawai', 'tahunAjar'];

  constructor(private masterUnitHttpService: MasterUnitService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    super(changeDetectorRef, media);
  }


  searchExpanded() {
    this.awaitSearchIsCollapsed = false;
  }

  searchCollapsed() {
    this.awaitSearchIsCollapsed = true;
  }

  ngOnInit() {
    this.dataSource = new MasterUnitTableDataSource([], this.paginator, this.sort);
    this.executeToGetData();

  }



  cobain(event, row) {
    this.showTableMenuOnRightClick(event, this.menuData);
    // event.preventDefault();
    // this.yContextMenu = this.positioningXY(event).y;
    // this.xContextMenu = this.positioningXY(event).x;
    // this.menuData.openMenu();
    //
    // document.getElementsByClassName('cdk-overlay-container')[0].addEventListener('contextmenu', (offEvent: any) => {
    //   this.menuData.closeMenu();
    //   offEvent.preventDefault();
    // });
  }

  executeToGetData() {
    this.awaitRefresh = true;
    Ui.blockUI('#card-wrapper');
    setTimeout(() => {
      this.masterUnitHttpService.getData().subscribe(
        value => {
          this.receivedData = value;
          this.dataSource = new MasterUnitTableDataSource(value['content'], this.paginator, this.sort);
          },
        error1 => {},
        () => {
          this.firstInit = (!this.firstInit) ? !this.firstInit : this.firstInit; // init awal kompoenent

          Ui.unblockUI('#card-wrapper');
          this.awaitRefresh = false;


        }
      );
    }, delayHttpRequest);
  }






  tes2() {
    this.awaitSearch = true;
    Ui.blockUI('#card-search', 0.9, 60);
    setTimeout(() => {
      this.awaitSearch = false;
      Ui.unblockUI('#card-search');
      this.searchPanel.close();
    }, 5000);
  }



}

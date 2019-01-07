
/*-----------------------------------------l'importation d'Angular material ------------------------------------------------*/

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';


import {MatMenuModule} from '@angular/material/menu';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatInputModule, MatGridListModule, ScrollDispatchModule,MatMenuModule,
    DragDropModule,ScrollingModule,CdkTableModule,CdkTreeModule,MatPaginatorModule,MatIconModule,MatSelectModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatInputModule, MatGridListModule, ScrollDispatchModule,
    MatMenuModule,DragDropModule,ScrollingModule,CdkTableModule,CdkTreeModule,MatPaginatorModule,MatIconModule,MatSelectModule],
})


export class MaterialModule { }

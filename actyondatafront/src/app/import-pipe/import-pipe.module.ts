import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertDataBrPipe } from '../shared/pipes/convert-data-br.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ConvertDataBrPipe
  ],
  exports: [
    ConvertDataBrPipe
  ]
})
export class ImportPipeModule { }

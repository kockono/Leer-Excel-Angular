import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    ExcelData:any;

    constructor() {

    }

    LeerExcel(archivo:any) {
        let file = archivo?.target.files[0];

        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);

        fileReader.onload = (e) => {
            let workBook = XLSX.read(fileReader.result, { type: 'binary', cellDates: true}, );
            let sheetNames = workBook.SheetNames;

            this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
            console.log(  this.ExcelData )
            // XLSX.utils.sheet_to_csv
        }

    }
}

import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    ExcelData:any;


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

    editarId(id:any) {

    }
    editarNombre(nombre:any, index:number) {
      console.log(`AppComponent ~ editarNombre ~ index`, index)
      console.log(`AppComponent ~ editarNombre ~ nombre`, nombre)

      this.ExcelData[index].Nombre = this.ExcelData[index].Nombre.toLowerCase();

    }
    editarRecurso(recurso:string) {

    }
    edtarFecha(fecha:string) {

    }

    crearArchivo() {
      // Acquire Data (reference to the HTML table)
      var table_elt = document.getElementById("my-table-id");

      // Extract Data (create a workbook object from the table)
      var workbook = XLSX.utils.table_to_book(table_elt);

      // Process Data (add a new row)
      var ws = workbook.Sheets["Sheet1"];
      XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1})

      XLSX.writeFile(workbook, "Report.xlsx");
    }
}

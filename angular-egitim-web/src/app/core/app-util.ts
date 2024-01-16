import * as XLSX from "xlsx";
// @ts-ignore
import {Big} from 'big.js/big.mjs';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";


export default class AppUtil {

  static exportToExcel(e: any, rows: any, fileName: string) {
    if (e) {
      const cbx = e.currentTarget;
      setTimeout(() => {
        cbx.checked = false;
      }, 1000);
    }
    const EXCEL_EXTENSION = '.xlsx';
    const customRows = JSON.parse(JSON.stringify(rows));
    customRows.forEach((row: any) => {
      Object.keys(row).forEach(function (k) {
        if (k == 'id' || k == 'createdAt' || k == 'updatedAt') {
          delete row[k];
        }
        if (typeof row[k] == 'object') {
          row[k] = JSON.stringify(row[k]);
        }
      });
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(customRows);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }

  static BigDecimal(number: any, decimal: number) {
    return number ? new Big(number).toFixed(decimal) : null;
  }

  static BigDecimalWithDef(number: any, decimal: number, def: number) {
    return number ? new Big(number).toFixed(decimal) : def;
  }

  static ProperCase(str: string) {
    return str.replace(new RegExp('_', 'g'), ' ').replace(/([^\W_]+[^\s-]*) */g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }


  static arrayRemove(array: any, obj: any) {
    const index = array.indexOf(obj);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  static arrayGroupCount(arr: any, prop: any) {
    const counts: any = {};
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const key = item[prop];
      counts[key] = counts[key] ? counts[key] + 1 : 1;
    }
    return counts;
  }

  static parseExcelFile(e: any) {
    type AOA = any[][];
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    const xlsData = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
    const data: Array<any> = [];
    xlsData.forEach((row) => {
      if (row[0]) {
        data.push(row[0].trim());
      }
    });
    return data;
  }

  static formatFileSize(fileList: Array<any>, field: string, isMBorGB: string) {
    let temp = 0;
    fileList.forEach((file: any) => {
      if (file[field]) {
        if (isMBorGB == 'MB') {
          temp = (Number(file[field]) / 1048576);
          if (temp < 1000) {
            file[field] = (Number(file[field]) / 1048576).toFixed(2) + " MB";
          } else {
            file[field] = (Number(file[field]) / 1073741824).toFixed(2) + " GB";
          }
        }
        if (isMBorGB == 'GB') {
          file[field] = (Number(file[field]) / 1073741824).toFixed(2) + " GB";
        }
      }
    });
    return fileList;
  }

  static formatFileSizeMultiple(fileList: Array<any>, field1: string, field2: string, isMBorGB: string) {
    fileList.forEach((file: any) => {
      if (file[field1] && file[field1][field2]) {
        if (isMBorGB == 'MB')
          file[field1][field2] = (Number(file[field1][field2]) / 1048576).toFixed(2) + " MB";
        if (isMBorGB == 'GB')
          file[field1][field2] = (Number(file[field1][field2]) / 1073741824).toFixed(2) + " GB";
      }
    });
    return fileList;
  }

  static turkishCharacterCleanup(input: string) {
    let result = input.replace(/[ıİ]/g, "i").replace(/[şŞ]/g, "s").replace(/[ğĞ]/g, "g").replace(/[üÜ]/g, "u").replace(/[öÖ]/g, "o").replace(/[çÇ]/g, "c");
    result = result.replace(/[^\w\s-]/g, "").trim();
    result = result.replace(/[-\s]+/g, "-");
    return result;
  }

  static toNumber(strSize: any) {
    if (strSize.indexOf("MB") > -1) {
      return Number(strSize.replace("MB", "").trim()) * 1000000;
    } else if (strSize.indexOf("GB") > -1) {
      return Number(strSize.replace("GB", "").trim()) * 1000000000;
    } else
      return Number(strSize);
  }

  static getUrlEndParameter() {
    let param = null;
    const url = window.location.href;
    if (url && url.indexOf("/") > -1) {
      let tmpArr = url.split("/");
      param = tmpArr[tmpArr.length - 1];
    }
    return param;
  }

  static sleep(milliseconds: any) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  static fileSizeFormat(fileSize: number) {
    const kiloByte = 1024;
    const megaByte = kiloByte * 1024;
    const gigaByte = megaByte * 1024;

    if (fileSize < kiloByte) {
      return fileSize + ' B';
    } else if (fileSize < megaByte) {
      const sizeInKB = (fileSize / kiloByte).toFixed(2);
      return sizeInKB + ' KB';
    } else if (fileSize < gigaByte) {
      const sizeInMB = (fileSize / megaByte).toFixed(2);
      return sizeInMB + ' MB';
    } else {
      const sizeInGB = (fileSize / gigaByte).toFixed(2);
      return sizeInGB + ' GB';
    }
  }

  static async loadLookupData(http: HttpClient, parentId: number) {
    let curl = environment.lookUpsApi;
    curl += "?sort=id:ASC";
    curl += "&filters[parent_id][$eq]=" + parentId;
    curl += "&pagination%5Blimit%5D=-1";
    let rows = await http.get<any>(curl).toPromise();
    return rows.data;
  }

  static getArrayItem(array: any[], searchValue: any, key: string): any {
    const obj = array.find((item) => item["id"] === searchValue);
    if (obj) {
      return obj[key];
    }
    return "";
  }

  static getCurrentDate() {
    const today = new Date();
    return  today.toISOString();
  }

  static getDate(removeDay:number) {
    const today = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - removeDay);
    const todayISOString = today.toISOString();
    return tenDaysAgo.toISOString();
  }
}

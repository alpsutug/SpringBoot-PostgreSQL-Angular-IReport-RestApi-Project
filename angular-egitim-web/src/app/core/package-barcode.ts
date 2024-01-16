// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default class PackageBarcode {

  static createBarcode(info: any) {
    const documentDefinition = {
      content: [
        {
          text: info.title,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          text: 'Ürünler',
          fontSize: 14,
          alignment: 'center'
        },
        {
          style: "tableExample",
          margin: [180, 0, 0, 20],
          alignment: 'center',
          table: {
            body: [
              ["Ürün Adı", "Kodu"],
              ["Hasta Çarşafları",  "0/3/3"],
              ["Hasta Çarşafları",  "14/14/0"],
              ["Hasta Çarşafları",  "1/1/0"]
            ]
          }
        },
        {
          qr: info.barcode+"0000",
          fontSize: 14,
          alignment: 'center'
        },
        {
          text: "",
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          text: info.dateTime+" Tarihinde temiz teslim alınmıştır, Teslim Eden İmza:",
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          text: "Teslim Alan İmza:",
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
      ],
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download('barcode.pdf');
  }
}

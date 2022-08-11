import React from 'react';
import {TouchableOpacity, PermissionsAndroid} from 'react-native';
import {StyleSheet} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import {Alert} from 'react-native';
import PdfIcon from '../../../assets/icons/pdf.svg';

const ExportPdf = props => {
  const {data} = props;

  let str = '';

  const BodyTable = data.map(function (item) {
    str += `<tr>
        <td class="align-middle text-center">${item.id}</td>
        <td class="align-middle text-center">${item.name}</td>
        <td class="align-middle text-center">${item.address}</td>
        <td class="align-middle text-center">${item.email}</td>
        <td class="align-middle text-center">${item.hotline}</td>
      </tr>`;
  });

  const htmlContent =
    `
        <html>
        <!doctype html>
        <html lang="en">
        
        <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            font-family: DejaVu Sans !important;
            font-size: 10px;
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        table,
        td,
        th {
            border: 1px solid black;
            text-align: left;
            padding: 8px;
        }

        p {
            margin: 0;
        }
    </style>
    <title>Kiểm kê thiết bị phòng</title>
</head>
          <body>
          <div class="info-container" style="margin-right: 2rem">
          <div class="container px-0 py-2 bg-white table-container mb-4" style="border-radius: 10px">
              <h3 class="mt-2 mx-3">In biên bản kiểm kê tòa nhà</h3>
              <hr>
              <table class="table">
                  <thead style="background-color: #F5F9FC;">
                      <tr>
                          <th class="text-center" scope="col">Stt</th>
                          <th class="text-center" scope="col">Tên tòa nhà</th>
                          <th class="text-center" scope="col">Địa chỉ</th>
                          <th class="text-center" scope="col">Email</th>
                          <th class="text-center" scope="col">Số điện thoại</th>
                      </tr>` +
    str +
    `</thead>
                  <tbody>
                  </tbody>
                </table>
            </div>
        </div>
        </body>
        </html>
      `;
  const askPermission = () => {
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Pdf creator needs External Storage Write Permission',
            message: 'Pdf creator needs access to Storage data in your SD Card',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          createPDF();
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
      createPDF();
    }
  };
  const createPDF = async () => {
    let options = {
      //Content to print
      html: htmlContent,
      //File Name
      fileName: 'est',
      //File directory
      directory: 'Download',

      base64: true,
    };

    let file = await RNHTMLtoPDF.convert(options);

    Alert.alert(
      'Successfully Exported',
      'Path:' + file.filePath,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open', onPress: () => openFile(file.filePath)},
      ],
      {cancelable: true},
    );
  };

  const openFile = filepath => {
    const path = filepath; // absolute-path-to-my-local-file.
    FileViewer.open(path)
      .then(() => {
        // success
      })
      .catch(error => {
        // error
        console.log(error.message);
      });
  };
  return (
    <TouchableOpacity
      onPress={askPermission}
      style={{
        position: 'absolute',
        right: 20,
        bottom: 20,
        padding: 0,
        zIndex: 3,
      }}>
      <PdfIcon width={50} height={50} />
    </TouchableOpacity>
  );
};

export default ExportPdf;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'center',
  },
});

const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}
h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }
/* table */
table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }
/* page */
html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }
body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }
/* header */
header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }
header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }
/* article */
article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }
article address { float: left; font-size: 125%; font-weight: bold; }
/* table meta & balance */
table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }
/* table meta */
table.meta th { width: 40%; }
table.meta td { width: 60%; }
/* table items */
table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }
table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }
/* table balance */
table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }
/* aside */
aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;

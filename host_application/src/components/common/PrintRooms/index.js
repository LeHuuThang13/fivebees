import React, {useState} from 'react';
import {TouchableOpacity, PermissionsAndroid} from 'react-native';
import {StyleSheet} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import {Alert} from 'react-native';
import PdfIcon from '../../../assets/icons/pdf.svg';

function timeNow() {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    '-' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes();

  return datetime;
}

function fileName() {
  var currentdate = new Date();
  var datetime =
    'Hợp_đồng_' +
    currentdate.getDate() +
    '' +
    (currentdate.getMonth() + 1) +
    '' +
    currentdate.getFullYear() +
    '' +
    currentdate.getHours() +
    '' +
    currentdate.getMinutes();

  return datetime;
}

function RenderData(facilities) {
  let html = '';
  let count = 0;
  if (facilities?.length == 0) {
    html += '<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
  } else {
    for (var i = 0; i < facilities?.length; i++) {
      html +=
        '<tr>' +
        ` <td class="align-middle">${++count}</td>` +
        ` <td class="align-middle">${facilities[i].code}</td>` +
        ` <td class="align-middle">${facilities[i].name}</td>` +
        `<td class="align-middle">${facilities[i].status}</td>` +
        `<td class="align-middle">${facilities[i].updated_at}</td>` +
        `<td class="align-middle"></td>` +
        `</tr>`;
    }
  }
  return html;
}

const ExportPdf = props => {
  const {
    building_id,
    description,
    facilities,
    id,
    photos,
    room_number,
    status,
  } = props.data[0];
  const {name: name_building} = building_id;

  const [date, setDate] = useState(timeNow());
  const html = RenderData(facilities);

  const htmlContent = `
    <!DOCTYPE html>
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
        <h5 style="margin: 0">${name_building}</h5>
    
        <div style="margin-bottom: 10px">
            <div style="text-align: center;">
                <h1 style="font-size: 18px;">Biên bản kiểm kê thiết bị phòng</h1>
            </div>
            <b>Thông tin phòng:</b>
            <p>Phòng: ${name_building}</p>
            <p>Tình trạng phòng: ${status}</p>
            <p>Ngày kiểm kê: ....giờ....ngày ${date}</p>
        </div>
    
        <div>
            <b>Thông tin bên thuê:</b>
            <p>Tên người thuê:</p>
            <p>Ngày nhận phòng:</p>
            <p>CCCD/CMND:</p>
            <p>SĐT:</p>
    
            <div style="margin-top: 10px">
                <b>Danh sách thiết bị kiểm kê:</b>
            </div>
            <table cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th>stt</th>
                        <th>mã thiết bị</th>
                        <th>tên thiết bị</th>
                        <th>tình trạng</th>
                        <th>ngày gán</th>
                        <th>hư hại</th>
                    </tr>
                </thead>
                <tbody>
                    ${html}
                </tbody>
            </table>
    
            <div style="text-align: right; margin: 1rem">
                <p>Ngày.......tháng.......năm.......</p>
            </div>
        </div>
    
        <div>
            <div style="text-align: center; float: left">
                <p>Chủ nhà</p>
                <i>(Ký, ghi rõ họ tên)</i>
            </div>
            <div style="text-align: center; float: left; margin-left: 30%">
                <p>Kiểm kê</p>
                <i>(Ký, ghi rõ họ tên)</i>
            </div>
            <div style="text-align: center; float: left; margin-left: 25%">
                <p>Đại diện bên thuê</p>
                <i>(Ký, ghi rõ họ tên)</i>
            </div>
        </div>
    
    
        <script src="https://unpkg.com/@popperjs/core@2"></script>
        <script src="https://unpkg.com/@coreui/coreui/dist/js/coreui.min.js"></script>
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
      fileName: fileName(),
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
        left: 0,
        bottom: 5,
        padding: 0,
        zIndex: 3,
      }}>
      <PdfIcon width={20} height={20} />
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

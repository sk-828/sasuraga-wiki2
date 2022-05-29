const SPREADSHHET_ID="14QxQjQ7QUtPrwhj9KKNxvcFRyRsvIeTGWhy63q34n6o";
const SHEET_NAME="ユーザ情報";

function doGet(e) {
    const app = SpreadsheetApp.openById(SPREADSHHET_ID);
    const sheet = app.getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();
    const data = [];

    for(let i=0; i<values.length; i++){
      const param = {};
      for(let j=0; j<values[i].length; j++){
        param[values[0][j]] = values[i][j];
      }
      data.push(param);
    }

    const result = ContentService.createTextOutput();
      result.setMimeType(ContentService.MimeType.JSON);
      result.setContent(JSON.stringify(data));
      return result;
  }

window.onload = searchListInit()

//仮置きでHTMLのほうの選択リストを定数で固定している。
function searchListInit(){
    const rawDatas = doGet();

    var select =document.getElementById("username");
    var option =document.createElement("option");
    for(let i=1; i<rawDatas.length; i++){
        option.text = rawDatas[i][1];
        option.value = rawDatas[i][1];
        select.appendChild(option);
    }




}
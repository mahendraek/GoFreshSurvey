const SHEET_ID="1AkAP6ozoIkv2KZQ07fwtVbRsrs-T5SfKLR5HyR16iqs";
const SHEET_NAME="Responses";

function getResponseSheet(){
  const ss=SpreadsheetApp.openById(SHEET_ID);
  let sh=ss.getSheetByName(SHEET_NAME);
  if(!sh) sh=ss.insertSheet(SHEET_NAME);
  return sh;
}

function setup(){
  const sh=getResponseSheet();
  const headers=["Timestamp","Interest","Products","Box","Frequency","Pilot","Name","Phone","Email","Area","Comments","Milk Preference"];
  if(sh.getLastRow()===0){
    sh.getRange(1,1,1,headers.length).setValues([headers]);
    sh.setFrozenRows(1);
    return;
  }
  // Preserve existing survey columns and add the new Milk Preference column at the end.
  if(sh.getRange(1,12).getValue()!=="Milk Preference"){
    sh.getRange(1,12).setValue("Milk Preference");
  }
  sh.setFrozenRows(1);
}

function doGet(){
  return ContentService
    .createTextOutput(JSON.stringify({ok:true,service:"FreshBox Survey",sheet:SHEET_NAME}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e){
  try{
    setup();
    let d={};
    if(e && e.parameter && Object.keys(e.parameter).length){
      d=e.parameter;
    } else if(e && e.postData && e.postData.contents){
      try{ d=JSON.parse(e.postData.contents); }catch(_){ d={}; }
    }
    const sh=getResponseSheet();
    sh.appendRow([
      new Date(),
      clean(d.interest),
      clean(d.products),
      clean(d.box),
      clean(d.frequency),
      clean(d.pilot),
      clean(d.name),
      clean(d.phone),
      clean(d.email),
      clean(d.area),
      clean(d.comments),
      clean(d.milk)
    ]);
    SpreadsheetApp.flush();
    return ContentService
      .createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    console.error(err);
    return ContentService
      .createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function clean(v){
  return String(v==null?"":v).trim().slice(0,1000);
}
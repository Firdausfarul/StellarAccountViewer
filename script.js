var address;
var firsttx;

function bobo(){
  if (window.freighterApi.isConnected()) {
    alert("User has Freighter!");
  }   
  else{
    alert("Gak onok cok asu")
  }
}
const retrievePublicKey = async () => {
  let error = "";
  try {
    publicKey = await window.freighterApi.getPublicKey();
    kntl=publicKey;
    console.log(kntl);
  } 
  catch (e) {
    error = e;
  }

  if (error) {
    return error;
  }
  //console.log(typeof(publicKey))
  mumu(publicKey);
  return publicKey;
};
function mumu(pk){
  address = pk;
  console.log(pk);
}
function reqbalances(pubkey){
  const xhr = new XMLHttpRequest();
  const url= "https://horizon.stellar.org/accounts/";
  xhr.open('GET', url+pubkey);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE) {
        var toad = JSON.parse(xhr.responseText);
        for(i=0;i<toad.balances.length;i++){ 
          console.log(toad.balances[i].balance + "" + toad.balances[i].asset_code);
        }
  }
};
xhr.send();
}
function reqtime_create(pubKey){
  const url= "https://horizon.stellar.org/accounts/";
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url+pubKey+"/transactions?order=asc");
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE) {
        var toadz = JSON.parse(xhr.responseText); 
        firsttx = toadz._embedded.records[0].hash;
        console.log(toadz._embedded.records[0].hash);//for account creator
        console.log("created at : "+toadz._embedded.records[0].created_at);
  }
};
xhr.send();
}
function created_by(txid){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', "https://horizon.stellar.org/transactions/"+ txid +"/operations");
  xhr.onreadystatechange = function () {
  // In local files, status is 0 upon success in Mozilla Firefox
  if(xhr.readyState === XMLHttpRequest.DONE) {
      console.log(txid);
      var toadz = JSON.parse(xhr.responseText); 
      var pjg = toadz._embedded.records.length;
      console.log(pjg);
      for(i=0;i<pjg;i++){
        if(toadz._embedded.records[i].type == "create_account"){
            if(toadz._embedded.records[i].account == address){
                console.log(toadz._embedded.records[i].funder);
                break;
            }
        }
      }
  }
};
xhr.send();

}

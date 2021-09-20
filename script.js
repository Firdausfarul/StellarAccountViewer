var address; //storing the address or public key
var firsttx; //storing txid for createAccount transaction(first tx, to know the account creator)

//fetching public key from freighter
const retrievePublicKey = async () => {
  let error = "";
  try {
    publicKey = await window.freighterApi.getPublicKey();
  } 
  catch (e) {
    error = e;
  }

  if (error) {
    return error;
  }
  mumu(publicKey); //storing fetched publickey to address
  return publicKey;
};

//storing fetched publickey to address
function mumu(pk){
  address = pk;
  var kon = document.createElement('P'); //printing the address
  kon.innerHTML = "Address : " + pk; 
  document.body.appendChild(kon);
  balances(address); 
}
//fetching and printing balance for the corresponding public key
function balances(pubkey){
  const xhr = new XMLHttpRequest();
  const url= "https://horizon.stellar.org/accounts/";
  xhr.open('GET', url+pubkey); //fetching from horizon API
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE) {
        var toad = JSON.parse(xhr.responseText);
        var kon = document.createElement('P');
        kon.innerHTML = "Balances : "; 
        document.body.appendChild(kon);
        for(i=0;i<toad.balances.length;i++){
            var kon = document.createElement('P');
            if(toad.balances[i].asset_code === undefined){ 
              kon.innerHTML = toad.balances[i].balance + " " + "XLM"; 
              document.body.appendChild(kon);
            }
            else{ 
              kon.innerHTML = toad.balances[i].balance + " " + toad.balances[i].asset_code; 
              document.body.appendChild(kon);
            }
        }
        time_create(address);
  }
};
xhr.send();
}

//fetching and printing cretion time for the corresponding public key
function time_create(pubKey){
  const url= "https://horizon.stellar.org/accounts/";
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url+pubKey+"/transactions?order=asc");//fetching from horizon API
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE) {
        var toadz = JSON.parse(xhr.responseText); 
        firsttx = toadz._embedded.records[0].hash;
        var kon = document.createElement('P');
        kon.innerHTML = "created at : "+ toadz._embedded.records[0].created_at; 
        document.body.appendChild(kon);
        created_by(firsttx);
  }
};
xhr.send();
}

//fetching and printing account creator for the corresponding public key
function created_by(txid){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', "https://horizon.stellar.org/transactions/"+ txid +"/operations");//fetching from horizon API
  xhr.onreadystatechange = function () {
  if(xhr.readyState === XMLHttpRequest.DONE) {
      console.log(txid);
      var toadz = JSON.parse(xhr.responseText); 
      var pjg = toadz._embedded.records.length;
      console.log(pjg);
      for(i=0;i<pjg;i++){
        if(toadz._embedded.records[i].type == "create_account"){
            if(toadz._embedded.records[i].account == address){
                var kon = document.createElement('P');
                kon.innerHTML = "Created By : " + toadz._embedded.records[i].funder; 
                document.body.appendChild(kon);
                break;
            }
        }
      }
  }
};
xhr.send();
}

function freight(){
    if (window.freighterApi.isConnected()) {
    hidd(); //erasing login button
    retrievePublicKey();
    }
    else{
    alert("Freighter not found, Please Install Freighter First");
  }
}

function rabett(){
  if(window.rabet){
    
    return;
  }
  else{
    return;
    
  }
}

function rabett(){
  if (!window.rabet) {
    alert("Rabet not found, Please Install Rabet First");
  }
  else{
    hidd(); //erasing login button
    console.log(1000);
    rabet.connect()
    .then(result => mumu(result.publicKey))
    .catch(error => console.error(`Error: ${error}`));
  }
}

//erasing login button
function hidd(){
  var button=document.getElementById('rabeto');
  button.style.display="none";
  var button=document.getElementById('freighter');
  button.style.display="none";
}
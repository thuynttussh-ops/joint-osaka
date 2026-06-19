
const wards={

osaka:[
"北区",
"中央区",
"浪速区",
"西区",
"淀川区",
"東淀川区",
"生野区",
"西成区",
"此花区"
],

sakai:[
"堺区",
"北区",
"中区",
"西区",
"東区",
"南区",
"美原区"
],

higashi:[
"東大阪市"
],

yao:[
"八尾市"
],

suita:[
"吹田市"
],

toyonaka:[
"豊中市"
]

};

const city=document.getElementById("cityFilter");

const ward=document.getElementById("wardFilter");

city.addEventListener("change",function(){

ward.innerHTML="<option>Chọn quận</option>";

if(this.value==="") return;

wards[this.value].forEach(function(item){

let option=document.createElement("option");

option.text=item;

option.value=item;

ward.appendChild(option);

});

});

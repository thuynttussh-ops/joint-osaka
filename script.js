console.log("script.js đã chạy");

// ==========================
// Google Sheets
// ==========================

let allProperties = [];

const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSv3GJHvqIiznp0DKYlJBvvEeWnZDbsmkHIAZWVrYuwVc_bBq9TLZyLCvtRuE4TylHm-teSIjG4nDvC/pub?gid=0&single=true&output=csv";

.property-list {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
gap: 15px;
}

.property {
background: white;
border-radius: 12px;
padding: 15px;
box-shadow: 0 2px 10px rgba(0,0,0,0.08);
transition: 0.2s;
}

.property:hover {
transform: translateY(-3px);
box-shadow: 0 6px 18px rgba(0,0,0,0.12);
}

.property h3 {
color: #d6001c;
font-size: 18px;
margin-bottom: 8px;
}

.property p {
font-size: 14px;
color: #333;
line-height: 1.5;
}

Papa.parse(sheetURL,{

    download:true,
    header:true,

    complete:function(results){

        allProperties = results.data.filter(item=>item.PropertyName);

        console.log(allProperties);

        createCityDropdown();

        displayProperties(allProperties);

    }

});


// ==========================
// Thành phố
// ==========================

function createCityDropdown(){

    const citySelect =
    document.getElementById("cityFilter");

    citySelect.innerHTML =
    '<option value="">Chọn thành phố</option>';

    const cities = [...new Set(

        allProperties.map(item=>item.City)

    )];

    cities.sort();

    cities.forEach(city=>{

        citySelect.innerHTML +=
        `<option value="${city}">${city}</option>`;

    });

}


// ==========================
// Quận
// ==========================

function createWardDropdown(city){

    const wardSelect =
    document.getElementById("wardFilter");

    wardSelect.innerHTML =
    '<option value="">Chọn quận</option>';

    // Reset Ga
    document.getElementById("stationFilter").innerHTML =
    '<option value="">Chọn ga</option>';

    if(city==="") return;

    const wards=[...new Set(

        allProperties
        .filter(item=>item.City.trim()===city.trim())
        .map(item=>item.Ward)

    )];

    wards.sort();

    wards.forEach(ward=>{

        wardSelect.innerHTML +=
        `<option value="${ward}">${ward}</option>`;

    });

}


// ==========================
// Ga
// ==========================

function createStationDropdown(city,ward){

    const stationSelect =
    document.getElementById("stationFilter");

    stationSelect.innerHTML =
    '<option value="">Chọn ga</option>';

    if(city==="" || ward==="") return;

    const stations=[...new Set(

        allProperties

        .filter(item=>

            item.City.trim()===city.trim() &&
            item.Ward.trim()===ward.trim()

        )

        .map(item=>item.Station)

    )];

    stations.sort();

    stations.forEach(station=>{

        stationSelect.innerHTML +=
        `<option value="${station}">${station}</option>`;

    });

}


// ==========================
// Hiển thị căn hộ
// ==========================

function displayProperties(properties){

    const container =
    document.getElementById("property-list");

    container.innerHTML="";

    properties.forEach(item=>{

        container.innerHTML += `

<div class="property">

<h3>${item.PropertyName}</h3>

<p><strong>📍 Địa điểm:</strong> ${item.City} ${item.Ward}</p>

<p><strong>🏠 Địa chỉ:</strong> ${item.Address}</p>

<p><strong>🚉 Ga:</strong> ${item.Station}（徒歩${item.WalkMinutes}分）</p>

<p><strong>💴 Giá thuê:</strong> ${item.Rent} 円</p>

<p><strong>📐 Diện tích:</strong> ${item.Area} ㎡</p>

<p><strong>🏠 Loại phòng:</strong> ${item.RoomType}</p>

<p><strong>💬 Ghi chú:</strong> ${item.Note}</p>

</div>

`;

    });

}


// ==========================
// Event
// ==========================

document
.getElementById("cityFilter")
.addEventListener("change",function(){

    createWardDropdown(this.value);

});

document
.getElementById("wardFilter")
.addEventListener("change",function(){

    const city =
    document.getElementById("cityFilter").value;

    createStationDropdown(city,this.value);

});

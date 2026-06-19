let allProperties = [];
const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSv3GJHvqIiznp0DKYlJBvvEeWnZDbsmkHIAZWVrYuwVc_bBq9TLZyLCvtRuE4TylHm-teSIjG4nDvC/pub?gid=0&single=true&output=csv";

Papa.parse(sheetURL, {
    download: true,
    header: true,

    complete: function(results){

const data = results.data.filter(item => item.PropertyName);

  allProperties = data;

createCityDropdown();

displayProperties(data);

    }

});
function createCityDropdown(){

    const citySelect = document.getElementById("cityFilter");

    citySelect.innerHTML =
    '<option value="">Chọn thành phố</option>';

    const cities = [...new Set(
        allProperties.map(item => item.City)
    )];

    cities.sort();

    cities.forEach(city => {

        citySelect.innerHTML +=
        `<option value="${city}">${city}</option>`;

    });

}
function createWardDropdown(city){

    const wardSelect =
    document.getElementById("wardFilter");

    wardSelect.innerHTML =
    '<option value="">Chọn quận</option>';

    if(city==="") return;

    const wards = [...new Set(

        allProperties
        .filter(item => item.City === city)
        .map(item => item.Ward)

    )];

    wards.sort();

    wards.forEach(ward=>{

        wardSelect.innerHTML +=
        `<option value="${ward}">${ward}</option>`;

    });

}
document
.getElementById("cityFilter")
.addEventListener("change",function(){

    createWardDropdown(this.value);

});

function displayProperties(properties){

    const container = document.getElementById("property-list");

    container.innerHTML = "";

    properties.forEach(function(item){

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

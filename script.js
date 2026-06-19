const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSv3GJHvqIiznp0DKYlJBvvEeWnZDbsmkHIAZWVrYuwVc_bBq9TLZyLCvtRuE4TylHm-teSIjG4nDvC/pub?gid=0&single=true&output=csv";

Papa.parse(sheetURL, {

    download: true,

    header: true,

    complete: function(results){

        console.log(results.data);

    }

});

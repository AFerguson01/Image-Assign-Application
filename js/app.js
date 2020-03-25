var initialized = false;

function SearchPhotos(){
    let clientId = "g_EmLyty4c1G5wxRV0-hURnJ6SI7B5GjoiaaWWBtT00"
    let query = document.getElementById("search").value;
    let url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${clientId}`;

    let assignBtn = document.getElementById("disabled");
    if(!initialized){
        assignBtn.id = "assign-btn";
        initialized = true;
    };

    document.getElementById("search").value = "";

    fetch(url)
        .then(function(data){
            return data.json();
        })
        .then(function(data){
            let result = `<img src="${data.results[0].urls.regular}" alt="${query} img">`;
            $("#result").html(result);
        })
}
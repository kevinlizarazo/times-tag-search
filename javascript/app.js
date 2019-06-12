// implement code here

const $input = $('.js-tag-input');
let filter = '';

$('.js-search').on('click', async () => {
        console.log("search fired")
        const searchQuery = $input.val();
        const data = await getData(searchQuery);
        renderResults(data);
    });

$('.js-tag-input').on('keydown', async (e) => {
    if (e.keyCode === 13) {
        console.log("search key fired")
        const searchQuery = $input.val();
        const data = await getData(searchQuery);
        renderResults(data);
    }
});


const $results = $('.js-data')
const renderResults = (data) => {
    const searchQuery = $input.val();
    const searchResults = JSON.parse(data);
    $results.html('');
    $results.append(`<p><strong>You searched for: `+searchQuery+`</strong></p>`)
    console.log("stuff:")
    console.log(searchResults)
    for (i in searchResults[1]){
        console.log(searchResults[1][i])
        $results.append(`<p>` + searchResults[1][i] + `</p>`)
    }
}



const getData = (searchQuery) => {
    const API_KEY = 'your_key_here';

    if (document.getElementById('js-geo').checked) {
      filter = '(Geo)';
    }
    if (document.getElementById('js-des').checked) {
      filter = '(Des)';
    }
    if (document.getElementById('js-per').checked) {
      filter = '(Per)';
    }
    if (document.getElementById('js-org').checked) {
      filter = '(Org)';
    }
    if (document.getElementById('js-none').checked) {
      filter = '';
    }

    let xhr = $.get(`https://api.nytimes.com/svc/suggest/v1/timestags?api-key=${API_KEY}&query=${searchQuery}&filter=${filter}&max=150`);
    console.log("DATA RECEIVED")
    console.log(xhr)
    return xhr;
}


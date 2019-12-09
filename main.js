

const APIKey = 'WJK9GqpmrJyNuGyLLzMgrmPp7FrWpGjt1RUKfFaV'
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
}
    const geoAPIKey = '7de1b0ccc7cc4ec4bd998b0e6370f8d5'
    const geoSearchURL = 'https://api.opencagedata.com/geocode/v1/json'

function displayResults(responseJson) {
    console.log(responseJson);
    $('.error-message').empty();
    $('.results').empty();
    if (responseJson.data.length === 0){
        $('.error-message').text('There is no information for that state code, please try another.')
    }
    for (let i=0; i < responseJson.data.length; i++) {
            $('.results').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <p><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a></p>
            </li>`
        )};
    $('.results').removeClass('hidden');
};

function getStateParks(state, maxResults) {
    const params= {
        stateCode: state,
        api_key: APIKey,
        limit: maxResults,
    };
    const queryString = formatQueryParams(params)
    const url= searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('.error-message').text(`Something went wrong: ${err.message}`);
        });


}


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const state= $('#state').val();
        const maxResults= $('#maxResults').val();
        getStateParks(state, maxResults);
    });
}
$(watchForm());
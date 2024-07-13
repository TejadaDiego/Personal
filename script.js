document.getElementById('countryInput').addEventListener('input', function() {
    const query = this.value.trim();
    if (query.length >= 3) {
        fetchCountrySuggestions(query);
    } else {
        clearSuggestions();
    }
});

document.getElementById('countryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const country = document.getElementById('countryInput').value.trim();
    fetchCountryData(country);
    clearSuggestions();
});

document.getElementById('suggestions').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        document.getElementById('countryInput').value = event.target.textContent;
        clearSuggestions();
    }
});

function fetchCountrySuggestions(query) {
    fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then(response => response.json())
        .then(data => {
            displaySuggestions(data);
        })
        .catch(error => {
            console.error('Error fetching country suggestions:', error);
        });
}

function fetchCountryData(country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then(data => {
            displayCountryData(data);
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });
}

function displaySuggestions(data) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    data.forEach(country => {
        const listItem = document.createElement('li');
        listItem.textContent = country.name.common;
        suggestions.appendChild(listItem);
    });
}

function clearSuggestions() {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
}

function displayCountryData(data) {
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = '';
    data.forEach(country => {
        const row = document.createElement('tr');
        
        const flagCell = document.createElement('td');
        const flagImg = document.createElement('img');
        flagImg.src = country.flags.png;
        flagCell.appendChild(flagImg);
        
        const nameCell = document.createElement('td');
        nameCell.textContent = country.name.common;
        
        const capitalCell = document.createElement('td');
        capitalCell.textContent = country.capital ? country.capital[0] : 'N/A';
        
        const regionCell = document.createElement('td');
        regionCell.textContent = country.region;
        
        const populationCell = document.createElement('td');
        populationCell.textContent = country.population.toLocaleString();
        
        row.appendChild(flagCell);
        row.appendChild(nameCell);
        row.appendChild(capitalCell);
        row.appendChild(regionCell);
        row.appendChild(populationCell);
        
        resultsBody.appendChild(row);
    });
}

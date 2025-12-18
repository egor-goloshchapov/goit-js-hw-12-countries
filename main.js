const input = document.getElementById('search');
const result = document.getElementById('result');

let timeoutId;

input.addEventListener('input', () => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    const query = input.value.trim();
    result.innerHTML = '';

    fetch(`https://restcountries.com/v2/name/${query}`)
      .then(response => {
        return response.json();
      })
      .then(countries => {
        if (countries.length > 10) {
          return;
        }

        if (countries.length >= 2) {
          result.innerHTML = `
            <ul>
              ${countries.map(c => `<li>${c.name}</li>`).join('')}
            </ul>
          `;
          return;
        }

        const country = countries[0];
        result.innerHTML = `
          <h2>${country.name}</h2>
          <p><strong>Capital:</strong> ${country.capital}</p>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Languages:</strong> ${country.languages
            .map(l => l.name)
            .join(', ')}</p>
          <img src="${country.flag}" alt="Flag of ${country.name}">
        `;
      })
  }, 500);
});

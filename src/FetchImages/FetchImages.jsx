const FetchImages = ({ state, setState }) => {
  const { query, page, perPage } = state;

  const API_KEY = '36892972-3965195d48ffcffaf1a3741cc';

  const baseURL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  fetch(baseURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`No data on request`));
    })
    .then(results => {
      setState(prevState => ({
        data: results,
        results: [...prevState.results, ...results.hits],
        loading: false,
      }));
    })
    .catch(error => setState({ error }));
};

export default FetchImages;

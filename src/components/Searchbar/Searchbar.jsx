import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = { query: '' };

  handleQueryChange = evt => {
    this.setState({
      query: evt.currentTarget.value,
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm}>
          <button
            className={css['SearchForm-button']}
            type="submit"
            onClick={e => {
              this.props.onSubmit(e, this.state.query);
            }}
          >
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>
          <input
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            name="searchQuery"
            placeholder="Search images..."
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

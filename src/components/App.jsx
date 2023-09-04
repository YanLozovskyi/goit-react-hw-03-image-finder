import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';
import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import FetchImages from 'FetchImages/FetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    error: null,
    data: '',
    query: '',
    results: [],
    loading: false,
    page: 1,
    perPage: 12,
    showModal: false,
    modalImg: '',
    modalTags: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (page !== prevState.page || query !== prevState.query) {
      FetchImages({ state: this.state, setState: this.setState.bind(this) });
    }
  }

  handleFormSubmit = (e, query) => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error('Enter your request');
    }

    if (query === this.state.query) {
      return toast.info(
        `You've already entered: ${query}. Enter another request`
      );
    }

    this.setState({ query, loading: true, results: [] });
  };

  onLoadMoreClick = () => {
    this.setState(prev => ({
      page: prev.page + 1,
      isLoading: true,
    }));
  };

  onImgClick = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      modalImg: largeImageURL,
      modalTags: tags,
    });
  };

  closeModal = () => {
    this.setState(() => ({
      showModal: false,
    }));
  };

  render() {
    const {
      loading,
      data,
      results,
      page,
      perPage,
      modalImg,
      modalTags,
      showModal,
    } = this.state;

    const totalPage = data.totalHits / perPage;
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && (
          <div className={css.loader}>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        )}
        {results.length > 0 && (
          <ImageGallery results={results} onClick={this.onImgClick} />
        )}
        {!loading && totalPage > page && results.length > 0 && (
          <Button onClick={this.onLoadMoreClick} />
        )}
        {showModal && (
          <Modal
            onClose={this.closeModal}
            modalImg={modalImg}
            modalTags={modalTags}
          />
        )}
      </>
    );
  }
}

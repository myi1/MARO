import React, { Component } from "react";
import axios from "axios";
import "./Favorites.scss";
import { MY_API_URL } from "../../util";
import ImageGallery from "react-image-gallery";

export default class Favorites extends Component {
  state = {
    currentImages: [],
    galleryImagesArray: [],
  };

  componentDidMount() {
    this.getFavoriteImages();
  }

  getFavoriteImages() {
    axios.get(`${MY_API_URL}images/`).then((response) => {
      // const {body} = response.data;
      console.log(response.data);
      this.setState({
        galleryImagesArray: response.data,
      });
    });
  }
  render() {
    return (
      <div className='gallery'>
        <ImageGallery
          items={this.state.galleryImagesArray}
          thumbnailPosition='left'
        />
      </div>
    );
  }
}

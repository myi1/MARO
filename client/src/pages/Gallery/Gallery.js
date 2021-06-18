import axios from "axios";
import React, { Component } from "react";
import "./Gallery.scss";
import { API_URL, API_KEY } from "../../util";
import Toolbar from "../../components/Toolbar/Toolbar";
import ImageGallery from "react-image-gallery";
import HeartIcon from "../../assets/icons/Icon-likes.svg";
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

export default class MarsGallery extends Component {
  state = {
    currentImages: [],
    galleryImagesArray: [],
    currentRover: {
      name: "curiosity",
      landing_date: "",
      max_date: "",
      selected_date: "2021-06-14",
      camerasData: [],
      cameras: ["FHAZ", "MAST", "NAVCAM", "RHAZ"],
      selectedCamera: "FHAZ",
    },
    shouldUpdate: false,
    showGallery: false,
  };

  componentDidMount() {
    this.getCurrentImages();
    this.getRoverManifest();
    // this.getCameras();
  }
  componentDidUpdate() {
    const { shouldUpdate } = this.state;
    if (shouldUpdate) {
      this.getCurrentImages();
    }
  }

  getCurrentImages() {
    const { currentRover } = this.state;
    const { name, selected_date, selectedCamera } = currentRover;
    const date = selected_date;
    axios
      .get(
        `${API_URL}rovers/${name}/photos?camera=${selectedCamera}&earth_date=${date}&api_key=${API_KEY}`
      )
      .then((response) => {
        const { photos } = response.data;
        // const currentImages = response.data.photos;
        const currentImages = photos.map((photo) => ({
          original: photo.img_src,
          thumbnail: photo.img_src,
        }));

        // console.log(this.state);
        this.setState({
          currentImages: response.data.photos,
          shouldUpdate: false,
          galleryImagesArray: currentImages,
        });
        console.log(currentImages);
      })
      .catch((err) => {
        console.log("API Request Failed: ", err);
      });
  }

  getRoverManifest(target) {
    const rover = target || "curiosity";
    axios
      .get(`${API_URL}manifests/${rover}?api_key=${API_KEY}`)
      .then((response) => {
        console.log(response.data);
        this.setState((prevState) => ({
          shouldUpdate: true,
          currentRover: {
            ...prevState.currentRover,
            landing_date: response.data.photo_manifest.landing_date,
            max_date: response.data.photo_manifest.max_date,
            camerasData: response.data.photo_manifest.photos,
            selected_date: response.data.photo_manifest.max_date,
          },
        }));
      });
  }

  roverClickHandle(e) {
    console.log("clicked radio button", e.target.value);
    this.getRoverManifest(e.target.value);
    this.setState((prevState) => ({
      shouldUpdate: true,
      currentRover: {
        ...prevState.currentRover,
        name: e.target.value,
        cameras: [],
      },
    }));
  }

  dateClickHandle(e) {
    e.preventDefault();
    const date = e.target.value;
    const availableCameras = this.state.currentRover.camerasData;
    const defaultCameras = [];
    let cameras;

    const foundCameras = availableCameras.find(
      (obj) => obj.earth_date === date
    );
    if (!foundCameras) {
      cameras = defaultCameras;
      this.setState((prevState) => ({
        shouldUpdate: true,
        currentRover: {
          ...prevState.currentRover,
          selected_date: e.target.value,
          cameras,
        },
      }));
    } else {
      cameras = foundCameras.cameras;
      this.setState((prevState) => ({
        shouldUpdate: true,
        currentRover: {
          ...prevState.currentRover,
          selected_date: e.target.value,
          cameras,
        },
      }));
    }

    // console.log(this.state.currentRover.cameras);
  }

  cameraClickHandle(e) {
    const camera = e.target.innerText;
    console.log(e.target.name);
    this.setState((prevState) => ({
      shouldUpdate: true,
      currentRover: {
        ...prevState.currentRover,
        selectedCamera: camera,
      },
      activeName: camera,
    }));
  }

  handleLikeClick(e) {
    console.log(e.target.previousElementSibling.currentSrc);
  }

  render() {
    let galleryView;
    const { currentImages, currentRover, showGallery } = this.state;
    const { landing_date, max_date, cameras, selectedCamera } = currentRover;
    if (!currentImages) {
      return (
        <section className='gallery'>
          <p>Loading....</p>
        </section>
      );
    }
    if (!cameras) {
      return (
        <div className='gallery'>
          <p>
            There are no images for the selected paramters. Please change your
            selections.
          </p>
        </div>
      );
    }
    if (showGallery) {
      galleryView = (
        <div className='gallery'>
          <ImageGallery
            items={this.state.galleryImagesArray}
            showBullets='true'
          />
        </div>
      );
    } else {
      galleryView = (
        <div className='gallery'>
          {currentImages.map((image) => {
            return (
              <div className='gallery__image-container' key={image.id}>
                <img
                  className='gallery__image'
                  src={image.img_src}
                  alt={image.earth_date}
                />
                <img
                  src={HeartIcon}
                  className='gallery__like-icon'
                  onClick={(e) => this.handleLikeClick(e)}
                  alt='like'
                />
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <section className='gallery-page'>
        <div className='tool-bar'>
          {
            <Toolbar
              roverClickHandle={(e) => this.roverClickHandle(e)}
              dateClickHandle={(e) => this.dateClickHandle(e)}
              cameraClickHandle={(e) => this.cameraClickHandle(e)}
              min={landing_date}
              max={max_date}
              cameras={cameras}
              selectedCamera={selectedCamera}
            />
          }
        </div>
        {galleryView}
      </section>
    );
  }
}

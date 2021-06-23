import axios from "axios";
import React, { Component } from "react";
import "./Gallery.scss";
import { API_URL, API_KEY, MY_API_URL, cameraNames } from "../../util";
import Toolbar from "../../components/Toolbar/Toolbar";
import ImageGallery from "react-image-gallery";
import HeartIcon from "../../assets/icons/Icon-likes.svg";

export default class MarsGallery extends Component {
  state = {
    currentImages: [],
    galleryImagesArray: [],
    currentRover: {
      name: "",
      landing_date: "",
      max_date: "",
      selected_date: "",
      camerasData: [],
      cameras: [],
      selectedCamera: "",
    },
    shouldUpdate: false,
    showGallery: false,
    addtoFavorites: false,
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
      console.log(this.state.currentImages)
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
        this.setState((prevState) => ({
          shouldUpdate: true,
          currentRover: {
            ...prevState.currentRover,
            landing_date: response.data.photo_manifest.landing_date,
            max_date: response.data.photo_manifest.max_date,
            camerasData: response.data.photo_manifest.photos,
            // selected_date: response.data.photo_manifest.max_date,
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
        selectedCamera: "",
        selected_date: ""
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
      if(cameras.includes(this.state.currentRover.selectedCamera)) {
        this.setState((prevState) => ({
          shouldUpdate: true,
          currentRover: {
            ...prevState.currentRover,
            selected_date: e.target.value,
            cameras,
          },
        }));
      } else {
        this.setState((prevState) => ({
          shouldUpdate: true,
          currentRover: {
            ...prevState.currentRover,
            selected_date: e.target.value,
            cameras,
            selectedCamera: ""
          },
        }));
      }
      
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

  // function toggleClassLikeIcon() {
  //   this.toggleClass('')
  // }

  handleLikeClick(e) {
    const url = e.target.previousElementSibling.currentSrc;
    axios
      .post(`${MY_API_URL}images/`, {
        original: url,
        thumbnail: url,
      })
      .then((response) => {
        this.setState({
          ...this.state,
          addtoFavorites: true,

        });
        setTimeout(
          () => this.setState({ ...this.state, addtoFavorites: false}),
          750
        );
      }).catch((err) => {
        console.log(err);
      });
  }

  findCameraName(input) {
    if(input) {
      const foundCamera = cameraNames.find((camera) => camera.shortName === input);
      const foundFullName = foundCamera.fullName;
      return foundFullName;

    }
  }

  render() {
    let galleryView;

    const { currentImages, currentRover, showGallery } = this.state;
    const { name, landing_date, max_date, selected_date, cameras, selectedCamera } =
      currentRover;

    // if (!currentImages) {
    //   return (
    //     <section className='gallery'>
    //       <p>Loading....</p>
    //     </section>
    //   );
    // }
    // if (!cameras) {
    //   return (
    //     <div className='gallery'>
    //       <p>
    //         There are no images for the selected paramters. Please change your
    //         selections.
    //       </p>
    //     </div>
    //   );
    // }

    if(!name) {
      
        galleryView = (<div className='gallery'>
        <p className="gallery__missing-info">Start by choosing a Rover from the toolbar above</p>
        </div>)
        
    } else if(!selected_date) {
      galleryView = (<div className='gallery'>
      <p className="gallery__missing-info">Next, pick a date</p>
      </div>)
    }else if (!selectedCamera) {
      galleryView = (<div className='gallery'>
      <p className="gallery__missing-info">Now, choose a camera...</p>
      </div>)
    };
    if(name && selected_date && selectedCamera) {
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
              currentRover={currentRover}
            />
          }
                <div className="info">
        <h2 className="info__title">Rover:</h2>
        <p className="info__content">{currentRover.name}</p>
        <h2 className="info__title">Date:</h2>
        <p className="info__content">{currentRover.selected_date}</p>
        <h2 className="info__title">Camera:</h2>
        <p className="info__content">{this.findCameraName(currentRover.selectedCamera)}</p>
      </div>
        </div>
        {galleryView}
      </section>
    );
  }
}

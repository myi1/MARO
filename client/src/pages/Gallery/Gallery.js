import axios from "axios";
import React, { Component } from "react";
import "./Gallery.scss";
import { API_URL, API_KEY } from "../../util";
import Toolbar from "../../components/Toolbar/Toolbar";

export default class Gallery extends Component {
  state = {
    currentImages: [],
    currentRover: {
      name: "curiosity",
      landing_date: "",
      max_date: "",
      selected_date: "2021-06-14",
      camerasData: [],
      cameras: [],
      selectedCamera: "FHAZ",
    },
    shouldUpdate: false,
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
    const today = new Date();
    const date = selected_date || today.toLocaleDateString("en-CA");
    axios
      .get(
        `${API_URL}rovers/${name}/photos?camera=${selectedCamera}&earth_date=${date}&api_key=${API_KEY}`
      )
      .then((response) => {
        // console.log(this.state);
        this.setState({
          currentImages: response.data.photos,
          shouldUpdate: false,
        });
        // console.log("current state on click: ", name);
      })
      .catch((err) => {
        console.log("API Request Failed: ", err);
      });
  }

  getRoverManifest(target) {
    const { currentRover } = this.state;
    const rover = target || "curiosity";
    axios
      .get(`${API_URL}manifests/${rover}?api_key=${API_KEY}`)
      .then((response) => {
        // console.log(response);
        this.setState((prevState) => ({
          currentRover: {
            ...prevState.currentRover,
            landing_date: response.data.photo_manifest.landing_date,
            max_date: response.data.photo_manifest.max_date,
            camerasData: response.data.photo_manifest.photos,
          },
        }));
        console.log(this.state);
      });
  }

  //   getCameras() {
  //     const { currentRover } = this.state;
  //     const rover = currentRover.name || "curiosity";
  //     // let camerasData;
  //     axios
  //       .get(`${API_URL}manifests/${rover}?api_key=${API_KEY}`)
  //       .then((response) => {
  //         this.setState({
  //           ...this.state,
  //           camerasData: response.data.photo_manifest.photos,
  //         });
  //         // console.log(this.state.camerasData);
  //       })
  //       .catch((err) => {
  //         console.log("API Request Failed: ", err);
  //       });
  //   }

  roverClickHandle(e) {
    const { currentRover } = this.state;
    console.log("clicked radio button", e.target.value);
    this.getRoverManifest(e.target.value);
    this.setState((prevState) => ({
      shouldUpdate: true,
      currentRover: {
        ...prevState.currentRover,
        name: e.target.value,
      },
    }));
  }

  dateClickHandle(e) {
    const date = e.target.value;
    // this.getCameras();
    const availableCameras = this.state.currentRover.camerasData;
    const foundCameras = availableCameras.find(
      (obj) => obj.earth_date === date
    );
    const cameras = foundCameras.cameras;

    this.setState((prevState) => ({
      shouldUpdate: true,
      currentRover: {
        ...prevState.currentRover,
        selected_date: e.target.value,
        cameras,
      },
    }));
    // console.log(this.state.currentRover.cameras);
  }

  cameraClickHandle(e) {
    const camera = e.target.value;
    this.setState((prevState) => ({
      shouldUpdate: true,
      currentRover: {
        ...prevState.currentRover,
        selectedCamera: camera,
      },
    }));
  }

  render() {
    const { currentImages, currentRover } = this.state;
    const { name, landing_date, max_date, cameras } = currentRover;
    if (!currentImages) {
      return (
        <section className='gallery'>
          <p>Loading....</p>
        </section>
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
            />
          }
        </div>
        <div className='gallery'>
          {currentImages.map((image) => {
            return (
              <img
                className='gallery__image'
                src={image.img_src}
                alt={image.earth_date}
                key={image.id}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

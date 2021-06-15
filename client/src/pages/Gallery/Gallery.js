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
    },
    shouldUpdate: false,
  };

  componentDidMount() {
    this.getCurrentImages();
    this.getRoverManifest();
  }
  componentDidUpdate() {
    const { shouldUpdate } = this.state;
    if (shouldUpdate) {
      this.getCurrentImages();
    }
  }

  getCurrentImages() {
    const { currentRover } = this.state;
    const { name } = currentRover;
    axios
      .get(
        `${API_URL}rovers/${currentRover.name}/photos?camera=FHAZ&earth_date=2017-9-2&api_key=${API_KEY}`
      )
      .then((response) => {
        this.setState({
          currentImages: response.data.photos,
          shouldUpdate: false,
        });
        console.log("current state on click: ", name);
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
        console.log(response);
        this.setState((prevState) => ({
          currentRover: {
            ...prevState.currentRover,
            landing_date: response.data.photo_manifest.landing_date,
            max_date: response.data.photo_manifest.max_date,
          },
        }));
        console.log(this.state);
      });
  }

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
    console.log(e);
  }
  render() {
    const { currentImages, currentRover } = this.state;
    const { name, landing_date, max_date } = currentRover;
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
              min={landing_date}
              max={max_date}
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

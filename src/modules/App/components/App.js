import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";
import { version } from "../../../../package.json";
import NowPlayingSection from "./NowPlayingSection";
import GenerationOptions from "./GenerationOptions";
import Scene from "../Scene";

class App extends Component {
  constructor() {
    super();
    this.handleSeedChange = this.handleSeedChange.bind(this);
  }
  handleSeedChange(event) {
    this.props.actions.SetSeed(event.target.value.toString());
  }
  // componentDidMount() {
  //   this.props.actions.PlayButtonClick();
  // }
  render() {
    return (
      <div id="bgWrapperEl" className="main-wrapper">
        <div id="box1" className="box box1" />
        <Scene />
        <div className="container text-center">
          <div className="main-panel col-md-6 offset-md-3">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="main-title">Synaesthesia</h1>
                <p className="lead">
                  A Web Audio experiment by{" "}
                  <a href="https://soundcloud.com/wheelibin">wheelibin</a>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <button
                  onClick={this.props.actions.PlayButtonClick}
                  className="main-panel__play-button btn btn-block btn-outline-light btn-lg"
                >
                  {this.props.playButtonText}
                </button>
                <NowPlayingSection
                  isPlaying={this.props.isPlaying}
                  generatedSettings={this.props.generatedSettings}
                />
              </div>
            </div>
            <GenerationOptions
              isPlaying={this.props.isPlaying}
              seed={this.props.seed}
              onRandomise={this.props.actions.RandomiseSeed}
              onSeedChange={this.handleSeedChange}
            />
          </div>
          <small className="version">v{version}</small>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  generatedSettings: PropTypes.object,
  seed: PropTypes.string.isRequired,
  playButtonText: PropTypes.string.isRequired
};
export default App;

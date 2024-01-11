import React, { useState } from 'react';
import { readFileSync } from 'fs';
import Dropzone from 'react-dropzone';
import ReactPlayer from 'react-player';
import { WebVTT } from 'subtitles-parser';

const VideoSubtitlePlayer = () => {
 const [file, setFile] = useState(null);
 const [subtitles, setSubtitles] = useState([]);

 const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    // call API to fetch subtitles
 };

 const handleSubtitleSubmit = (e) => {
    e.preventDefault();
    // call API to store subtitles
 };

 if (!file) {
    return (
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop a video file, or click to select a file</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
 }

 return (
    <div>
      <ReactPlayer url={file.preview} controls />
      <form onSubmit={handleSubtitleSubmit}>
        <input type="text" placeholder="Add a subtitle" />
        <input type="submit" value="Submit" />
      </form>
      <WebVTT subtitles={subtitles} />
    </div>
 );
};

export default VideoSubtitlePlayer;
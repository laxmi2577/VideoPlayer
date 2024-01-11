const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const { stringToVTT } = require('subtitles-parser');

const upload = multer({ dest: 'uploads/' });
const app = express();

app.post('/upload', upload.single('videoFile'), async (req, res) => {
 try {
    // store the uploaded video file
    // ...

    // send a request to the API to fetch subtitles
    const response = await axios.get('http://localhost:3001/subtitles');
    const subtitles = response.data;

    // create a VTT file with the subtitles
    const vtt = stringToVTT(subtitles);
    fs.writeFileSync('subtitles.vtt', vtt);

    res.send('File uploaded and subtitles fetched successfully.');
 } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while uploading the file.');
 }
});

app.post('/subtitles', async (req, res) => {
 try {
    // fetch the subtitles from the request body
    const { subtitles } = req.body;

    // return the subtitles to the frontend
    res.json(subtitles);
 } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the subtitles.');
 }
});

app.listen(3001, () => {
 console.log('Server listening on port 3001');
});
# audio-three-visualizer
## Heads-up
This is an experimental project, so I took the chance and installed/set up a lot of unrelated things (such as `tailwindcss`, `redux-bundler` and `postcss`)
to learn more about them. Please don't mind them when you read the code.

## Overview
I'd like to once again mention the things I'll go through:

- Basic ThreeJS concepts
- Basic WebAudio API concepts used in the project
- An (ELI5) presentation of how audio is processed and visualized through ThreeJS and WebAudio API

Below is an image of the final scene:
![final-sample](./img/final-sample.jpg)

**_Or you can go and see how it works [here](https://three-audio-visualizer.herokuapp.com/)._** Please make sure you check the **_Play Music_** checkbox in the top right controller.

## The Basic Flow
Basic flow of the audio visualizing process:

- Input a sample audio file
- Use the [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) & [Fast Fourier Transform](http://en.wikipedia.org/wiki/Fast_Fourier_transform) (FFT) to convert the audio soundwave into frequency-domain data
- Base on the data, render the shapes to visualize it with `three.js`

To get more detail of what I have just listed, please make sure to refer to these two files:

- [ThreeJS Basic Concepts](docs/BasicThreeJS.md)
- [Audio Analysing](docs/AudioAnalysing.md)
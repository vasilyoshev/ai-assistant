<p align="center">
  <a href="https://plaibox.onrender.com" target="_blank"><img src="public/assets/icon-512x512.png" /></a>
</p>
<p align="center">
    <h1 align="center"><a href="https://plaibox.onrender.com" target="_blank">plAIbox</a></h1>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/vasilyoshev/plAIbox?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/vasilyoshev/plAIbox?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/vasilyoshev/plAIbox?style=flat&color=0080ff" alt="repo-top-language">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Sass-CC6699.svg?style=flat&logo=Sass&logoColor=white" alt="Sass">
    <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC.svg?style=flat&logo=Redux&logoColor=white" alt="Redux Toolkit">
    <img src="https://img.shields.io/badge/Material_UI-0081CB.svg?style=flat&logo=Material-UI&logoColor=white" alt="Material UI">
	<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
	<img src="https://img.shields.io/badge/stylelint-263238.svg?style=flat&logo=stylelint&logoColor=white" alt="stylelint">
	<img src="https://img.shields.io/badge/Framer_Motion-F05A28.svg?style=flat&logo=Framer&logoColor=white" alt="Framer Motion">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/React_Player-B22222.svg?style=flat&logo=React&logoColor=white" alt="React Player">
    <img src="https://img.shields.io/badge/React_Confetti-9ACD32.svg?style=flat&logo=Confetti&logoColor=black" alt="React Confetti">
    <img src="https://img.shields.io/badge/React_Zoom_Pan_Pinch-FF6347.svg?style=flat&logo=React&logoColor=white" alt="React Zoom Pan Pinch">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#-overview)
> - [📦 Projects](#-projects)
> - [🚀 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Running plAIbox](#-running-plAIbox)
>   - [🧪 Tests](#-tests)
>   - [🏗 Production build](#-production-build)
> - [📄 License](#-license)

---

## 📍 Overview

plAIbox is a playground for testing small projects.

---

## 📦 Projects

### Find the differences

#### Game about finding the differences in AI generated images.

Image generation logic:
1. Topic and style of the image is determined in the level intro.
2. An initial 1024x1024 image is generated using Stability AI API.
3. A mask is generated locally for every level - 1024x1024 white image with black circles. Circle positions are random. Circle count and radius range is determined by the difficulty and level progression.
3. The initially generated image and the mask are used for generating the second image.

#### Game flowchart
![Flowchart](ftd-flowchart.png)

#### Game state
![Game state](ftd-game-state.png)

---

## 🚀 Getting Started

### ⚙️ Installation

```sh
npm install
```

### 🤖 Running plAIbox

Use the following command to run plAIbox:

```sh
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### 🧪 Tests

To execute tests, run:

```sh
npm test
```

Launches the test runner in the interactive watch mode.

### 🏗 Production build

To create a production build, run:

```sh
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

---

## 📄 License

This project is protected under the MIT License. For more details, refer to the [LICENSE](LICENSE) file.
# Probabilistic-Robustness-for-Free-Revisiting-Its-Training-with-Benchmarking.github.io

# PRBench: Probabilistic Robustness Benchmark

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

PRBench is a comprehensive web-based benchmark for evaluating probabilistic robustness (PR) and adversarial robustness (AR) of deep learning models across a range of training methods. It provides interactive leaderboards, performance tables, and visualizations to compare various methods on standardized datasets and perturbation settings.

## Features

- **Interactive Leaderboards**: Filter by dataset, model, and method.  
- **Performance Tables**: Metrics including clean accuracy, AR (PGD/C&W/Auto-Attack), PR, ProbAcc, generalization errors, and training time.  
- **Line Charts**: Dynamic PR, ProbAcc, and GEPR plots across perturbation radii.  
- **Composite Summary**: Aggregated robustness scores over all datasets and architectures.  
- **Responsive Design**: Mobile-friendly layout using Bootstrap and custom CSS.  
- **Static & Easy to Deploy**: Pure HTML/CSS/JS, no backend required.

## Demo

![Landing Page](static/src/images/pic1.png)

Live demo:  
```txt
https://<your-github-username>.github.io/PRBench
Installation
Clone the repository

bash
复制
编辑
git clone https://github.com/<your-github-username>/PRBench.git
cd PRBench
(Optional) Install a static server for local development:

bash
复制
编辑
npm install -g serve
Usage
Serve Locally

bash
复制
编辑
serve .
# or
python3 -m http.server 8000
Open your browser at http://localhost:5000 (or :8000).

Deploy on GitHub Pages

Push your code to the main branch.

In your repository settings, enable GitHub Pages from the main branch.

Visit https://<your-github-username>.github.io/PRBench.

Project Structure
csharp
复制
编辑
PRBench/
├── index.html
├── paper.html
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── datatable-init.js
│   │   ├── chart-init.js
│   │   └── scroll.js
│   └── src/
│       ├── data/
│       │   ├── prbench_table8.json
│       │   └── prbench_table9.json
│       └── images/
│           ├── pic1.png
│           ├── pic2.png
│           ├── pic_loss_strategies.png
│           └── pic_eval_metrics.png
└── README.md
Contributing
Contributions are welcome! You can:

Submit issues or feature requests.

Open pull requests for bug fixes or enhancements.

Share new leaderboard data or visualizations.

Please review any existing CONTRIBUTING guidelines and adhere to the Code of Conduct if provided.

License
This project is licensed under the MIT License. See the LICENSE file for details.

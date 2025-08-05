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

## ✨ Features

- **Interactive Leaderboards**: Filter by dataset, model, and method.  
- **Performance Tables**: Metrics including clean accuracy, AR (PGD/C&W/Auto-Attack), PR, ProbAcc, generalization errors, and training time.  
- **Line Charts**: Dynamic PR, ProbAcc, and GEPR plots across perturbation radii.  
- **Composite Summary**: Aggregated robustness scores over all datasets and architectures.  
- **Responsive Design**: Mobile-friendly layout using Bootstrap and custom CSS.  
- **Static & Easy to Deploy**: Pure HTML/CSS/JS, no backend required.

## 🌐 Demo

![Landing Page](static/src/images/pic1.png)

Live demo:  
```txt
https://<your-github-username>.github.io/PRBench
Installation
Clone the repository

## 🔧 Getting Started
## 🚀 Usage
# PRBench

**Probabilistic Robustness Benchmark**

PRBench is the first comprehensive, web-based benchmark for evaluating probabilistic robustness (PR) and adversarial robustness (AR) of deep learning models under a variety of perturbation types and magnitudes. It provides interactive leaderboards, performance tables, and charts to help you compare training methods across datasets, architectures, and robustness metrics.

---

## 🌐 Live Demo

Explore the live demo here:

[Open PRBench Demo](https://kenneth939.github.io/Probabilistic-Robustness-for-Free-Revisiting-Its-Training-with-Benchmarking.github.io/)

---

## ✨ Features

- **Interactive Leaderboard**  
  Compare clean accuracy, PR(γ) under Uniform/Gaussian/Laplace noise, and generalization error across methods.

- **Performance Table**  
  Drill down into adversarial attacks (PGD/C&W/Auto-Attack), PR, ProbAcc, generalization errors, and per-epoch training times.

- **Dataset & Model Filters**  
  Dynamically filter results by dataset, model, and method with precise button-based matching plus fuzzy global search.

- **Robustness Charts**  
  Line charts of PR(γ)%, ProbAcc(ρ, γ=0.03)%, and GEPR(γ)% vs. perturbation radius for any dataset/model combination.

- **Composite Robustness Scores**  
  Aggregate multiple metrics (Acc., AR(PGD20), PR(γ), ProbAcc(ρ=0.05), GEAR(PGD20), GEPR(γ=0.08), training time) into a single overview.

---

## 🔧 Getting Started

Click to open the live demo:

[Open PRBench Demo](https://kenneth939.github.io/Probabilistic-Robustness-for-Free-Revisiting-Its-Training-with-Benchmarking.github.io/)

---

## 🚀 Usage

1. **Clone the repo**  
   ```bash
   git clone https://github.com/kenneth939/Probabilistic-Robustness-for-Free-Revisiting-Its-Training-with-Benchmarking.github.io.git
   cd Probabilistic-Robustness-for-Free-Revisiting-Its-Training-with-Benchmarking.github.io


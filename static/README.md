<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PRBench Leaderboard</title>
  <!-- CSS -->
  <link rel="stylesheet" href="static/css/style.css" />
</head>
<body>
  <!-- top guide -->
  <nav class="navbar">
    <div class="container d-flex justify-content-between align-items-center">
      <a class="navbar-brand" href="#">PRBench</a>
      <ul class="navbar-nav d-flex flex-row">
        <li class="nav-item"><a class="nav-link" href="#leaderboards">Leaderboard</a></li>
        <li class="nav-item"><a class="nav-link" href="paper.html">Paper</a></li>
        <li class="nav-item"><a class="nav-link" href="#contribute">Contribute</a></li>
        <li class="nav-item"><a class="nav-link" href="https://github.com/yourusername/PRBench" target="_blank">Code</a></li>
      </ul>
    </div>
  </nav>
  
  <!-- Abstract-->
  <div class="container mt-5" id="abstract">
    <h1>Abstract</h1>
    <p>
      Deep learning models are notoriously vulnerable to imperceptible perturbations. Most existing research centers on adversarial robustness (AR), which evaluates models under worst-case scenarios by examining the existence of deterministic adversarial examples (AEs). In contrast, probabilistic robustness (PR) adopts a statistical perspective, measuring the likelihood of encountering AEs under stochastic perturbations. While PR is widely regarded as a practical complement to AR, training methods specifically designed to improve PR remain underdeveloped compared to adversarial training (AT) for AR. Among the few PR-targeted training methods, we identify some key limitations: i) They use different evaluation metrics, with none of them adopting a comprehensive set; ii) While AT may also improve PR (as a “free by-product”), each PR study typically evaluates only a limited subset of AT methods; iii) There is no unified theoretical framework for comparing the generalisability of those training methods. Thus, we introduce PRBench, the first benchmark dedicated to evaluating PR-targeted training methods. PRBench empirically compares most common AT and PR-targeted training methods using a comprehensive set of metrics, including clean accuracy, PR and AR performance, training efficiency, and generalisation error (GE). We also provide theoretical analysis on the GE of PR performance across training methods. Main findings revealed by PRBench include: AT methods are more versatile than PR-targeted training methods in terms of improving both AR and PR performance, while PR-targeted training methods consistently yield lower GE and higher clean accuracy. Finally, we propose KL-PGD, a simple yet effective method that achieves the highest overall ranking in PRBench.
    </p>
    <div class="text-center">
      <img src="static/src/images/pic1.png" alt="Abstract Diagram" class="img-fluid rounded" style="width:100%; height:auto;" />
    </div>
  </div>
  
  <!-- Figures Section above Leaderboards -->
  <div class="container mt-5" id="figures">
    <div class="row g-4">
      <div class="col-md-6 text-center">
        <h3>Loss functions and AE generation strategies for AT and PR-targeted training methods</h3>
        <img src="static/src/images/pic_loss_strategies.png" alt="Loss functions and AE strategies" class="img-fluid rounded" style="width:100%; height:auto;"/>
      </div>
      <div class="col-md-6 text-center">
        <h3>Evaluation metrics of AR, PR, and GE</h3>
        <img src="static/src/images/pic_eval_metrics.png" alt="Evaluation metrics" class="img-fluid rounded" style="width:100%; height:auto;"/>
      </div>
    </div>
  </div>
  
  <!-- Leaderboards -->
  <div class="container" id="leaderboards">
    <h1>Available Leaderboards</h1>
    <!-- dataset buttons -->
    <div class="btn-group mb-4" role="group" aria-label="Dataset navigation">
      <a href="#cifar10">CIFAR-10</a>
      <a href="#cifar100">CIFAR-100</a>
      <a href="#svhn">SVHN</a>
      <a href="#tiny">Tiny</a>
      <a href="#mnist">MNIST</a>
    </div>
    <!-- show all images in order -->
    <div class="dataset-image" id="cifar10">
      <h2>CIFAR-10 Leaderboard</h2>
      <img src="images/cifar10_leaderboard.png" alt="CIFAR-10 Leaderboard">
    </div>
    <div class="dataset-image" id="cifar100">
      <h2>CIFAR-100 Leaderboard</h2>
      <img src="images/cifar100_leaderboard.png" alt="CIFAR-100 Leaderboard">
    </div>
    <div class="dataset-image" id="svhn">
      <h2>SVHN Leaderboard</h2>
      <img src="images/svhn_leaderboard.png" alt="SVHN Leaderboard">
    </div>
    <div class="dataset-image" id="tiny">
      <h2>Tiny Leaderboard</h2>
      <img src="images/tiny_leaderboard.png" alt="Tiny Leaderboard">
    </div>
      <div class="dataset-image" id="mnist">
      <h2>MNIST Leaderboard</h2>
      <img src="images/mnist_leaderboard.png" alt="MNIST Leaderboard">
    </div>
  </div>

  <!-- Contribute -->
  <div class="container" id="contribute">
    <h1>Contribute</h1>
    <p>welcome to make a contribution for PRBench!<br>
       - submit Issue or Pull Request<br>
       - share new Leaderboard images<br>
       - update files or examples
    </p>
  </div>

  <!-- JS -->
  <script src="static/js/scroll.js"></script>
</body>
</html>

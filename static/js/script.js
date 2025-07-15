document.addEventListener('DOMContentLoaded', function() {
  console.log('PRBench scripts loaded');
  document.querySelectorAll('select').forEach(function(sel) {
    sel.addEventListener('change', function(e) {
      console.log('Filter changed:', e.target.name, e.target.value);
    });
  });
  var slider = document.querySelector('input[type="range"]');
  if (slider) {
    var label = document.createElement('span');
    slider.parentNode.appendChild(label);
    function updateLabel() {
      label.textContent = ' ' + slider.value;
    }
    slider.addEventListener('input', updateLabel);
    updateLabel();
  }
});

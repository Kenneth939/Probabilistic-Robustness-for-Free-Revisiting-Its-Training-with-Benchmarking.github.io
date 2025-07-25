// static/js/chart-init.js

document.addEventListener('DOMContentLoaded', () => {
  const DATA_URL   = 'static/src/data/prbench_table9.json';
  const GAMMAS     = ['0.03', '0.08', '0.10', '0.12'];
  const RHO_LEVELS = ['0.10', '0.05', '0.01'];

  // —— 为每个 method 定义固定颜色 —— 
  const COLOR_MAP = {
    'ERM':           'rgba(31,119,180,1)',   // blue
    'Corr_Uniform':  'rgba(255,127,14,1)',   // orange
    'CVaR':          'rgba(44,160,44,1)',    // green
    'PGD':           'rgba(214,39,40,1)',    // red
    'TRADES':        'rgba(148,103,189,1)',  // purple
    'MART':          'rgba(140,86,75,1)',    // brown
    'ALP':           'rgba(227,119,194,1)',  // pink
    'CLP':           'rgba(127,127,127,1)',  // grey
    'KL-PGD':        'rgba(188,189,34,1)'    // yellow
  };

  // 按钮容器 & 标题
  const dsBtns     = document.getElementById('chart-ds-buttons');
  const modelBtns  = document.getElementById('chart-model-buttons');
  const titleEl    = document.getElementById('chart-title');

  // Canvas 上下文
  const ctxPR      = document.getElementById('chart-pr').getContext('2d');
  const ctxProb    = document.getElementById('chart-probacc').getContext('2d');
  const ctxGEPR    = document.getElementById('chart-gepr').getContext('2d');

  // 当前图表实例，用于销毁
  const charts = [];

  fetch(DATA_URL)
    .then(res => res.json())
    .then(allData => {
      // 1. 生成 Dataset 按钮
      const datasets = Array.from(new Set(allData.map(d => d.dataset)));
      datasets.forEach(ds => {
        const btn = document.createElement('button');
        btn.type        = 'button';
        btn.className   = 'btn btn-outline-primary';
        btn.textContent = ds;
        btn.dataset.ds  = ds;
        dsBtns.appendChild(btn);
      });

      // 2. 点击 Dataset → 生成 Model 按钮
      dsBtns.addEventListener('click', e => {
        if (e.target.tagName !== 'BUTTON') return;
        dsBtns.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const selDS = e.target.dataset.ds;
        const models = Array.from(new Set(
          allData.filter(d => d.dataset === selDS).map(d => d.model)
        ));

        modelBtns.innerHTML = '';
        models.forEach(m => {
          const mb = document.createElement('button');
          mb.type          = 'button';
          mb.className     = 'btn btn-outline-secondary';
          mb.textContent   = m;
          mb.dataset.model = m;
          modelBtns.appendChild(mb);
        });

        // 自动点击第一个 Model
        setTimeout(() => {
          modelBtns.querySelector('button')?.click();
        }, 0);
      });

      // 3. 点击 Model → 更新标题 & 绘图
      modelBtns.addEventListener('click', e => {
        if (e.target.tagName !== 'BUTTON') return;
        modelBtns.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const selDS    = dsBtns.querySelector('button.active')?.dataset.ds;
        const selModel = e.target.dataset.model;
        titleEl.textContent = selDS && selModel
          ? `${selDS} with ${selModel}`
          : '';

        if (!selDS || !selModel) return;

        // 销毁旧图
        charts.splice(0).forEach(c => c.destroy());

        // 筛选记录
        const recs = allData.filter(d => d.dataset === selDS && d.model === selModel);
        const methods = Array.from(new Set(recs.map(r => r.method)));

        // 构造 three datasets
        const dsPR = methods.map(m => {
          const r = recs.find(r => r.method === m);
          const c = COLOR_MAP[m] || 'rgba(0,0,0,1)';
          return {
            label: m,
            data: GAMMAS.map(g => r?.pr[g] ?? null),
            borderColor: c,
            backgroundColor: c.replace(/1\)$/, '0.1)'),
            tension: 0.3
          };
        });

        const dsProb = methods.map(m => {
          const r = recs.find(r => r.method === m);
          const c = COLOR_MAP[m] || 'rgba(0,0,0,1)';
          return {
            label: m,
            data: RHO_LEVELS.map(rho => r?.probacc[rho] ?? null),
            borderColor: c,
            backgroundColor: c.replace(/1\)$/, '0.1)'),
            borderDash: [5,3],
            tension: 0.3
          };
        });

        const dsGEPR = methods.map(m => {
          const r = recs.find(r => r.method === m);
          const c = COLOR_MAP[m] || 'rgba(0,0,0,1)';
          return {
            label: m,
            data: GAMMAS.map(g => r?.ge_pr[g] ?? null),
            borderColor: c,
            backgroundColor: c.replace(/1\)$/, '0.1)'),
            borderDash: [2,2],
            tension: 0.3
          };
        });

        // 配置工厂
        const makeConfig = (labels, datasets, title, yLabel, xLabel) => ({
          type: 'line',
          data: { labels, datasets },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: { display: true, text: title, font: { size: 16 } },
              legend: { position: 'bottom', labels: { boxWidth: 12 } },
              zoom: { zoom:{wheel:{enabled:true},pinch:{enabled:true},mode:'x'}, pan:{enabled:true,mode:'x'} }
            },
            scales: {
              x: { title: { display: true, text: xLabel } },
              y: { title: { display: true, text: yLabel } }
            }
          }
        });

        // 绘图
        charts.push(new Chart(ctxPR,   makeConfig(GAMMAS, dsPR,   'PR(γ)%',            'Accuracy %',       'γ')));
        charts.push(new Chart(ctxProb, makeConfig(RHO_LEVELS, dsProb, 'ProbAcc(ρ,γ=0.03)%','Accuracy %',       'ρ')));
        charts.push(new Chart(ctxGEPR, makeConfig(GAMMAS, dsGEPR, 'GEPR(γ)%',          'Generalisation Error %','γ')));
      });

      // 默认选中第一个 Dataset
      dsBtns.querySelector('button')?.click();
    })
    .catch(err => console.error('unable to load data:', err));
});

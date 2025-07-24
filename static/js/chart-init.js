// static/js/chart-init.js

document.addEventListener('DOMContentLoaded', () => {
  const DATA_URL   = 'static/src/data/prbench_table9.json';
  const GAMMAS     = ['0.03','0.08','0.10','0.12'];
  const RHO_LEVELS = ['0.10','0.05','0.01'];

  // 按钮容器
  const dsBtns    = document.getElementById('chart-ds-buttons');
  const modelBtns = document.getElementById('chart-model-buttons');
  // 画布 Context
  const ctxPR     = document.getElementById('chart-pr').getContext('2d');
  const ctxProb   = document.getElementById('chart-probacc').getContext('2d');
  const ctxGEPR   = document.getElementById('chart-gepr').getContext('2d');
  // 存储当前图表实例
  const charts    = [];

  fetch(DATA_URL)
    .then(r => r.json())
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
        // 切换激活样式
        dsBtns.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const selDS = e.target.dataset.ds;
        // 筛出该 dataset 下所有 model
        const models = Array.from(new Set(
          allData
            .filter(d => d.dataset === selDS)
            .map(d => d.model)
        ));

        // 清空旧的 model 按钮
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

      // 3. 点击 Model → 渲染三张图
      modelBtns.addEventListener('click', e => {
        if (e.target.tagName !== 'BUTTON') return;
        // 切换激活样式
        modelBtns.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const selDS    = dsBtns.querySelector('button.active')?.dataset.ds;
        const selModel = e.target.dataset.model;
        if (!selDS || !selModel) return;

        // 销毁旧图
        charts.splice(0).forEach(c => c.destroy());

        // 筛出对应记录
        const recs = allData.filter(d => d.dataset === selDS && d.model === selModel);
        const methods = Array.from(new Set(recs.map(r => r.method)));

        // 准备三个数据集
        const dsPR = methods.map(m => {
          const r = recs.find(r => r.method === m);
          return {
            label: m,
            data: GAMMAS.map(g => r?.pr[g] ?? null),
            tension: 0.3
          };
        });
        const dsProb = methods.map(m => {
          const r = recs.find(r => r.method === m);
          return {
            label: m,
            data: RHO_LEVELS.map(rho => r?.probacc[rho] ?? null),
            borderDash: [5,3],
            tension: 0.3
          };
        });
        const dsGEPR = methods.map(m => {
          const r = recs.find(r => r.method === m);
          return {
            label: m,
            data: GAMMAS.map(g => r?.ge_pr[g] ?? null),
            borderDash: [2,2],
            tension: 0.3
          };
        });

        // 公共配置函数
        const makeConfig = (labels, datasets, title, yLabel, isProb=false) => ({
          type: 'line',
          data: { labels, datasets },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              title: { display: true, text: title, font: { size: 16 } },
              legend: { position: 'bottom', labels: { boxWidth: 12 } },
              zoom: {
                zoom: {
                  wheel: { enabled: true },
                  pinch: { enabled: true },
                  mode: 'x'
                },
                pan: { enabled: true, mode: 'x' }
              }
            },
            scales: {
              x: {
                title: { display: true, text: isProb ? 'Perturbation Radius ρ' : 'Perturbation Radius γ' }
              },
              y: {
                title: { display: true, text: yLabel }
              }
            }
          }
        });

        // 绘制三张图
        charts.push(new Chart(ctxPR,   makeConfig(GAMMAS,    dsPR,   'PR(γ)%',             'Accuracy %')));
        charts.push(new Chart(ctxProb, makeConfig(RHO_LEVELS, dsProb, 'ProbAcc(ρ,γ=0.03)%', 'Accuracy %', true)));
        charts.push(new Chart(ctxGEPR, makeConfig(GAMMAS,    dsGEPR, 'GEPR(γ)%',           'Error %')));
      });

      // 默认选中第一个 Dataset
      dsBtns.querySelector('button')?.click();
    })
    .catch(err => console.error('无法加载数据:', err));
});

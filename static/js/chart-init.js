// static/js/chart-init.js
document.addEventListener('DOMContentLoaded', () => {
  const DATA_URL = 'static/src/data/prbench_table9.json';
  const RHO_LEVELS = ['0.01','0.05','0.10'];

  // 存放当前所有的 Chart 实例，以便销毁
  const chartPool = [];

  // 1) 获取 JSON
  fetch(DATA_URL)
    .then(r => r.json())
    .then(allData => {
      // 提取所有可选 dataset
      const datasets = Array.from(new Set(allData.map(d => d.dataset)));
      const btnContainer = document.getElementById('chart-dataset-buttons');

      // 生成 dataset 按钮
      datasets.forEach(ds => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary';
        btn.textContent = ds;
        btn.dataset.ds = ds;
        btnContainer.appendChild(btn);
      });

      // 点击按钮时高亮 & 渲染
      btnContainer.addEventListener('click', e => {
        if (e.target.tagName !== 'BUTTON') return;
        // 切换 active 样式
        btnContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        // 渲染该 dataset 的图
        renderChartsForDataset(allData, e.target.dataset.ds);
      });

      // 默认渲染第一个
      btnContainer.querySelector('button').click();
    });

  function renderChartsForDataset(allData, dataset) {
    // 先销毁旧图表
    chartPool.splice(0).forEach(ch => ch.destroy());
    // 清空容器
    const row = document.getElementById('charts-container');
    row.innerHTML = '';

    // 筛出该 dataset 记录，并按 model 分组
    const dsData = allData.filter(d => d.dataset === dataset);
    const models = Array.from(new Set(dsData.map(d => d.model)));

    models.forEach(model => {
      // 每个 model 一列（col-md-4）
      const col = document.createElement('div');
      col.className = 'col-md-4';
      // 创建 canvas
      const canvas = document.createElement('canvas');
      const cid = `chart-${dataset}-${model}`.replace(/\W/g,'');
      canvas.id = cid;
      col.appendChild(canvas);
      // 标题
      const title = document.createElement('h5');
      title.className = 'text-center mb-2';
      title.textContent = `${dataset} — ${model}`;
      col.insertBefore(title, canvas);
      row.appendChild(col);

      // 找到该 model 下所有 methods
      const recs = dsData.filter(d => d.model === model);
      const methods = Array.from(new Set(recs.map(r => r.method)));

      // 三个子图：PR, ProbAcc, GEPR
      // 为简洁，把三段配置合并在一个大 options 数组里：
      const chartTypes = [
        {
          label: 'PR(γ)%', 
          extract: r => RHO_LEVELS.map(g => r.pr[g]),
          yLabel: 'PR(γ)%'
        },
        {
          label: 'ProbAcc(ρ,γ=0.03)%', 
          extract: r => RHO_LEVELS.map(g => r.probacc[g]),
          yLabel: 'ProbAcc(ρ,γ=0.03)%'
        },
        {
          label: 'GEPR(γ)%', 
          extract: r => RHO_LEVELS.map(g => r.ge_pr[g]),
          yLabel: 'GEPR(γ)%'
        }
      ];

      // 对于每个子图都生成一个 Chart 实例
      chartTypes.forEach((ct, idx) => {
        // 若要在同一 canvas 上画三张子图，可考虑子画布或 split，但这里我们简单
        // 依次把三个折线绘在同一个 canvas 上，仅靠不同样式区分
        const dsList = methods.map(m => {
          const rec = recs.find(r => r.method === m);
          return {
            label: m,
            data: rec ? ct.extract(rec) : RHO_LEVELS.map(_=>null),
            borderDash: idx===1 ? [5,5] : [],   // 第二条虚线
            tension: 0.3
          };
        });

        const chart = new Chart(canvas.getContext('2d'), {
          type: 'line',
          data: {
            labels: RHO_LEVELS,
            datasets: dsList
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: ct.label,
                font: { size: 14 }
              },
              legend: { position: 'bottom' },
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
                title: { display: true, text: 'ρ / γ' }
              },
              y: {
                title: { display: true, text: ct.yLabel }
              }
            }
          }
        });

        chartPool.push(chart);
      });
    });
  }
});

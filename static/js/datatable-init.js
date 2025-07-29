// static/js/datatable-init.js

$(function() {

  // ==== Leaderboard Table ====
  $('#leaderboard-table').DataTable({
    // 将 length + filter 放到自定义的 top-controls 容器中，方便插入 legend
    dom: '<"top-controls"lf>tip',
    ajax: {
      url: 'static/src/data/prbench_table8.json',
      dataSrc: '',
      error: function(xhr, error, thrown) {
        console.error('Failed to load JSON:', xhr.status, thrown);
      }
    },
    // 19 列定义，必须和 <thead> 一一对应
    columns: [
      { data: 'dataset', defaultContent: '' },               // 0
      { data: 'model',   defaultContent: '' },               // 1
      { data: 'method',  defaultContent: '' },               // 2
      { data: 'acc',     defaultContent: '' },               // 3

      // --- PR under Uniform ---
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_uniform['0.03']
      }, // 4
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_uniform['0.08']
      }, // 5
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_uniform['0.1']
      }, // 6
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_uniform['0.12']
      }, // 7

      // --- PR under Gaussian ---
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_gaussian['0.03']
      }, // 8
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_gaussian['0.08']
      }, // 9
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_gaussian['0.1']
      }, // 10
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_gaussian['0.12']
      }, // 11

      // --- PR under Laplace ---
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_laplace['0.03']
      }, // 12
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_laplace['0.08']
      }, // 13
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_laplace['0.1']
      }, // 14
      {
        data: null,
        defaultContent: '',
        render: d => d.pr_laplace['0.12']
      }, // 15

      // --- Generalisation Error ---
      {
        data: null,
        defaultContent: '',
        render: d => d.ge.uni
      }, // 16
      {
        data: null,
        defaultContent: '',
        render: d => d.ge.gau
      }, // 17
      {
        data: null,
        defaultContent: '',
        render: d => d.ge.lap
      }  // 18
    ],
    order: [],    // 保持 JSON 原始顺序
    pageLength: 25,

    // ==== 根据 method 给每行打 class，以便着色 ====
    rowCallback: function(row, data) {
      $(row).removeClass('row-emr row-ar row-pr');
      if (data.method === 'ERM') {
        $(row).addClass('row-emr');
      } else if (data.method === 'PGD') {
        $(row).addClass('row-ar');
      } else if (['Corr_Uniform','Corr_Gaussian','Corr_Laplace'].includes(data.method)) {
        $(row).addClass('row-pr');
      }
    },

    // ==== 初始化完成后插入按钮过滤 & legend ====
    initComplete: function() {
      const api = this.api();

      // 原有按钮过滤逻辑
      const mapVals = idx => api.column(idx).data().unique().sort().toArray();
      function makeButtons(vals, sel, colIdx) {
        const $c = $(sel).empty();
        $c.append(`<button class="btn btn-sm me-1 active" data-col="${colIdx}" data-val="">All</button>`);
        vals.forEach(v => {
          $c.append(`<button class="btn btn-sm me-1" data-col="${colIdx}" data-val="${v}">${v}</button>`);
        });
        $c.on('click', 'button', function() {
          const $btn = $(this);
          $c.find('button').removeClass('active');
          $btn.addClass('active');
          api.column(colIdx).search($btn.data('val')).draw();
        });
      }
      makeButtons(mapVals(0), '#dataset-buttons', 0);
      makeButtons(mapVals(1), '#model-buttons',   1);
      makeButtons(mapVals(2), '#method-buttons',  2);

      // 插入 Legend 到 top-controls 容器最前面
      const legendHtml = `
        <div class="table-legend">
          <div class="legend-item"><span class="legend-box box-emr"></span>ERM</div>
          <div class="legend-item"><span class="legend-box box-ar"></span>PGD (AR)</div>
          <div class="legend-item"><span class="legend-box box-pr"></span>Corr_* (PR)</div>
        </div>`;
      $(this.table().container()).find('.top-controls').prepend(legendHtml);
    }
  });


  // ==== Performance Table ====
  $('#performance-table').DataTable({
    dom: '<"top-controls"lf>tip',
    ajax: {
      url: 'static/src/data/prbench_table9.json',
      dataSrc: ''
    },
    columns: [
      // 0–3 顶层字段
      { data: 'dataset', defaultContent: '' },
      { data: 'model',   defaultContent: '' },
      { data: 'method',  defaultContent: '' },
      { data: 'acc',     defaultContent: '' },

      // AR 列
      { data: null, render: d => d.ar['PGD10'] },
      { data: null, render: d => d.ar['PGD20'] },
      { data: null, render: d => d.ar['CW20']  },
      { data: null, render: d => d.ar['AA']    },

      // PR 列
      { data: null, render: d => d.pr['0.03']  },
      { data: null, render: d => d.pr['0.08']  },
      { data: null, render: d => d.pr['0.10']  },
      { data: null, render: d => d.pr['0.12']  },

      // ProbAccPR 列
      { data: null, render: d => d.probacc['0.10'] },
      { data: null, render: d => d.probacc['0.05'] },
      { data: null, render: d => d.probacc['0.01'] },

      // GEAR 列
      { data: null, render: d => d.ge_ar['PGD20'] },

      // GEPR 列
      { data: null, render: d => d.ge_pr['0.03'] },
      { data: null, render: d => d.ge_pr['0.08'] },
      { data: null, render: d => d.ge_pr['0.10'] },
      { data: null, render: d => d.ge_pr['0.12'] },

      // 训练时间
      { data: null, render: d => d.time_s_per_ep }
    ],
    order: [],
    pageLength: 25,

    rowCallback: function(row, data) {
      $(row).removeClass('row-emr row-ar row-pr');
      if (data.method === 'ERM') {
        $(row).addClass('row-emr');
      } else if (['ALP','CLP','KL-PGD','MART','PGD','TRADES'].includes(data.method)) {
        $(row).addClass('row-ar');
      } else if (['CVaR','Corr_Uniform'].includes(data.method)) {
        $(row).addClass('row-pr');
      }
    },

    initComplete: function() {
      const api = this.api();

      // 原有按钮过滤逻辑
      const vals = idx => api.column(idx).data().unique().sort().toArray();
      function makeButtons(list, sel, colIdx) {
        const $c = $(sel).empty();
        $c.append(`<button class="btn btn-sm me-1 active" data-col="${colIdx}" data-val="">All</button>`);
        list.forEach(v => {
          $c.append(`<button class="btn btn-sm me-1" data-col="${colIdx}" data-val="${v}">${v}</button>`);
        });
        $c.on('click', 'button', function() {
          const $btn = $(this);
          $c.find('button').removeClass('active');
          $btn.addClass('active');
          api.column(colIdx).search($btn.data('val')).draw();
        });
      }
      makeButtons(vals(0), '#performance-dataset-buttons', 0);
      makeButtons(vals(1), '#performance-model-buttons',   1);
      makeButtons(vals(2), '#performance-method-buttons',  2);

      // 插入 Legend
      const legendHtml = `
        <div class="table-legend">
          <div class="legend-item"><span class="legend-box box-emr"></span>ERM</div>
          <div class="legend-item"><span class="legend-box box-ar"></span>ALP/CLP/KL-PGD/MART/PGD/TRADES</div>
          <div class="legend-item"><span class="legend-box box-pr"></span>CVaR & Corr_Uniform</div>
        </div>`;
      $(this.table().container()).find('.top-controls').prepend(legendHtml);
    }
  });

});


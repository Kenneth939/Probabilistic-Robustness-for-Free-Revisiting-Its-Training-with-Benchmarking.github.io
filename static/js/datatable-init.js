// static/js/datatable-init.js

$(function() {

  // ==== Leaderboard Table ====
  $('#leaderboard-table').DataTable({
    dom: '<"top-controls"l<"table-legend">f>tip',
    ajax: {
      url: 'static/src/data/prbench_table8.json',
      dataSrc: '',
      error: function(xhr, error, thrown) {
        console.error('Failed to load JSON:', xhr.status, thrown);
      }
    },
    columns: [
      { data: 'dataset', defaultContent: '' },
      { data: 'model',   defaultContent: '' },
      { data: 'method',  defaultContent: '' },
      { data: 'acc',     defaultContent: '' },
      // PR under Uniform
      { data: null, render: d => d.pr_uniform['0.03'] },
      { data: null, render: d => d.pr_uniform['0.08'] },
      { data: null, render: d => d.pr_uniform['0.1']  },
      { data: null, render: d => d.pr_uniform['0.12'] },
      // PR under Gaussian
      { data: null, render: d => d.pr_gaussian['0.03'] },
      { data: null, render: d => d.pr_gaussian['0.08'] },
      { data: null, render: d => d.pr_gaussian['0.1']  },
      { data: null, render: d => d.pr_gaussian['0.12'] },
      // PR under Laplace
      { data: null, render: d => d.pr_laplace['0.03'] },
      { data: null, render: d => d.pr_laplace['0.08'] },
      { data: null, render: d => d.pr_laplace['0.1']  },
      { data: null, render: d => d.pr_laplace['0.12'] },
      // Generalisation Error
      { data: null, render: d => d.ge.uni },
      { data: null, render: d => d.ge.gau },
      { data: null, render: d => d.ge.lap }
    ],
    order: [],
    pageLength: 25,

    // 给行打 class 以便上色
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

    initComplete: function() {
      const api = this.api();

      // 精确匹配的按钮过滤函数
      const mapVals = idx => api.column(idx).data().unique().sort().toArray();
      function makeButtons(vals, selector, colIdx) {
        const $wrap = $(selector).empty();
        $wrap.append(`<button class="btn btn-sm me-1 active" data-col="${colIdx}" data-val="">All</button>`);
        vals.forEach(v => {
          $wrap.append(`<button class="btn btn-sm me-1" data-col="${colIdx}" data-val="${v}">${v}</button>`);
        });
        $wrap.on('click', 'button', function() {
          const $btn = $(this);
          const val  = $btn.data('val');
          $wrap.find('button').removeClass('active');
          $btn.addClass('active');
          const column = api.column(colIdx);
          if (!val) {
            // 取消过滤
            column.search('').draw();
          } else {
            // 正则精确匹配，关闭 smart 和模糊
            const esc = $.fn.dataTable.util.escapeRegex(val);
            column.search(`^${esc}$`, true, false).draw();
          }
        });
      }

      makeButtons(mapVals(0), '#dataset-buttons', 0);
      makeButtons(mapVals(1), '#model-buttons',   1);
      makeButtons(mapVals(2), '#method-buttons',  2);

      // 插入 Legend 文案
      const legendHtml = `
        <div class="table-legend">
          <div class="legend-item"><span class="legend-box box-emr"></span>Neither AR nor PR methods</div>
          <div class="legend-item"><span class="legend-box box-ar"></span>AR methods</div>
          <div class="legend-item"><span class="legend-box box-pr"></span>PR methods</div>
        </div>`;
      $(api.table().container()).find('.table-legend').html(legendHtml);
    }
  });


  // ==== Performance Table ====
  $('#performance-table').DataTable({
    dom: '<"top-controls"l<"table-legend">f>tip',
    ajax: {
      url: 'static/src/data/prbench_table9.json',
      dataSrc: ''
    },
    columns: [
      { data: 'dataset', defaultContent: '' },
      { data: 'model',   defaultContent: '' },
      { data: 'method',  defaultContent: '' },
      { data: 'acc',     defaultContent: '' },
      // AR
      { data: null, render: d => d.ar['PGD10'] },
      { data: null, render: d => d.ar['PGD20'] },
      { data: null, render: d => d.ar['CW20']  },
      { data: null, render: d => d.ar['AA']    },
      // PR
      { data: null, render: d => d.pr['0.03']  },
      { data: null, render: d => d.pr['0.08']  },
      { data: null, render: d => d.pr['0.10']  },
      { data: null, render: d => d.pr['0.12']  },
      // ProbAccPR
      { data: null, render: d => d.probacc['0.10'] },
      { data: null, render: d => d.probacc['0.05'] },
      { data: null, render: d => d.probacc['0.01'] },
      // GEAR
      { data: null, render: d => d.ge_ar['PGD20'] },
      // GEPR
      { data: null, render: d => d.ge_pr['0.03'] },
      { data: null, render: d => d.ge_pr['0.08'] },
      { data: null, render: d => d.ge_pr['0.10'] },
      { data: null, render: d => d.ge_pr['0.12'] },
      // time
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

      const vals = idx => api.column(idx).data().unique().sort().toArray();
      function makeButtons(vals, selector, colIdx) {
        const $wrap = $(selector).empty();
        $wrap.append(`<button class="btn btn-sm me-1 active" data-col="${colIdx}" data-val="">All</button>`);
        vals.forEach(v => {
          $wrap.append(`<button class="btn btn-sm me-1" data-col="${colIdx}" data-val="${v}">${v}</button>`);
        });
        $wrap.on('click', 'button', function() {
          const $btn = $(this);
          const val  = $btn.data('val');
          $wrap.find('button').removeClass('active');
          $btn.addClass('active');
          const column = api.column(colIdx);
          if (!val) {
            column.search('').draw();
          } else {
            const esc = $.fn.dataTable.util.escapeRegex(val);
            column.search(`^${esc}$`, true, false).draw();
          }
        });
      }

      makeButtons(vals(0), '#performance-dataset-buttons', 0);
      makeButtons(vals(1), '#performance-model-buttons',   1);
      makeButtons(vals(2), '#performance-method-buttons',  2);

      const legendHtml = `
        <div class="table-legend">
          <div class="legend-item"><span class="legend-box box-emr"></span>Neither AR nor PR methods</div>
          <div class="legend-item"><span class="legend-box box-ar"></span>AR methods</div>
          <div class="legend-item"><span class="legend-box box-pr"></span>PR methods</div>
        </div>`;
      $(api.table().container()).find('.table-legend').html(legendHtml);
    }
  });

});


// static/js/datatable-init.js

$(function() {
  const table = $('#leaderboard-table').DataTable({
    // l = length, f = filter (搜索框), r = processing, t = table, i = info, p = pagination
    dom: 'lfrtip',

    // AJAX 加载 JSON
    ajax: {
      url: 'static/src/data/prbench_table8.json',
      dataSrc: '',
      error: function(xhr, error, thrown) {
        console.error('加载 JSON 失败:', xhr.status, thrown);
      }
    },

    // 列定义（确保 <thead> 有 19 个 <th>）
    columns: [
      { data: 'dataset' },   // 0
      { data: 'model'   },   // 1
      { data: 'method'  },   // 2
      { data: 'acc'     },   // 3

      // --- PR under Uniform ---
      { data: 'pr_uniform', render: d => d['0.03'] }, // 4
      { data: 'pr_uniform', render: d => d['0.08'] }, // 5
      { data: 'pr_uniform', render: d => d['0.1']  }, // 6  ← 注意这里用 '0.1'
      { data: 'pr_uniform', render: d => d['0.12'] }, // 7

      // --- PR under Gaussian ---
      { data: 'pr_gaussian', render: d => d['0.03'] }, // 8
      { data: 'pr_gaussian', render: d => d['0.08'] }, // 9
      { data: 'pr_gaussian', render: d => d['0.1']  }, // 10
      { data: 'pr_gaussian', render: d => d['0.12'] }, // 11

      // --- PR under Laplace ---
      { data: 'pr_laplace', render: d => d['0.03'] }, // 12
      { data: 'pr_laplace', render: d => d['0.08'] }, // 13
      { data: 'pr_laplace', render: d => d['0.1']  }, // 14
      { data: 'pr_laplace', render: d => d['0.12'] }, // 15

      // --- Generalisation Error ---
      { data: 'ge', render: d => d.uni }, // 16
      { data: 'ge', render: d => d.gau }, // 17
      { data: 'ge', render: d => d.lap }  // 18
    ],

    // 保持 JSON 原始顺序，不做初始排序
    order: [],

    // 每页显示 25 行
    pageLength: 25,

    // 初始化完成后，给前三列创建按钮过滤
    initComplete: function() {
      const api = this.api();

      // 取出三列唯一值
      const datasets = api.column(0).data().unique().sort().toArray();
      const models   = api.column(1).data().unique().sort().toArray();
      const methods  = api.column(2).data().unique().sort().toArray();

      // 在指定容器生成按钮并绑定过滤
      function makeButtons(vals, selector, colIdx) {
        const $c = $(selector).empty();
        $c.append(`<button class="btn btn-sm me-1 active" data-col="${colIdx}" data-val="">All</button>`);
        vals.forEach(v => {
          $c.append(`<button class="btn btn-sm me-1" data-col="${colIdx}" data-val="${v}">${v}</button>`);
        });
        $c.on('click', 'button', function() {
          $c.find('button').removeClass('active');
          $(this).addClass('active');
          api.column(colIdx).search($(this).data('val')).draw();
        });
      }

      makeButtons(datasets, '#dataset-buttons', 0);
      makeButtons(models,   '#model-buttons',   1);
      makeButtons(methods,  '#method-buttons',  2);
    }
  });
});


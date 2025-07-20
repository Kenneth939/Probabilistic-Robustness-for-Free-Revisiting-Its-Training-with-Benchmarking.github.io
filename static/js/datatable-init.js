// static/js/datatable-init.js

$(function() {
  const table = $('#leaderboard-table').DataTable({
    // l = length, f = filter(Search), r = processing, t = table, i = info, p = pagination
    dom: 'lfrtip',

    // AJAX 加载 JSON
    ajax: {
      url: 'static/src/data/prbench_table8.json',
      dataSrc: '',
      error: function(xhr, error, thrown) {
        console.error('加载 JSON 失败:', xhr.status, thrown);
      }
    },

    // 列定义（共 19 列）
    columns: [
      { data: 'dataset' }, // 0
      { data: 'model'   }, // 1
      { data: 'method'  }, // 2
      { data: 'acc'     }, // 3

      // Uniform PR
      {
        data: function(row) { return row.pr_uniform['0.03']; }
      }, // 4
      {
        data: function(row) { return row.pr_uniform['0.08']; }
      }, // 5
      {
        data: function(row) { return row.pr_uniform['0.10']; }
      }, // 6
      {
        data: function(row) { return row.pr_uniform['0.12']; }
      }, // 7

      // Gaussian PR
      {
        data: function(row) { return row.pr_gaussian['0.03']; }
      }, // 8
      {
        data: function(row) { return row.pr_gaussian['0.08']; }
      }, // 9
      {
        data: function(row) { return row.pr_gaussian['0.10']; }
      }, // 10
      {
        data: function(row) { return row.pr_gaussian['0.12']; }
      }, // 11

      // Laplace PR
      {
        data: function(row) { return row.pr_laplace['0.03']; }
      }, // 12
      {
        data: function(row) { return row.pr_laplace['0.08']; }
      }, // 13
      {
        data: function(row) { return row.pr_laplace['0.10']; }
      }, // 14
      {
        data: function(row) { return row.pr_laplace['0.12']; }
      }, // 15

      // Generalisation Error
      {
        data: function(row) { return row.ge.uni; }
      }, // 16
      {
        data: function(row) { return row.ge.gau; }
      }, // 17
      {
        data: function(row) { return row.ge.lap; }
      }  // 18
    ],

    // 保持 JSON 原始顺序，不做初始排序
    order: [],

    pageLength: 25,

    // 初始化完成后，为前三列创建按钮过滤
    initComplete: function() {
      const api = this.api();

      // 取出唯一值并排序
      const datasets = api.column(0).data().unique().sort().toArray();
      const models   = api.column(1).data().unique().sort().toArray();
      const methods  = api.column(2).data().unique().sort().toArray();

      function makeBtns(vals, container, colIdx) {
        const $c = $(container).empty();
        $c.append(`<button type="button" class="btn btn-sm me-1 active" data-col="${colIdx}" data-val="">All</button>`);
        vals.forEach(v => {
          $c.append(`<button type="button" class="btn btn-sm me-1" data-col="${colIdx}" data-val="${v}">${v}</button>`);
        });
        $c.on('click', 'button', function() {
          const $b = $(this);
          $c.find('button').removeClass('active');
          $b.addClass('active');
          api.column($b.data('col')).search($b.data('val')).draw();
        });
      }

      // 三个按钮组
      makeBtns(datasets, '#dataset-buttons', 0);
      makeBtns(models,   '#model-buttons',   1);
      makeBtns(methods,  '#method-buttons',  2);
    }
  });
});


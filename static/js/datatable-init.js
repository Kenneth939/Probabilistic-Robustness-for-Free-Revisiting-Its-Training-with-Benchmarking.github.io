// static/js/datatable-init.js

$(function() {
  $('#leaderboard-table').DataTable({
    // l = length, f = search, r = processing, t = table, i = info, p = pagination
    dom: 'lfrtip',

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
        render: d => d.pr_uniform['0.1']   // <-- matches your JSON key
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

    // 保持 JSON 原始顺序，不做初始排序
    order: [],

    pageLength: 25,

    // 初始化完成后，为前三列创建按钮过滤
    initComplete: function() {
      const api = this.api();
      const mapVals = idx =>
        api.column(idx).data().unique().sort().toArray();

      function makeButtons(vals, sel, colIdx) {
        const $c = $(sel).empty();
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

      makeButtons(mapVals(0), '#dataset-buttons', 0);
      makeButtons(mapVals(1), '#model-buttons',   1);
      makeButtons(mapVals(2), '#method-buttons',  2);
    }
  });
});

// performance-table 初始化
const perfTable = $('#performance-table').DataTable({
  dom: 'lfrtip',
  ajax: {
    url: 'static/src/data/prbench_table9.json',
    dataSrc: ''
  },
  columns: [
    { data: 'dataset' },
    { data: 'model' },
    { data: 'method' },
    { data: 'acc' },
    { data: 'ar.pgd10' },
    { data: 'ar.pgd20' },
    { data: 'ar.cw20' },
    { data: 'ar.aa' },
    { data: 'pr["0.03"]' },
    { data: 'pr["0.08"]' },
    { data: 'pr["0.10"]' },
    { data: 'pr["0.12"]' },
    { data: 'probaccpr' },
    { data: 'gear.pgd20' },
    { data: 'gear["0.03"]' },
    { data: 'gear["0.08"]' },
    { data: 'gear["0.12"]' },
    { data: 'gepr.uni' },
    { data: 'gepr.gau' },
    { data: 'gepr.lap' },
    { data: 'time' }
  ],
  pageLength: 25,
  order: [],
  initComplete: function() {
    const api = this.api();
    // 填充下拉
    const col0 = api.column(0).data().unique().sort();
    const col1 = api.column(1).data().unique().sort();
    const col2 = api.column(2).data().unique().sort();
    function fill(sel, vals, idx) {
      const $s = $(sel).data('column', idx);
      vals.each(v => $s.append(`<option value="${v}">${v}</option>`));
      $s.on('change', () => api.column(idx).search($s.val()).draw());
    }
    fill('#performance-dataset-filter', col0, 0);
    fill('#performance-model-filter',   col1, 1);
    fill('#performance-method-filter',  col2, 2);
    // 全局搜索
    $('#performance-global-search').on('input', function() {
      perfTable.search(this.value).draw();
    });
  }
});

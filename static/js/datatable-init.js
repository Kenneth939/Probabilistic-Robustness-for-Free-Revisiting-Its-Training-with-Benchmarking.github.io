// static/js/datatable-init.js

$(function() {
  // === 原有 Leaderboard 初始化 ===
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


  // === Performance 表格初始化 ===
  $('#performance-table').DataTable({
    dom: 'lfrtip',
    ajax: {
      url: 'static/src/data/prbench_table9.json',
      dataSrc: '',
      error: function(xhr, error, thrown) {
        console.error('Failed to load JSON:', xhr.status, thrown);
      }
    },
    columns: [
      { data: 'dataset',    defaultContent: '' }, // 0
      { data: 'model',      defaultContent: '' }, // 1
      { data: 'method',     defaultContent: '' }, // 2
      { data: 'acc',        defaultContent: '' }, // 3

      // AR
      { data: null, defaultContent: '', render: d=>d.ar.pgd10 }, //4
      { data: null, defaultContent: '', render: d=>d.ar.pgd20 }, //5
      { data: null, defaultContent: '', render: d=>d.ar.cw20 }, //6
      { data: null, defaultContent: '', render: d=>d.ar.aa   }, //7

      // PR
      { data: null, defaultContent: '', render: d=>d.pr['0.03'] }, //8
      { data: null, defaultContent: '', render: d=>d.pr['0.08'] }, //9
      { data: null, defaultContent: '', render: d=>d.pr['0.10'] },//10
      { data: null, defaultContent: '', render: d=>d.pr['0.12'] },//11

      // ProbAccPR
      { data: null, defaultContent: '', render: d=>d.probaccpr }, //12

      // GEAR
      { data: null, defaultContent: '', render: d=>d.gear.pgd20 },//13
      { data: null, defaultContent: '', render: d=>d.gear['0.03'] },//14
      { data: null, defaultContent: '', render: d=>d.gear['0.08'] },//15
      { data: null, defaultContent: '', render: d=>d.gear['0.12'] },//16

      // GEPR
      { data: null, defaultContent: '', render: d=>d.gepr.uni },  //17
      { data: null, defaultContent: '', render: d=>d.gepr.gau },  //18
      { data: null, defaultContent: '', render: d=>d.gepr.lap },  //19

      // Time
      { data: null, defaultContent: '', render: d=>d.time }      //20
    ],
    pageLength: 25,
    order: [],
    initComplete: function() {
      const api = this.api();
      const vals = i => api.column(i).data().unique().sort().toArray();
      function makeButtons(vals, sel, colIdx) {
        const $c = $(sel).empty();
        $c.append(`<button class="btn btn-sm me-1 active" data-col="${colIdx}" data-val="">All</button>`);
        vals.forEach(v => {
          $c.append(`<button class="btn btn-sm me-1" data-col="${colIdx}" data-val="${v}">${v}</button>`);
        });
        $c.on('click','button',function(){
          $c.find('button').removeClass('active');
          $(this).addClass('active');
          api.column(colIdx).search($(this).data('val')).draw();
        });
      }
      makeButtons(vals(0), '#performance-dataset-buttons', 0);
      makeButtons(vals(1), '#performance-model-buttons',   1);
      makeButtons(vals(2), '#performance-method-buttons',  2);

      $('#performance-global-search').on('input', function(){
        api.search(this.value).draw();
      });
    }
  });

});

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
      const mapVals = idx => api.column(idx).data().unique().sort().toArray();

      function makeButtons(vals, sel, colIdx) {
        const $c = $(sel).empty();
        $c.append(`<button class="btn btn-sm me-1 active" data-col="${colIdx}" data-val="">All</button>`);
        vals.forEach(v => {
          $c.append(`<button class="btn btn-sm me-1" data-col="${colIdx}" data-val="${v}">${v}</button>`);
        });
        $c.on('click', 'button', function() {
          const $btn = $(this);
          const val  = $btn.data('val');
          const column = api.column($btn.data('col'));

          // 切换按钮样式
          $c.find('button').removeClass('active');
          $btn.addClass('active');

          // 使用正则完全匹配，关闭 smart 搜索
          if (val === '') {
            column.search('').draw();
          } else {
            // escape 正则元字符，再前后加 ^$ 完全匹配
            const esc = $.fn.dataTable.util.escapeRegex(val);
            column.search('^' + esc + '$', true, false).draw();
          }
        });
      }

      makeButtons(mapVals(0), '#dataset-buttons', 0);
      makeButtons(mapVals(1), '#model-buttons',   1);
      makeButtons(mapVals(2), '#method-buttons',  2);
    }
  });
});

// static/js/datatable-init.js
$(function() {
  $('#performance-table').DataTable({
    dom: 'lfrtip',
    ajax: {
      url: 'static/src/data/prbench_table9.json',
      dataSrc: ''
    },
    columns: [
      // 0–3 都是顶层字段
      { data: 'dataset', defaultContent: '' },
      { data: 'model',   defaultContent: '' },
      { data: 'method',  defaultContent: '' },
      { data: 'acc',     defaultContent: '' },

      // --- AR 列，JSON 用大写键名 “PGD10”/“PGD20”/“CW20”/“AA” ---
      {
        data: null, defaultContent: '',
        render: d => d.ar['PGD10']
      },
      {
        data: null, defaultContent: '',
        render: d => d.ar['PGD20']
      },
      {
        data: null, defaultContent: '',
        render: d => d.ar['CW20']
      },
      {
        data: null, defaultContent: '',
        render: d => d.ar['AA']
      },

      // --- PR 列，键名 “0.03”/“0.08”/“0.10”/“0.12” ---
      {
        data: null, defaultContent: '',
        render: d => d.pr['0.03']
      },
      {
        data: null, defaultContent: '',
        render: d => d.pr['0.08']
      },
      {
        data: null, defaultContent: '',
        render: d => d.pr['0.10']
      },
      {
        data: null, defaultContent: '',
        render: d => d.pr['0.12']
      },

      // --- ProbAccPR 列，你的 JSON 键名叫 “probacc” ---
      {
        data: null, defaultContent: '',
        render: d => d.probacc['0.10']
      },
      {
        data: null, defaultContent: '',
        render: d => d.probacc['0.05']
      },
      {
        data: null, defaultContent: '',
        render: d => d.probacc['0.01']
      },
      
      // --- GEAR 列 (你把 ge_ar 当成了 gear) ---
      {
        data: null, defaultContent: '',
        render: d => d.ge_ar['PGD20']
      },

      // --- GEPR 列，用的是 ge_pr，键名同 PR 部分 ---
      {
        data: null, defaultContent: '',
        render: d => d.ge_pr['0.03']
      },
      {
        data: null, defaultContent: '',
        render: d => d.ge_pr['0.08']
      },
      {
        data: null, defaultContent: '',
        render: d => d.ge_pr['0.10']
      },
      {
        data: null, defaultContent: '',
        render: d => d.ge_pr['0.12']
      },

      // --- 训练时间列，对应 JSON 的 time_s_per_ep ---
      {
        data: null, defaultContent: '',
        render: d => d.time_s_per_ep
      }
    ],

    pageLength: 25,
    order: [],

    initComplete: function() {
      const api = this.api();
      const vals = idx => api.column(idx).data().unique().sort().toArray();

      function makeButtons(list, sel, colIdx) {
        const $c = $(sel).empty();
        $c.append(`<button class="btn btn-sm me-1 active" data-col="${colIdx}" data-val="">All</button>`);
        list.forEach(v => {
          $c.append(`<button class="btn btn-sm me-1" data-col="${colIdx}" data-val="${v}">${v}</button>`);
        });
        $c.on('click', 'button', function() {
          $c.find('button').removeClass('active');
          $(this).addClass('active');
          api.column(colIdx).search($(this).data('val')).draw();
        });
      }

      makeButtons(vals(0), '#performance-dataset-buttons', 0);
      makeButtons(vals(1), '#performance-model-buttons',   1);
      makeButtons(vals(2), '#performance-method-buttons',  2);

      // 如果你还要全局搜索
      $('#performance-global-search').on('input', function() {
        api.search(this.value).draw();
      });
    }
  });
});


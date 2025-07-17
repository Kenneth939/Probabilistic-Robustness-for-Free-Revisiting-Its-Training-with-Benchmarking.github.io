// static/js/datatable-init.js

$(document).ready(function() {
  $('#leaderboard-table').DataTable({
    // 只保留 length、table、info、pagination，不要全局搜索框
    dom: 'lrtip',

    // 从 JSON 加载数据
    ajax: {
      url: 'static/src/data/prbench_table8.json',
      dataSrc: ''
    },

    // 列定义
    columns: [
      { data: 'dataset' },
      { data: 'model' },
      { data: 'method' },
      { data: 'acc' },

      // --- PR under Uniform ---
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_uniform['0.03'];
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_uniform['0.08'];
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_uniform['0.1'];
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_uniform['0.12'];
        }
      },

      // --- PR under Gaussian ---
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_gaussian['0.03'];
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_gaussian['0.08'];
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_gaussian['0.1'];
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_gaussian['0.12'];
        }
      },

      // --- PR under Laplace ---
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_laplace['0.03'];
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_laplace['0.08'];
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_laplace['0.1'];
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return data.pr_laplace['0.12'];
        }
      },

      // --- Generalisation Error ---
      {
        data: null,
        render: function(data, type, row) {
          return data.ge.uni;
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return data.ge.gau;
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return data.ge.lap;
        }
      }
    ],

    // 保持 JSON 原始顺序，不做初始排序
    order: [],

    // 每页 25 行
    pageLength: 25,

    // 初始化完成后，给前三列添加下拉筛选
    initComplete: function() {
      this.api().columns([0, 1, 2]).every(function() {
        var column = this;
        var select = $('<select class="form-select form-select-sm"><option value="">All</option></select>')
          .appendTo($(column.header()).empty())
          .on('change', function() {
            column.search(this.value).draw();
          });

        column.data().unique().sort().each(function(d) {
          select.append('<option value="' + d + '">' + d + '</option>');
        });
      });
    }
  });
});



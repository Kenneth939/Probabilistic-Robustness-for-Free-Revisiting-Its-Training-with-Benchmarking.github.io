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

// 保持 JSON 中的原始顺序，不做初始排序
    order: [],

    // 每页显示 25 行
    pageLength: 25,

    initComplete: function() {
      const api = this.api();

      // 取出三列的所有唯一值
      const datasetValues = api.column(0).data().unique().sort().toArray();
      const modelValues   = api.column(1).data().unique().sort().toArray();
      const methodValues  = api.column(2).data().unique().sort().toArray();

      // 通用：在指定容器生成按钮组
      function createButtons(values, containerSelector, colIndex) {
        const $container = $(containerSelector);
        $container.empty();
        // “All” 按钮
        $container.append(
          `<button type="button" class="btn btn-sm me-1 active" data-col="${colIndex}" data-val="">All</button>`
        );
        // 各选项按钮
        values.forEach(val => {
          $container.append(
            `<button type="button" class="btn btn-sm me-1" data-col="${colIndex}" data-val="${val}">${val}</button>`
          );
        });
        // 绑定点击事件
        $container.on('click', 'button', function() {
          const $btn = $(this);
          // 切换样式
          $container.find('button').removeClass('active');
          $btn.addClass('active');
          // 应用列过滤
          api.column($btn.data('col')).search($btn.data('val')).draw();
        });
      }

      // 调用：生成三组按钮
      createButtons(datasetValues, '#dataset-buttons', 0);
      createButtons(modelValues,   '#model-buttons',   1);
      createButtons(methodValues,  '#method-buttons',  2);
    }
  });
});



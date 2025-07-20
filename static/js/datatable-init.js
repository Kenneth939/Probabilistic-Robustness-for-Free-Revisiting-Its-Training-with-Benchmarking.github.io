// static/js/datatable-init.js

$(function() {
  const table = $('#leaderboard-table').DataTable({
    // l = length, f = filter (search box), r = processing, t = table, i = info, p = pagination
    dom: 'lfrtip',

    ajax: {
      url: 'static/src/data/prbench_table8.json',
      dataSrc: '',
      error: function(xhr, error, thrown) {
        console.error('加载 JSON 失败:', xhr.status, thrown);
      }
    },

    // 列定义（共 19 列，和 <thead> 保持一致）
    columns: [
      { data: 'dataset' },   // 0
      { data: 'model' },     // 1
      { data: 'method' },    // 2
      { data: 'acc' },       // 3

      // Uniform PR
      { data: null, render: d => d.pr_uniform['0.03'] }, // 4
      { data: null, render: d => d.pr_uniform['0.08'] }, // 5
      { data: null, render: d => d.pr_uniform['0.1'] }, // 6
      { data: null, render: d => d.pr_uniform['0.12'] }, // 7

      // Gaussian PR
      { data: null, render: d => d.pr_gaussian['0.03'] }, // 8
      { data: null, render: d => d.pr_gaussian['0.08'] }, // 9
      { data: null, render: d => d.pr_gaussian['0.1'] }, // 10
      { data: null, render: d => d.pr_gaussian['0.12'] }, // 11

      // Laplace PR
      { data: null, render: d => d.pr_laplace['0.03'] }, // 12
      { data: null, render: d => d.pr_laplace['0.08'] }, // 13
      { data: null, render: d => d.pr_laplace['0.1'] }, // 14
      { data: null, render: d => d.pr_laplace['0.12'] }, // 15

      // Generalisation Error
      { data: null, render: d => d.ge.uni }, // 16
      { data: null, render: d => d.ge.gau }, // 17
      { data: null, render: d => d.ge.lap }  // 18
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


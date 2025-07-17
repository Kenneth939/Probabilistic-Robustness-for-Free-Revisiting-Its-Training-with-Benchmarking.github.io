// static/js/datatable-init.js

$(document).ready(function() {
  $('#leaderboard-table').DataTable({
    ajax: {
      url: 'static/src/data/prbench_table8.json',
      dataSrc: ''
    },
    columns: [
      { data: 'dataset' },
      { data: 'model' },
      { data: 'method' },
      { data: 'acc' },
      { data: 'pr_uniform', render: data => data['0.03'] },
      { data: 'pr_uniform', render: data => data['0.08'] },
      { data: 'pr_uniform', render: data => data['0.10'] },
      { data: 'pr_uniform', render: data => data['0.12'] },
      { data: 'pr_gaussian', render: data => data['0.03'] },
      { data: 'pr_gaussian', render: data => data['0.08'] },
      { data: 'pr_gaussian', render: data => data['0.10'] },
      { data: 'pr_gaussian', render: data => data['0.12'] },
      { data: 'pr_laplace', render: data => data['0.03'] },
      { data: 'pr_laplace', render: data => data['0.08'] },
      { data: 'pr_laplace', render: data => data['0.10'] },
      { data: 'pr_laplace', render: data => data['0.12'] },
      { data: 'ge', render: data => data.uni },
      { data: 'ge', render: data => data.gau },
      { data: 'ge', render: data => data.lap }
    ],
    pageLength: 25,
    order: [], // 保持输入顺序，不做初始排序
    initComplete: function() {
      this.api().columns([0,1,2]).every(function() {
        const column = this;
        const select = $('<select class="form-select"><option value="">All</option></select>')
          .appendTo($(column.header()).empty())
          .on('change', function() {
            column.search($(this).val()).draw();
          });
        column.data().unique().sort().each(function(d) {
          select.append(`<option value="${d}">${d}</option>`);
        });
      });
    }
  });
});


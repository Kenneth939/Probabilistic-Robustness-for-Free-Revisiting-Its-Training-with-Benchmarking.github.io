$(document).ready(function() {
  const table = $('#leaderboard-table').DataTable({
    ajax: {
      url: 'static/src/data/prbench_table8.json',
      dataSrc: ''
    },
    columns: [
      { data: 'dataset' },
      { data: 'model' },
      { data: 'method' },
      { data: 'acc' },
      { data: 'pr_uniform.0.03' },
      { data: 'pr_uniform.0.08' },
      { data: 'pr_uniform.0.10' },
      { data: 'pr_uniform.0.12' },
      { data: 'pr_gaussian.0.03' },
      { data: 'pr_gaussian.0.08' },
      { data: 'pr_gaussian.0.10' },
      { data: 'pr_gaussian.0.12' },
      { data: 'pr_laplace.0.03' },
      { data: 'pr_laplace.0.08' },
      { data: 'pr_laplace.0.10' },
      { data: 'pr_laplace.0.12' },
      { data: 'ge.uni' },
      { data: 'ge.gau' },
      { data: 'ge.lap' }
    ],
    pageLength: 25,
    order: [[ 3, 'desc' ]],  // 按 Acc 排序
    initComplete: function() {
      // 在 Dataset/Model/Method 三列生成下拉筛选
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

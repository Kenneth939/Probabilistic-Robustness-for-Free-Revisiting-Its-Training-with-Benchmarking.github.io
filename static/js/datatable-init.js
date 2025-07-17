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
      // Uniform PR
      { data: function(row) { return row.pr_uniform['0.03']; } },
      { data: function(row) { return row.pr_uniform['0.08']; } },
      { data: function(row) { return row.pr_uniform['0.1']; } },
      { data: function(row) { return row.pr_uniform['0.12']; } },
      // Gaussian PR
      { data: function(row) { return row.pr_gaussian['0.03']; } },
      { data: function(row) { return row.pr_gaussian['0.08']; } },
      { data: function(row) { return row.pr_gaussian['0.1']; } },
      { data: function(row) { return row.pr_gaussian['0.12']; } },
      // Laplace PR
      { data: function(row) { return row.pr_laplace['0.03']; } },
      { data: function(row) { return row.pr_laplace['0.08']; } },
      { data: function(row) { return row.pr_laplace['0.1']; } },
      { data: function(row) { return row.pr_laplace['0.12']; } },
      // Generalisation Error
      { data: function(row) { return row.ge.uni; } },
      { data: function(row) { return row.ge.gau; } },
      { data: function(row) { return row.ge.lap; } }
    ],
    pageLength: 25,
    order: [], // 保持输入顺序
    initComplete: function() {
      this.api().columns([0,1,2]).every(function() {
        const column = this;
        const select = $('<select class="form-select"><option value="">All</option></select>')
          .appendTo($(column.header()).empty())
          .on('change', function() {
            column.search($(this).val()).draw();
              dom: 'lrtip',
    // Hide default search input, keep length (l), table (t), info (i), pagination (p)
    ajax: {
      url: 'static/src/data/prbench_table8.json',
      dataSrc: ''
    },
    columns: [
      { data: 'dataset' },
      { data: 'model' },
      { data: 'method' },
      { data: 'acc' },
      // Uniform PR
      { data: function(row) { return row.pr_uniform['0.03']; } },
      { data: function(row) { return row.pr_uniform['0.08']; } },
      { data: function(row) { return row.pr_uniform['0.1']; } },
      { data: function(row) { return row.pr_uniform['0.12']; } },
      // Gaussian PR
      { data: function(row) { return row.pr_gaussian['0.03']; } },
      { data: function(row) { return row.pr_gaussian['0.08']; } },
      { data: function(row) { return row.pr_gaussian['0.1']; } },
      { data: function(row) { return row.pr_gaussian['0.12']; } },
      // Laplace PR
      { data: function(row) { return row.pr_laplace['0.03']; } },
      { data: function(row) { return row.pr_laplace['0.08']; } },
      { data: function(row) { return row.pr_laplace['0.1']; } },
      { data: function(row) { return row.pr_laplace['0.12']; } },
      // Generalisation Error
      { data: function(row) { return row.ge.uni; } },
      { data: function(row) { return row.ge.gau; } },
      { data: function(row) { return row.ge.lap; } }
    ],
    pageLength: 25,
    order: [], // 保持输入顺序
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
        column.data().unique().sort().each(function(d) {
          select.append(`<option value="${d}">${d}</option>`);
        });
      });
    }
  });
});



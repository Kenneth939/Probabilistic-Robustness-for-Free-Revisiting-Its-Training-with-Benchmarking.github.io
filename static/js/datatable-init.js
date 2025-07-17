// static/js/datatable-init.js

$(document).ready(function() {
  $('#leaderboard-table').DataTable({
    ajax: {
      url: 'static/src/data/prbench_table8.json',
      dataSrc: ''
    },
    dom: 'lrtip', // Hide default search input, keep length (l), table (t), info (i), pagination (p)
    columns: [
      { data: 'dataset' },
      { data: 'model' },
      { data: 'method' },
      { data: 'acc' },
      // Uniform PR
      {
        data: null,
        render: function(row) { return row.pr_uniform['0.03']; }
      },
      {
        data: null,
        render: function(row) { return row.pr_uniform['0.08']; }
      },
      {
        data: null,
        render: function(row) { return row.pr_uniform['0.1']; }
      },
      {
        data: null,
        render: function(row) { return row.pr_uniform['0.12']; }
      },
      // Gaussian PR
      {
        data: null,
        render: function(row) { return row.pr_gaussian['0.03']; }
      },
      {
        data: null,
        render: function(row) { return row.pr_gaussian['0.08']; }
      },
      {
        data: null,
        render: function(row) { return row.pr_gaussian['0.1']; }
      },
      {
        data: null,
        render: function(row) { return row.pr_gaussian['0.12']; }
      },
      // Laplace PR
      {
        data: null,
        render: function(row) { return row.pr_laplace['0.03']; }
      },
      {
        data: null,
        render: function(row) { return row.pr_laplace['0.08']; }
      },
      {
        data: null,
        render: function(row) { return row.pr_laplace['0.1']; }
      },
      {
        data: null,
        render: function(row) { return row.pr_laplace['0.12']; }
      },
      // Generalisation Error
      {
        data: null,
        render: function(row) { return row.ge.uni; }
      },
      {
        data: null,
        render: function(row) { return row.ge.gau; }
      },
      {
        data: null,
        render: function(row) { return row.ge.lap; }
      }
    ],
    pageLength: 25,
    order: [], // 保持输入 JSON 的原始顺序
    initComplete: function() {
      var api = this.api();
      api.columns([0, 1, 2]).every(function() {
        var column = this;
        var select = $(
          '<select class="form-select form-select-sm"><option value="">All</option></select>'
        )
          .appendTo($(column.header()).empty())
          .on('change', function() {
            column.search($(this).val()).draw();
          });
        column
          .data()
          .unique()
          .sort()
          .each(function(d) {
            select.append('<option value="' + d + '">' + d + '</option>');
          });
      });
    }
  });
});



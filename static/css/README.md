/* static/css/style.css */

/*———— 变量定义 ————*/
:root {
  --bg-color: #f2f2f5;
  --card-bg: rgba(255, 255, 255, 0.8);
  --btn-bg: rgba(255, 255, 255, 0.6);
  --primary-color: #0071e3;
  --text-color: #1d1d1f;
}

/*———— 全局重置 ————*/
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
}

/*———— 布局容器 ————*/
.container {
  /* 全屏宽度，左右最小内边距 */
  max-width: 100% !important;
  padding: 1rem 1rem !important;
  margin: 0 auto;
}

/*———— 标题样式 ————*/
h1, h2, h3 {
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

/*———— 顶部导航 ————*/
nav {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}
.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar-brand {
  font-size: 1.5rem;
  color: var(--primary-color) !important;
  text-decoration: none;
}
.navbar-nav {
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav-link {
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: var(--btn-bg);
  color: var(--text-color);
  font-weight: 500;
  transition: background 0.3s;
}
.nav-link:hover {
  background: var(--card-bg);
}

/*———— Abstract & Figures ————*/
.text-center img {
  display: block;
  margin: 1rem auto;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  height: auto;
}

/*———— 筛选按钮组 ————*/
#filter-controls {
  text-align: center;
  margin-bottom: 1.5rem;
}
#filter-controls .btn-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
#filter-controls .btn-group button {
  background: var(--btn-bg);
  color: var(--primary-color);
  border: none;
  border-radius: 999px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.3s, transform 0.1s;
}
#filter-controls .btn-group button:hover {
  background: var(--card-bg);
  transform: translateY(-1px);
}
#filter-controls .btn-group button.active {
  background: var(--primary-color);
  color: #fff;
}

/*———— DataTables 布局 & 防滚动 ————*/
.dataTables_wrapper {
  width: 100%;
  overflow-x: hidden;
}

/*———— 全局搜索框 ————*/
.dataTables_filter {
  text-align: right;
  margin-bottom: 1rem;
}
.dataTables_filter label {
  font-weight: 500;
  color: var(--text-color);
}
.dataTables_filter input {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
  width: 180px;
  margin-left: 0.5rem;
}

/*———— “Show X entries” 控件 ————*/
.dataTables_length {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: var(--text-color);
}
.dataTables_length label {
  margin: 0;
  font-weight: 500;
}
.dataTables_length select {
  margin: 0 0.5rem;
  padding: 0.35rem 0.6rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background: #fff;
  transition: border-color 0.2s;
}
.dataTables_length select:focus {
  outline: none;
  border-color: var(--primary-color);
}

/*———— 信息文字 ————*/
.dataTables_info {
  margin: 0.5rem 0 1rem;
  font-size: 0.9rem;
  color: var(--text-color);
  text-align: left;
}

/*———— 表格主体 ————*/
#leaderboard-table {
  width: 100% !important;
  font-size: 0.75rem;       /* 缩小字体以避免溢出 */
  table-layout: fixed;      /* 固定布局使列宽均匀 */
  border-radius: 12px;
  background: var(--card-bg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
#leaderboard-table th,
#leaderboard-table td {
  padding: 0.25rem 0.5rem;
  border: none;
  color: var(--text-color);
  text-align: center;
  white-space: nowrap;      /* 避免折行 */
  overflow: hidden;
  text-overflow: ellipsis;
}
#leaderboard-table thead {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
}
#leaderboard-table tbody tr {
  transition: background 0.3s;
}
#leaderboard-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.6);
}

/*———— 分页 —— 采用 Bootstrap 样式覆盖 ————*/
.dataTables_wrapper .pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 2rem;
}
.dataTables_wrapper .pagination .page-item {
  margin: 0 0.25rem;
}
.dataTables_wrapper .pagination .page-link {
  display: inline-block;
  background: var(--btn-bg);
  color: var(--primary-color);
  border: none;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s, transform 0.1s;
}
.dataTables_wrapper .pagination .page-link:hover {
  background: var(--card-bg);
  transform: translateY(-1px);
}
.dataTables_wrapper .pagination .active .page-link {
  background: var(--primary-color) !important;
  color: #fff !important;
}
.dataTables_wrapper .pagination .disabled .page-link {
  opacity: 0.5;
  pointer-events: none;
}


async function renderStatus() {
  const data = await loadJson("./content/status/index.json");
  const box = document.getElementById("status-list");

  if (!data.items.length) {
    box.innerHTML = "<p>등록된 운영 현황이 없습니다.</p>";
    return;
  }

  // 연도별 그룹화
  const grouped = {};

  data.items.forEach(item => {
    const year = item.year || "기타";
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(item);
  });

  // 연도 내 최신순 정렬
  Object.keys(grouped).forEach(year => {
    grouped[year].sort((a, b) => b.date.localeCompare(a.date));
  });

  // 연도도 최신순 정렬
  const sortedYears = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  box.innerHTML = sortedYears.map((year, index) => `
    <details class="year-group" ${index === 0 ? "open" : ""}>
      <summary>${year}년</summary>
      <div class="year-items">
        ${grouped[year].map(item => `
          <div class="card">
            <div class="meta">
              <span class="badge">${item.category}</span>
              <span>${item.date}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            ${item.link ? `<a href="${item.link}" target="_blank">자세히 보기</a>` : ""}
          </div>
        `).join("")}
      </div>
    </details>
  `).join("");
}

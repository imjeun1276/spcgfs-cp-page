async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`파일을 불러오지 못했습니다: ${path}`);
  }
  return await response.json();
}

async function renderStatus() {
  const data = await loadJson("./content/status/index.json");
  const box = document.getElementById("status-list");

  if (!data.items.length) {
    box.innerHTML = "<p>등록된 운영 현황이 없습니다.</p>";
    return;
  }

  box.innerHTML = data.items.map(item => `
    <div class="card">
      <div class="meta">
        <span class="badge">${item.category}</span>
        <span>${item.date}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      ${item.link ? `<a href="${item.link}" target="_blank">자세히 보기</a>` : ""}
    </div>
  `).join("");
}

async function renderLibrary() {
  const data = await loadJson("./content/library/index.json");
  const box = document.getElementById("library-list");

  if (!data.items.length) {
    box.innerHTML = "<p>등록된 자료가 없습니다.</p>";
    return;
  }

  box.innerHTML = data.items.map(item => `
    <div class="card">
      <div class="meta">${item.date}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a href="${item.link}" target="_blank">자료 보기</a>
    </div>
  `).join("");
}

async function init() {
  try {
    await renderStatus();
    await renderLibrary();
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML(
      "beforeend",
      `<p style="color:red; padding:20px;">콘텐츠를 불러오는 중 오류가 발생했습니다.</p>`
    );
  }
}

init();
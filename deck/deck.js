// 互動式簡報：內容在 SLIDES，引擎在檔案下半部。
// 事實來源：履歷 PDF、LinkedIn、data/showcase.json。圖中標「示意」者，名稱為說明用。
(() => {
const ic = (n, c = '') => `<svg class="ic ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const ar = (c = '') => `<i class="ar ${c}" aria-hidden="true"></i>`;
const node = (b, s, t = '') => `<div class="node ${t}"><b>${b}</b>${s ? `<span>${s}</span>` : ''}</div>`;
const flow = (steps, cls = '') => `<div class="flow ${cls}">${steps.map((x, i) => (i ? ar(x.ar || '') : '') + node(x[0], x[1], x[2])).join('')}</div>`;
const chips = (a, k = '') => `<div class="chips">${a.map((t) => `<span class="chip ${k}">${t}</span>`).join('')}</div>`;
const H = (eb, t) => `<div class="hd"><h2>${t}</h2><p class="sub">${eb}</p></div>`;
const bl = (items) => `<ul class="bl">${items.map(([i, t, w]) => `<li class="rv">${ic(i)}<div><p>${t}</p>${w ? `<p class="why">${w}</p>` : ''}</div></li>`).join('')}</ul>`;
const sq = (cols, rows, cells, size = 56) => `<div class="sq" style="grid-template-columns:repeat(${cols},${size}px);grid-template-rows:repeat(${rows},${size}px)">${cells.map((c) => `<i class="${c}"></i>`).join('')}</div>`;
const rep = (c, n) => Array.from({ length: n }, () => c);

const BASE = [
// 1 封面
{ t: '封面', dark: 1, html: () => `
  <p class="eb">工作經驗簡報</p>
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:28px">
    <h1 style="font-size:320px;line-height:.95;letter-spacing:-.04em">張浩富</h1>
    <p style="font-size:42px;color:var(--dmute)">Hao-Fu Chang</p>
    <div style="width:96px;height:4px;background:var(--dacc)"></div>
    <p style="font-size:44px;line-height:1.5">後端工程師，企業級 AI SaaS</p>
  </div>
  <div class="chips rv">${['RAG', 'LLM 串流 API', '多租戶 RBAC', '大規模資料處理', 'DevOps'].map((x) => `<span class="chip">${x}</span>`).join('')}</div>` },

// 2 自我介紹
{ t: '自我介紹', html: () => H('自我介紹', '近 3 年，兩家新創的後端') + `
  <div class="bd"><div class="row" style="flex:1;gap:56px">
    <div class="card soft grow rv">
      <div class="cap"><span class="per">2023/09 – 2024/10</span>${ic('book', 'acc')}</div>
      <h3>Wisdome.AI</h3>
      <p class="desc">LLM 教育科技新創，產品是 BrainBox 考試準備 Web App</p>
      <div class="row ctr" style="gap:28px">${sq(5, 2, ['a', ...rep('m', 9)], 34)}<div class="col" style="gap:4px"><b style="font-size:36px">10 人團隊</b><span style="font-size:28px;color:var(--acc);font-weight:500">唯一的後端工程師</span></div></div>
      <div class="kv"><div><b>0 → 1</b><span>整套後端從零建起</span></div><div><b>MVP</b><span>先上線，再快速迭代</span></div></div>
    </div>
    <div class="card grow rv">
      <div class="cap"><span class="per">2024/12 – 2026/04</span>${ic('layers', 'acc')}</div>
      <h3>MaiAgent 思邁智能</h3>
      <p class="desc">企業級生成式 AI SaaS 平台，多家跨產業大型企業使用</p>
      <div class="row ctr" style="gap:28px">${sq(5, 2, ['a', ...rep('dk', 9)], 34)}<div class="col" style="gap:4px"><b style="font-size:36px">工程團隊 [__] 人</b><span style="font-size:28px;color:var(--acc);font-weight:500">核心後端工程師</span></div></div>
      <div class="kv"><div><b>103</b><span>類權限的 RBAC</span></div><div><b>10M+</b><span>筆資料批次處理</span></div><div><b>96%</b><span>核心模組覆蓋率</span></div></div>
    </div>
  </div></div>` },

// 3 技術地圖
{ t: '技術地圖', html: () => H('兩段工作用到的技術', '技術地圖') + `
  <div class="bd"><div class="logos" style="flex:1;align-content:start">${[
    ['python', 'Python'], ['django', 'Django'], ['', 'DRF'], ['', 'Django Channels'],
    ['postgresql', 'PostgreSQL'], ['mysql', 'MySQL'], ['mongodb', 'MongoDB'], ['', 'pghistory'],
    ['celery', 'Celery'], ['rabbitmq', 'RabbitMQ'], ['', 'LlamaIndex'], ['keycloak', 'Keycloak'],
    ['', 'Azure AD'], ['', 'LDAP / AD'], ['', 'AWS'], ['googlecloud', 'Google Cloud'],
    ['docker', 'Docker'], ['githubactions', 'GitHub Actions'], ['nginx', 'Nginx'], ['elasticsearch', 'ELK'],
    ['prometheus', 'Prometheus'], ['grafana', 'Grafana'], ['react', 'React'], ['vuedotjs', 'Vue.js'],
  ].map(([f, n]) => `<div class="lg ${f ? '' : 't'}">${f ? `<img src="assets/logos/${f}.svg" alt="" width="44" height="44">` : ''}${n}</div>`).join('')}</div></div>` },

// 4 RAG
{ t: 'RAG 文件管線', html: () => H('MaiAgent　RAG', '文件處理管線：解析錯了，AI 就會答錯') + `
  <div class="bd">
    <div class="flow rv" style="gap:0">
      <div class="col" style="width:210px;gap:8px">${['PDF', 'DOCX', 'PPTX', 'XLSX', 'CSV', '影像'].map((x) => `<span class="chip" style="border-radius:0;text-align:center">${x}</span>`).join('')}</div>
      ${ar()}${node('轉成 Markdown', 'OCR · 表格處理', 'acc')}${ar()}${node('Chunking', '切分文件', 'ink')}${ar()}${node('向量索引', '供 RAG 檢索', 'ink')}${ar()}${node('檢索與回答', '', '')}
    </div>
    ${bl([
      ['file', '所有格式先統一轉成 Markdown，再 chunking', '格式混亂是解析錯誤的主要來源'],
      ['search', '比較 2–3 個開源 Parser，人工檢視輸出，再看下游回答品質', '解析好不好，最後要看 AI 答得對不對'],
      ['refresh', 'Parser 可切換，支援重新解析與失敗重試，並有處理指標', '讓客戶自己在速度與品質之間取捨'],
    ])}
  </div>` },

// 5 批次
{ t: '10M+ 批次管線', alt: 1, html: () => H('MaiAgent　資料處理', '10M+ 筆資料的批次管線') + `
  <div class="bd"><div class="row" style="flex:1;gap:56px">
    <div class="col grow" style="justify-content:center;gap:28px">
      <div class="row ctr rv" style="gap:0">
        ${node('10M+ 筆', '客戶 Excel 匯入', 'ink')}${ar()}
        <div class="col" style="gap:8px;flex:1.4">${[1, 2, 3, 4].map((n) => `<div class="node ${n === 3 ? 'acc' : 'soft'}" style="padding:12px 20px;flex:none"><b style="font-size:24px">批次 ${n}</b>${n === 3 ? '<span>失敗 → 從 checkpoint 續跑</span>' : ''}</div>`).join('')}</div>${ar()}
        ${node('chord', '全部完成後合併', '')}
      </div>
      <p class="tag rv">group 切批次，chord 收尾；每批 500–5,000 筆，可設定</p>
      <div class="chips rv">${['checkpoint 續跑', 'retry', '防重複寫入', '解析與對話分開 queue'].map((x) => `<span class="chip a">${x}</span>`).join('')}</div>
    </div>
    <div class="grow" style="max-width:640px">${bl([
      ['bell', '症狀：Celery Worker 接連 OOM、timeout、crash'],
      ['clock', '先試平行化、延長 Worker 存活時間，反而更慢', '加平行度沒有解決根因'],
      ['layers', '改用 Canvas 的 chain、group、chord 切成批次', '工作變成可中斷、可續跑'],
      ['shield', '解析與即時對話分開 queue', '大量匯入不拖慢使用者的對話'],
    ])}</div>
  </div></div>` },

// 6 SSE
{ t: '串流 Completion API', html: () => H('MaiAgent　LLM API', '即時串流的 Completion API') + `
  <div class="bd">
    <div class="col rv" style="gap:10px"><p class="tag">既有路徑</p>
      <div class="flow">${[['Client', '', 'mut'], ['Channels', '', 'mut'], ['Celery', '', 'mut'], ['signals 遞迴', '', 'mut'], ['LlamaIndex', '', 'mut'], ['WebSocket', '', 'mut']].map((x, i) => (i ? ar('sh') : '') + node(x[0], x[1], x[2])).join('')}</div></div>
    <div class="col rv" style="gap:10px"><p class="tag" style="color:var(--acc);border-color:var(--acc)">新增路徑，與既有並存</p>
      <div class="flow">${node('Client', '')}${ar('accl')}${node('Django Async View', 'async generator', 'acc')}${ar('accl')}${node('LLM', '')}${ar('accl')}${node('SSE 逐段送出', '', 'ink')}${ar('accl')}${node('共用 Service', '新舊路徑共用', 'soft')}</div></div>
    <div class="row" style="gap:48px;flex:1">
      <div class="grow">${bl([
        ['search', '先讀內部與 LlamaIndex 原始碼，畫出完整資料流', '先搞清楚舊系統，才知道哪些邏輯可以共用'],
        ['link', '抽出共用 Service，讓新舊路徑並存', '不必一次重寫，既有 WebSocket 照常運作'],
        ['chart', 'LLM、Embedding、Reranker 的 token 用量與成本計量', '供企業計費'],
      ])}</div>
      <pre class="code rv" style="width:560px;align-self:flex-start"><b>data:</b> {"delta": "根據"}
<b>data:</b> {"delta": "知識庫"}
<b>data:</b> {"delta": "的文件，"}
<b>data:</b> [DONE]
<span style="color:#8c8f94">// SSE 事件格式為示意</span></pre>
    </div>
  </div>` },

// 7 RBAC
{ t: '多租戶 RBAC', alt: 1, html: () => H('MaiAgent　權限', '103 類權限的多租戶 RBAC') + `
  <div class="bd">
    <div class="row" style="gap:64px;flex:1">
      <div class="col rv" style="width:520px;gap:10px">
        <div class="nest" style="flex:1"><span class="t">組織</span>
          <div class="nest l2" style="flex:1"><span class="t">群組 · 角色</span>
            <div class="nest l3" style="flex:1;justify-content:center"><span class="t">資源</span><p>知識庫 · 檔案 · Agent</p></div></div></div>
        <p class="tag">層級為示意</p>
      </div>
      <div class="col grow" style="gap:24px">
        <div class="row ctr" style="gap:28px"><span class="big">103</span><span class="lab">個權限類別<br>涵蓋組織、群組、資源三層</span></div>
        ${bl([
          ['lock', '部門之間互相隔離'],
          ['users', '主管可向下查看'],
          ['link', '跨部門共享特定資源'],
          ['filter', '檢索前先依權限過濾，避免 AI 看到不該看的資料'],
        ])}
      </div>
    </div>
    <div class="rv">${flow([['請求', ''], ['身分', 'SSO · LDAP'], ['QuerySet 層過濾', '可見資料，並處理 N+1', 'acc'], ['可見資料', '大量測試驗證租戶隔離', 'ink']])}</div>
  </div>` },

// 8 SSO / LDAP
{ t: '企業登入與 LDAP 同步', html: () => H('MaiAgent　身分', '企業登入整合與 LDAP 同步') + `
  <div class="bd"><div class="row ctr" style="flex:1;gap:0">
    <div class="col rv" style="width:340px;gap:20px">${['Keycloak', 'Azure AD', 'LDAP / AD'].map((x) => `<div class="node" style="flex:none"><b>${x}</b></div>`).join('')}</div>
    ${ar()}
    <div class="node ink rv" style="flex:1.3;padding:34px 38px;gap:14px;align-self:stretch;justify-content:center">
      <b style="color:var(--dacc);font-size:26px">LDAP / 身分同步管線，從零建置</b>
      <b style="font-family:var(--serif);font-size:104px;line-height:1.05">50,000</b>
      <span style="font-size:28px">人，單次同步上限</span>
      ${chips(['批次', '冷卻', '排程'], 'f').replace(/chip f/g, 'chip')}
    </div>
    ${ar()}
    <div class="col rv" style="width:380px;gap:18px">${[['check', '客戶不必更換登入方式'], ['users', '既有帳號保留'], ['lock', '群組與權限保留']].map(([i, t]) => `<div class="row ctr" style="gap:16px;background:var(--paper);padding:20px 24px">${ic(i, 'acc')}<span style="font-size:30px">${t}</span></div>`).join('')}</div>
  </div></div>` },

// 9 資料與 SQL
{ t: '千萬級資料與 SQL', alt: 1, html: () => H('MaiAgent　資料', '千萬級資料的搬移與修復') + `
  <div class="bd">
    <div class="row rv" style="gap:24px">${[['bell', '一次載入', '記憶體爆掉'], ['clock', '長交易', '鎖競爭'], ['refresh', 'N+1', '隨新功能悄悄回來']].map(([i, a, b]) => `<div class="box grow"><h4>${ic(i, 'acc')}${a}</h4><p>${b}</p></div>`).join('')}</div>
    ${flow([['問題', '依資料分布與記憶體上限逐案判斷', 'mut'], ['iterator 分批', '', ''], ['分桶', '', ''], ['bulk 寫入', '', ''], ['短交易', '', ''], ['EXPLAIN ANALYZE', '調整索引', 'acc']]).replace('class="flow "', 'class="flow rv"')}
    <div class="row" style="gap:48px;flex:1">
      <div class="grow">${bl([
        ['db', 'Schema 改版、跨 Model／跨組織搬移、大量資料修復', '資料量是千萬級'],
        ['search', '先看執行計畫，再決定怎麼改索引', '沒有一種寫法適合所有資料'],
      ])}</div>
      <div class="col grow rv" style="gap:12px"><p class="tag">CI 關卡</p>
        ${flow([['PR', ''], ['SQL query count 上限', '測試內設定', 'acc'], ['N+1 回歸', '在 Merge 前攔下', 'ink']])}</div>
    </div>
  </div>` },

// 10 品質與 CI
{ t: '測試與 CI', html: () => H('MaiAgent　品質', '測試、CI 與自動檢查') + `
  <div class="bd"><div class="row" style="gap:56px;flex:1">
    <div class="col grow rv" style="border-top:3px solid var(--ink);padding-top:22px;gap:22px">
      <p style="font-size:28px;font-weight:700">CI 執行時間</p>
      <div class="col" style="gap:12px"><div class="hb b" style="width:100%">優化前</div><div class="hb a" style="width:80%">優化後　−20%</div></div>
      <div class="row ctr" style="gap:20px">${sq(3, 3, rep('i', 9).map((_, i) => (i === 0 ? 'a' : '')), 40)}<span class="lab">9 組平行測試<br>Docker BuildKit 快取</span></div>
    </div>
    <div class="col grow rv" style="border-top:3px solid var(--ink);padding-top:22px;gap:22px">
      <p style="font-size:28px;font-weight:700">核心模組測試覆蓋率</p>
      <span class="big" style="font-size:144px">96%</span>
      <div class="prog"><i style="width:96%;background:var(--ink)"></i><i style="width:4%;background:var(--line)"></i></div>
    </div>
    <div class="col grow rv" style="border-top:3px solid var(--ink);padding-top:22px;gap:18px">
      <p style="font-size:28px;font-weight:700">自動化檢查</p>
      ${[['check', 'N+1 query 自動偵測'], ['shield', '5 階段安全掃描'], ['lock', '租戶隔離測試'], ['gauge', 'SQL query count 上限']].map(([i, t]) => `<div class="row ctr" style="gap:16px">${ic(i, 'acc')}<span style="font-size:28px">${t}</span></div>`).join('')}
    </div>
  </div></div>` },

// 11 AI 開發流程
{ t: 'AI 開發流程', dark: 1, html: () => H('MaiAgent　團隊', '導入 Claude Code 與 Cursor：速度變快，關卡跟上') + `
  <div class="bd">
    <div class="row ctr rv" style="gap:0">
      <div class="g2" style="width:420px;gap:12px">${rep(0, 4).map(() => `<div class="node" style="padding:22px;align-items:center"><b style="font-size:26px">repo</b></div>`).join('')}</div>
      ${ar()}${node('12+ 共用 skills 與規則', '跨 4 個 repo，程式風格與架構慣例', 'acc')}${ar()}${node('整個工程團隊', 'Claude Code · Cursor · Copilot', '')}
    </div>
    <div class="rv">${flow([['Pull Request', ''], ['AI Reviewer', 'security · performance · N+1', 'acc'], ['Merge gate', '通過才能合併', 'ink']])}</div>
    ${bl([
      ['zap', 'AI 讓寫程式變快，人工 review 跟不上', '產出變多，品質、安全與效能問題更容易漏過'],
      ['shield', '把檢查變成自動關卡，而不是靠人盯', '開發速度提升後，瓶頸移到 CI，於是優化測試與建置流程'],
    ])}
  </div>` },

// 12 用量與稽核
{ t: '用量計量與稽核', alt: 1, html: () => H('MaiAgent　企業需求', '用量計量與稽核紀錄') + `
  <div class="bd" style="justify-content:space-around">
    <div class="col rv" style="gap:14px"><div class="row ctr" style="gap:16px">${ic('chart', 'acc lg')}<h3 style="font-size:36px">用量計量：誰花了多少 token、多少成本</h3></div>
      ${flow([['LLM · Embedding · Reranker', '每次呼叫'], ['Token 計數', ''], ['成本計算', ''], ['彙總報表', '組織 · 使用者 · Agent', 'acc']])}</div>
    <div class="col rv" style="gap:14px"><div class="row ctr" style="gap:16px">${ic('file', 'acc lg')}<h3 style="font-size:36px">稽核紀錄：誰在什麼時候做了什麼</h3></div>
      ${flow([['登入 · API · CRUD 事件', ''], ['pghistory', '資料變更前後的差異', 'acc'], ['稽核紀錄', '全系統'], ['搜尋 · 匯出', '', 'ink']])}</div>
    <p class="tag">流程為示意</p>
  </div>` },

// 13 平台功能
{ t: '知識庫、API 與匯出', html: () => H('MaiAgent　平台功能', '知識庫、開放 API、匯入匯出') + `
  <div class="bd"><div class="g2" style="flex:1;grid-template-rows:1fr 1fr">${[
    ['book', '知識庫與引用權限', [['檔案上傳', ''], ['知識庫', 'FAQ · 標籤', 'acc'], ['引用與存取權限', '', 'ink']]],
    ['key', '開放 API', [['API Key', '建立 · 撤銷 · 範圍'], ['開放 API', '檔案上傳 · 查詢', 'acc'], ['OpenAPI 文件', '', 'ink']]],
    ['file', '非同步匯出', [['匯出請求', ''], ['背景工作', '', 'acc'], ['產生檔案', '單次最多 50,000 筆', 'ink']]],
    ['filter', 'RAG 檢索範圍控制（共同開發）', [['使用者提問', ''], ['檢索範圍', '使用者 · 角色 · 標籤', 'acc'], ['AI 回答', '', 'ink']]],
  ].map(([i, t, s]) => `<div class="box rv" style="gap:18px"><h4>${ic(i, 'acc')}${t}</h4>${flow(s)}</div>`).join('')}</div></div>` },

// 14 交付與部署
{ t: '交付與部署', alt: 1, html: () => H('MaiAgent　交付', '自動測試、部署與多雲儲存') + `
  <div class="bd">
    <div class="rv">${flow([['PR', 'GitHub Actions 自動測試'], ['Merge', ''], ['Docker → ECR', ''], ['ECS Dev / Staging', 'Merge 後自動部署', 'acc'], ['Production', '手動上線', 'mut']])}</div>
    <p class="tag rv">部署失敗排查、健康檢查與回滾</p>
    <div class="row" style="gap:40px;flex:1">
      <div class="box grow rv"><h4>${ic('cloud', 'acc')}多雲儲存</h4>
        ${flow([['應用程式', ''], ['Provider Factory', '', 'ink'], ['AWS S3 / GCP GCS', 'Signed URL · IAM · Lifecycle', 'acc'], ['CDN', '']])}</div>
      <div class="box grow rv"><h4>${ic('server', 'acc')}地端部署</h4>
        <p>協助金融、航空業客戶的地端部署，串接地端模型</p>
        ${flow([['客戶地端環境', ''], ['地端模型', '', 'acc']])}</div>
    </div>
  </div>` },

// 15 Wisdome
{ t: 'Wisdome.AI 後端架構', html: () => H('Wisdome.AI　10 人團隊，唯一的後端', '從零建起整套後端') + `
  <div class="bd"><div class="row" style="gap:56px;flex:1">
    <div class="col grow rv" style="gap:0">${[
      ['globe', '入口', ['React + Django：公司 HR 系統', 'ECPay 金流']],
      ['code', 'API', ['Django REST']],
      ['db', '資料', ['MySQL', 'MongoDB']],
      ['zap', '背景工作', ['RabbitMQ', 'Celery']],
      ['cloud', 'AWS', ['EC2', 'RDS', 'S3', 'CloudFront', 'Route 53', 'ALB']],
      ['git', '交付', ['GitHub Actions', 'Docker', 'ECR']],
      ['gauge', '監控', ['ELK', 'Prometheus', 'Grafana', 'Alertmanager']],
    ].map(([i, t, a]) => `<div class="lay"><h4>${ic(i, 'acc sm')}${t}</h4>${chips(a)}</div>`).join('')}</div>
    <div class="grow" style="max-width:560px">${bl([
      ['zap', '先上線 MVP，再依回饋快速迭代', '與前端、ML 工程師、設計師一起做'],
      ['check', '負責測試與 code review'],
      ['file', 'API 文件與資料備份'],
      ['bell', '監控與告警'],
    ])}</div>
  </div></div>` },

// 16 獲獎
{ t: '獲獎與發表', dark: 1, html: () => H('學歷與獲獎', '國立彰化師範大學 資訊工程學系，2019–2023') + `
  <div class="bd"><div class="row" style="gap:72px;flex:1">
    <div class="col rv" style="width:800px;gap:22px;justify-content:center">
      <p style="font-size:30px;font-weight:700">國科會大專學生研究創作獎</p>
      <img class="pic" src="assets/nstc_research_creativity_award.png" alt="國科會大專學生研究創作獎">
      <div class="prog" style="height:44px"><i style="width:6%;background:var(--acc)"></i><i style="width:94%;background:var(--paper2)"></i></div>
      <p class="lab" style="color:var(--mute)">約前 6%，全國 200 名得獎者之一（2023）</p>
    </div>
    <div class="grow" style="justify-content:center;display:flex;flex-direction:column"><div class="tl">
      ${[['2022', '教育部全國大專校院產學創新競賽 特別獎', ''], ['2023', '彰師大資工系專題競賽 第一名', '擔任隊長'], ['2023', '國科會大專學生研究創作獎', '全國 200 名，約前 6%'], ['2024', 'MDPI Machines 論文共同作者', 'YOLOv5 與無人機搜索路徑規劃'], ['2025', '光復超人救災媒合平台', '志工後端工程師，花蓮，2025/09–10']].map(([y, t, s]) => `<div class="rv"><span class="yr">${y}</span><p>${t}${s ? `<small>${s}</small>` : ''}</p></div>`).join('')}
    </div></div>
  </div></div>` },
];

// ---------- 講述順序：起點 → 能用 → 敢用 → 撐得住 → 跑得快 ----------
const S = Object.fromEntries(BASE.map((s) => [s.t, s]));

const INTRO = { t: '自我介紹', alt: 1, html: () => H('自我介紹', '我是張浩富，做 AI 產品的後端工程師') + `
  <div class="bd"><div class="g4" style="flex:1">${[
    ['book', '背景', `<ul class="bl">${[['彰化師範大學 資訊工程學系', '2019–2023'], ['近 3 年，兩家新創的後端', '從新創到企業級 AI SaaS'], ['從需求、架構到使用體驗', '做 LLM 產品的後端']].map(([a, b]) => `<li><div><p style="font-size:27px">${a}</p><p class="why">${b}</p></div></li>`).join('')}</ul>`],
    ['layers', '做過', `<ul class="bl">${[['Wisdome.AI', '10 人團隊中唯一的後端，從零建起整套'], ['MaiAgent', '企業級 AI SaaS 核心後端：RAG、串流 API、權限、批次管線']].map(([a, b]) => `<li><div><p style="font-size:30px;font-weight:700">${a}</p><p class="why">${b}</p></div></li>`).join('')}</ul>`],
    ['chart', '貢獻', `<div class="col" style="gap:14px">${[['103', '類權限的多租戶 RBAC'], ['10M+', '筆資料的批次處理'], ['96%', '核心模組測試覆蓋率'], ['−20%', 'CI 執行時間']].map(([a, b]) => `<div class="col" style="gap:0"><b style="font-size:64px;line-height:1.05;color:var(--acc);font-weight:900;letter-spacing:-.03em">${a}</b><span style="font-size:26px;line-height:1.4">${b}</span></div>`).join('')}</div>`],
    ['award', '證明', `<ul class="bl">${[['國科會大專學生研究創作獎', '約前 6%，全國 200 名之一'], ['彰師大專題競賽第一名', '擔任隊長'], ['光復超人救災媒合平台', '志工後端工程師，花蓮 2025/09–10'], ['MDPI 論文共同作者', '無人機搜救研究']].map(([a, b]) => `<li style="padding:12px 0"><div><p style="font-size:26px;font-weight:500;line-height:1.35">${a}</p><p class="why" style="font-size:23px">${b}</p></div></li>`).join('')}</ul>`],
  ].map(([i, t, b]) => `<div class="card rv" style="gap:16px"><div class="row ctr" style="gap:14px">${ic(i, 'acc')}<h3 style="font-size:40px">${t}</h3></div>${b}</div>`).join('')}</div></div>` };

const ROAD = { t: '路線圖', dark: 1, html: () => H('路線圖', '從「做得出來」到「企業用得下去」') + `
  <div class="bd" style="justify-content:center;gap:56px"><div class="road">${[
    ['1', '起點', '一個人把產品建起來', 'Wisdome.AI'],
    ['2', '能用', 'AI 要答得對、答得快', 'RAG 管線 · 串流 API · 平台功能'],
    ['3', '敢用', '企業才敢把資料交給它', 'RBAC · SSO 與 LDAP · 用量與稽核'],
    ['4', '撐得住', '資料大了不能垮', '10M+ 批次 · 千萬級 SQL'],
    ['5', '跑得快', '團隊變快，品質不能掉', 'CI · AI 開發流程 · 交付'],
  ].map(([n, t, q, s]) => `<div class="st rv"><span class="no">第 ${n} 章</span><h3>${t}</h3><p class="q">${q}</p><p class="tag" style="white-space:normal;line-height:1.5">${s}</p></div>`).join('')}</div>
  <p class="rv" style="font-size:28px;color:var(--mute)">MaiAgent 的成果，依「一個企業 AI 產品要走過的順序」排列，不是照時間</p></div>` };



// ---------- MaiAgent 平台背景（來源：maiagent.ai 官網；平台成果不等於個人貢獻） ----------
const MA1 = { t: 'MaiAgent 是什麼', n: '一頁講完：它做什麼、有多厲害。數字與獎項皆為 MaiAgent 官網所述；我負責的是平台的核心後端。', html: () => H('MaiAgent 官網', 'MaiAgent：讓每個企業擁有自己的 AI') + `
  <div class="bd" style="gap:26px">
    <div class="kv" style="gap:56px">${[['100+', '企業導入'], ['20+', '整合的 LLM'], ['40+', '技術與通路夥伴'], ['ISO', '27001 · 27701 認證']].map(([n, l]) => `<div><b style="font-size:84px;line-height:1.05">${n}</b><span style="font-size:26px">${l}</span></div>`).join('')}</div>
    <div class="g4" style="gap:14px">${[
      ['layers', 'MaiGPT', '企業 AI 助理平台，一個介面用多個模型'],
      ['search', 'AI KM', '企業知識管理，Agentic RAG，檢索準確率 95%（官網宣稱）'],
      ['file', 'AI 會議助理', '自動轉錄、摘要、追蹤待辦'],
      ['code', 'Agent 開發平台', 'Multi-Agent、MCP、Text2SQL，部署到 LINE、網站等'],
    ].map(([i, t, d]) => `<div class="box" style="gap:10px"><h4>${ic(i, 'acc')}${t}</h4><p>${d}</p></div>`).join('')}</div>
    <div class="row" style="gap:14px">
      <div class="node soft grow" style="flex:1.2"><b>2024 總統盃黑客松　優秀團隊</b><span>全國僅 5 隊獲獎</span></div>
      <div class="node soft grow" style="flex:1.2"><b>第 23 屆金峰獎　十大優良產品</b><span>中小企業組</span></div>
      <div class="node soft grow" style="flex:1"><b>客戶涵蓋</b><span>政府、金融、製造、醫療、教育</span></div>
    </div>
    <div class="col" style="gap:10px"><p class="tag">我負責平台的核心後端</p>${chips(['RAG 文件管線', '串流 Completion API', '多租戶 RBAC', 'SSO · LDAP 同步', '稽核與用量計量', '批次資料管線', 'API Key 與 OpenAPI 文件', 'CI/CD'], 'a')}</div>
  </div>` };

const CASES = { t: '應用案例', n: '這些是平台在客戶端的成果，不是我個人的貢獻；我負責其中的後端。客戶名稱依我的規定不寫，只寫產業別。來源：MaiAgent 官網成功案例。', html: () => H('MaiAgent 官網成功案例　成果屬於平台，我負責其中的後端', '企業實際怎麼用') + `
  <div class="bd"><div class="g4" style="flex:1">${[
    ['科技製造', 'AI 電腦組裝助理', '20,000+', '每月對話數', '15 國上線，用戶滿意度 83%'],
    ['居家生活品牌', 'AI 維修助理', '73→90%+', 'AI 回答準確率', '3–4 個月上線，9 個以上應用情境'],
    ['長照科技', 'AI 客服助理', '2 週', '新人上手時間', '原需 2–3 個月，訓練時間減少 90%'],
    ['區域醫院', '全院導入 AI', '44', '個 AI 助理', '14 個月，節省 3,000+ 工時'],
  ].map(([ind, ttl, n, u, d]) => `<div class="card" style="justify-content:space-between"><div class="col" style="gap:6px"><p style="font-size:26px;color:var(--mute)">${ind}</p><h3 style="font-size:38px">${ttl}</h3></div><div class="col" style="gap:6px"><span class="big" style="font-size:${n.length > 6 ? 76 : 104}px">${n}</span><p class="lab">${u}</p></div><p style="font-size:25px;line-height:1.5;color:var(--mute)">${d}</p></div>`).join('')}</div></div>` };

// ---------- 權限一頁：樹狀架構加圖標（來源：profile/decisions.md；角色與資源名稱為示意） ----------
const nd = (x, y, w, h, b, sub, cls = '', icon = '') => `<div class="node ${cls}" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;flex:none;justify-content:center;padding:10px 16px"><b style="font-size:25px;display:flex;gap:10px;align-items:center">${icon ? ic(icon, 'sm') : ''}${b}</b>${sub ? `<span style="font-size:22px">${sub}</span>` : ''}</div>`;
const RBT = { t: '權限：從組織到資源', n: '一棵樹講完：組織下有部門，部門有主管與員工，資源掛在底下；另有跨部門共享的資源，以及共享中仍受限的資源。每個請求過兩關：看得到嗎、能做什麼。103 類權限，可在管理後台勾選。圖為示意。', html: () => H('MaiAgent　權限　·　名稱為示意', '103 類權限：從組織到資源的一棵樹') + `
  <div class="bd" style="gap:24px"><div class="row" style="gap:48px;flex:1">
    <div style="position:relative;width:1080px;height:540px;flex:none">
      <svg width="1080" height="540" style="position:absolute;left:0;top:0;color:var(--mute)" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M540 84V120M160 120H920M160 120V150M540 120V150M920 120V150M160 234V262M75 262H245M75 262V290M245 262V290M75 366V398M245 366V398M75 398H245M160 398V430M835 234V262M835 262H1005M835 262V290M1005 262V290M835 366V398M1005 366V398M835 398H1005M920 398V430M540 234V290M540 366V430"/></svg>
      ${nd(390, 0, 300, 84, '組織（租戶）', '一家企業一個租戶', 'ink', 'home')}
      ${nd(0, 150, 320, 84, '部門 A', '', 'soft', 'users')}
      ${nd(380, 150, 320, 84, '跨部門共享', '協作時共用', 'soft', 'link')}
      ${nd(760, 150, 320, 84, '部門 B', '', 'soft', 'users')}
      ${nd(0, 290, 150, 76, '主管', '可向下看', 'acc', 'key')}
      ${nd(170, 290, 150, 76, '員工', '', '', '')}
      ${nd(760, 290, 150, 76, '主管', '可向下看', 'acc', 'key')}
      ${nd(930, 290, 150, 76, '員工', '', '', '')}
      ${nd(380, 290, 320, 76, '共享資源', '', '', 'db')}
      ${nd(0, 430, 320, 90, '部門 A 的資源', '知識庫 · 檔案 · Agent', 'ink', 'db')}
      ${nd(380, 430, 320, 90, '受限資源', '共享中仍然受限', 'mut', 'lock')}
      ${nd(760, 430, 320, 90, '部門 B 的資源', '知識庫 · 檔案 · Agent', 'ink', 'db')}
    </div>
    <div class="col grow" style="gap:16px">
      <div class="box" style="gap:10px"><h4>${ic('search', 'acc')}第一關：看得到嗎？</h4><p>資料可見性：組織 → 部門 → 群組 → 資源。在 QuerySet 層先篩掉；RAG 在檢索之前先過濾</p></div>
      <div class="box" style="gap:12px"><h4>${ic('key', 'acc')}第二關：能做什麼？</h4><div class="row" style="gap:8px">${[['C', '新增'], ['R', '讀取'], ['U', '修改'], ['D', '刪除']].map(([x, y]) => `<div class="node ink" style="align-items:center;padding:12px 4px"><b style="font-size:34px">${x}</b><span style="font-size:22px">${y}</span></div>`).join('')}</div></div>
      <div class="node acc" style="flex:none;padding:18px 24px"><b style="font-size:64px;line-height:1">103</b><span style="font-size:24px">類權限，管理後台勾選調整</span></div>
    </div>
  </div>
  <div class="row" style="gap:14px">${['部門互相隔離', '主管向下看，不能反向', '跨組協作共享資源', '共享中仍有受限資源'].map((x) => `<span class="chip a" style="flex:1;text-align:center;white-space:normal">${x}</span>`).join('')}</div></div>` };

// ---------- 個人特質（PLACE）：每個特質一頁，內容用本人的話，例子對應前面章節 ----------
const trait = ({ L, zh, en, head, pts, ex, n, alt }) => ({ t: `特質：${zh}`, alt, n, html: () => `
  <div class="row" style="flex:1;gap:72px">
    <div class="col" style="width:400px;justify-content:space-between">
      <span style="font-size:360px;line-height:.9;font-weight:900;color:var(--acc);letter-spacing:-.04em">${L}</span>
      <div class="col" style="gap:6px"><b style="font-size:68px;font-weight:900;line-height:1.1">${zh}</b><span style="font-size:28px;color:var(--mute)">${en}</span></div>
    </div>
    <div class="col grow" style="gap:24px">
      <h2 style="font-size:56px;line-height:1.22">${head}</h2>
      ${bl(pts.map((p) => ['check', p]))}
      <div class="col" style="gap:12px;margin-top:auto"><p class="tag">實際例子</p>${ex}</div>
    </div>
  </div>` });

const scale = (list) => `<div class="row" style="align-items:flex-end;gap:16px">${list.map(([h, l]) => `<div class="col" style="gap:6px;align-items:center"><div style="width:96px;height:${h}px;background:var(--acc)"></div><b style="font-size:24px">${l}</b></div>`).join('')}<p style="font-size:24px;color:var(--mute);align-self:center;padding-left:12px;line-height:1.5">同一段程式<br>筆數不同，結果不同</p></div>`;

const TR = [
  { t: '個人特質', dark: 1, n: '五個特質各一頁，用我自己的話講，每一頁都附一個前面章節出現過的例子。', html: () => H('個人特質', '我是怎樣的人') + `
    <div class="bd" style="justify-content:center"><div class="road">${[
      ['P', '積極度', '團隊一起面對事實、解決問題'],
      ['L', '邏輯力', '拆解、理解原理、再建構'],
      ['A', '細節重視', '一千萬筆資料，就是大事'],
      ['C', '好奇心', '新東西，我持續吸收再用上'],
      ['E', '同理心', '想客戶為什麼會這樣想'],
    ].map(([l, t, q], i) => `<div class="st"><h3 style="font-size:170px;line-height:1;color:${i === 4 ? 'var(--accink)' : 'var(--acc)'}">${l}</h3><p style="font-size:44px;font-weight:900">${t}</p><p class="q">${q}</p></div>`).join('')}</div></div>` },
  trait({ L: 'P', zh: '積極度', en: 'Proactivity', alt: 1,
    head: '我是團隊的一員：面對事實，一起把問題解決',
    pts: ['新創的文化是互相幫忙：看到 bug，我就主動去找，一起處理', '團隊和夥伴忙不過來時，我會幫忙分擔壓力', '遇到問題，先面對事實，再一起找出解法', '看到更好的做法，就提出建議', '每天開會，我都在想：怎麼用工程思維，讓開發流程更快、更自動化、準確率更高'],
    ex: flow([['共享 rules', '程式風格與架構慣例'], ['AI Reviewer', 'security · performance · N+1', 'acc'], ['Merge gate', '通過才能合併', 'ink'], ['CI −20%', '9 組平行測試與快取']]),
    n: '新創文化是互相幫忙，我是團隊的一員，不是個體：有 bug 一起處理、幫夥伴分擔、面對事實解決問題。例子：AI 讓開發變快，我推動共享 rules 與 AI Reviewer，並縮短 CI 時間，讓整個團隊受惠。' }),
  trait({ L: 'L', zh: '邏輯力', en: 'Logic',
    head: '遇到解不開的問題，就拆解、理解原理、再建構',
    pts: ['每一次，我都在調整自己：很多東西一開始我根本沒碰過，但我可以吸收、研究', '任何事情的本質都一樣：遇到解不開的問題，就一直拆解，弄懂原理，再把它建出來', '有了 AI，思維能力更重要：選擇，比努力更重要', '思維能力好的工程師，更能駕馭 AI，效益更高'],
    ex: flow([['平行化', '反而更慢', 'mut'], ['回頭拆解問題', ''], ['切成批次', 'checkpoint 續跑', 'acc'], ['可靠完成', '10M+ 筆資料', 'ink']]),
    n: '重點是拆解的過程，不是結果。例子：匯入先試平行化反而更慢，才回頭拆問題。' }),
  trait({ L: 'A', zh: '細節重視', en: 'Attention to Detail', alt: 1,
    head: '一個地方沒做好，到一千萬筆就是大事',
    pts: ['以後是 Agent 寫 code 的時代，怎麼做 code review 很重要，所以我做 CI/CD 與自動檢查', '企業權限（RBAC）我主要負責：這種東西一旦錯了，產品的名聲就出大事', '我也很注重 UX 流程：在第一間公司，我常和設計師一起討論', 'N+1、速度問題都是蝴蝶效應；我一定會在乎 edge case，這是我從高中當選手帶來的習慣'],
    ex: `<div class="row ctr" style="gap:40px">${scale([[34, '10'], [60, '1,000'], [96, '10,000'], [140, '10,000,000']])}${chips(['SQL query count 上限', '租戶隔離測試', '覆蓋率 96%'], 'a')}</div>`,
    n: '蝴蝶效應：十筆沒問題，到一千萬筆就可能出大事。例子：N+1 在 CI 擋下、租戶隔離測試、96% 覆蓋率。' }),
  trait({ L: 'C', zh: '好奇心', en: 'Curiosity',
    head: '新技術變化很快，我持續吸收，再用到產品上',
    pts: ['新創與 AI 領域這幾年資訊爆炸，我保持高強度的吸收', '吸收之後，我會想怎麼用在產品、個人習慣和開發流程上', '我認為持續學習，是新創工程師的必要技能'],
    ex: flow([['新工具', 'Claude Code · Cursor'], ['先自己用', ''], ['寫成共享 rules', '12+ skills，跨 4 個 repo', 'acc'], ['全團隊使用', '', 'ink']]),
    n: '重點不是學了什麼，而是怎麼轉成團隊能用的東西。例子：Claude Code 與 Cursor 導入、12+ 共用 skills。' }),
  trait({ L: 'E', zh: '同理心', en: 'Empathy', alt: 1,
    head: '先想為什麼這樣做；客戶為什麼這樣想',
    pts: ['同理心，對我來說就是使用者體驗：我會想為什麼要這樣做、背後的原理', '套到客戶身上也一樣：想客戶為什麼會這樣想', '大學時，我以學生身分兼職，為彰師大先進科技輔助泛自閉症中心做 3D VR 遊戲設計、影片剪輯和網站開發', '我也當過志工：站在需要幫助的人那一邊'],
    ex: `<div class="col" style="gap:10px">${flow([['企業的組織運作', '部門隔離、主管向下看'], ['權限 RBAC', '照真實組織設計', 'acc']])}${flow([['自閉症孩子的需求', '彰師大先進科技輔助泛自閉症中心'], ['3D VR 遊戲 · 影片 · 網站', '學生兼職', 'acc']])}${flow([['災區的需求', ''], ['救災媒合平台', '光復超人志工，花蓮', 'acc']])}</div>`,
    n: '同理心不是形容詞：RBAC 照企業真實運作設計；大學時為自閉症輔助中心做 VR 遊戲、影片與網站；志工做媒合平台。中心的正式名稱待確認。' }),
];

const ORDER = [S['封面'], INTRO, ROAD, S['Wisdome.AI 後端架構'], MA1, CASES, S['RAG 文件管線'], S['串流 Completion API'], RBT, S['企業登入與 LDAP 同步'], S['用量計量與稽核'], S['10M+ 批次管線'], S['千萬級資料與 SQL'], S['測試與 CI'], S['AI 開發流程'], S['交付與部署'], S['技術地圖'], S['獲獎與發表']];

const RAIL = ['起點', '能用', '敢用', '撐得住', '跑得快'];
const CH = { 'Wisdome.AI 後端架構': '起點', 'RAG 文件管線': '能用', '串流 Completion API': '能用', '知識庫、API 與匯出': '能用', '權限：從組織到資源': '敢用', '企業登入與 LDAP 同步': '敢用', '用量計量與稽核': '敢用', '10M+ 批次管線': '撐得住', '千萬級資料與 SQL': '撐得住', '測試與 CI': '跑得快', 'AI 開發流程': '跑得快', '交付與部署': '跑得快' };

// 講稿提示（按 N 顯示）：開場一句 → 重點 → 轉場
const NOTES = {
  '封面': '一句話：我做企業級 AI 產品的後端。接下來先用一頁讓你知道我是誰，再用五章講我做過的事。',
  '自我介紹': '開場：背景（學什麼、做多久）→ 做過（兩家公司各一句）→ 貢獻（四個數字）→ 證明（獎項與救災志工）。轉場：這些成果，我依「一個企業 AI 產品要走過的順序」來講。',
  '路線圖': '先講結論再展開：五章 = 起點、能用、敢用、撐得住、跑得快。每章回答一個問題。轉場：先從我一個人建產品的起點開始。',
  'Wisdome.AI 後端架構': '重點：10 人團隊、我是唯一的後端，所以每一層都要自己選、自己扛。先上線 MVP，再依回饋迭代。轉場：這是 0 到 1；接著是企業級產品怎麼做到「能用」。',
  'RAG 文件管線': '重點：解析錯了 AI 就會答錯，所以我比較 2–3 個 Parser，看輸出也看下游回答。Parser 可切換，讓客戶自己取捨速度與品質。轉場：資料進得來，接著要答得快。',
  '串流 Completion API': '重點：舊路徑跨好幾層、難整合。我先畫資料流，再新增 SSE 路徑並與舊路徑並存，用共用 Service 避免重寫。轉場：功能能用了，補上客戶日常要用的平台功能。',
  '知識庫、API 與匯出': '快速帶過：知識庫與引用權限、開放 API、非同步匯出、RAG 檢索範圍控制（與同事共同開發）。轉場：能用之後，企業第一個問題是：資料安全嗎？',
  '多租戶 RBAC': '重點：從企業真實運作出發：部門隔離、主管向下看、跨部門共享。QuerySet 層過濾，並以大量測試驗證租戶隔離。轉場：權限有了，要接上企業既有的登入。',
  '企業登入與 LDAP 同步': '重點：客戶不必換登入方式。LDAP 同步是我從零建的，單次最多 50,000 人，用批次、冷卻、排程控制負載。轉場：還有兩件企業一定會問的事：花了多少、誰做了什麼。',
  '用量計量與稽核': '重點：token 用量與成本供企業計費；pghistory 保存變更前後，搜尋與匯出。轉場：企業敢用了，接著是資料量大時要撐得住。',
  '10M+ 批次管線': '重點故事：Worker 一直 OOM，我先試平行化反而更慢，才回頭用 Canvas 切批次、加 checkpoint 與防重複寫入。講「先錯再改」比講結果更有說服力。',
  '千萬級資料與 SQL': '重點：沒有一種寫法適合所有資料，逐案判斷；EXPLAIN 先看計畫；用 CI 的 query count 上限把 N+1 擋在 Merge 前。轉場：系統撐得住，團隊也要能持續快速交付。',
  '測試與 CI': '重點：三個圖：CI 縮短 20%（9 組平行與快取）、96% 覆蓋率、自動檢查。長條只表示相對長度。',
  'AI 開發流程': '重點：AI 讓產出變多，所以把檢查做成自動關卡。共享 rules 讓 AI 照團隊慣例寫，AI Reviewer 當 merge gate。',
  '交付與部署': '重點：PR 自動測試；Merge 後自動部署 Dev 與 Staging，Production 手動上線。另外：多雲儲存與地端部署。轉場：技術總覽。',
  '技術地圖': '一頁總覽，不展開；有人追問再回到對應章節。',
  '個人特質': '五項各講一個事件，不講形容詞。每一項都已在前面章節出現過，這頁是回收。',
  '獲獎與發表': '收尾：這些經歷之外，是我一直在做的事：做研究、做救災平台。回到動機：做出來的東西真的有人用。可接著問：想請教團隊的問題。',
};

const SLIDES = ORDER.map((s) => ({ ...s, n: s.n || NOTES[s.t] || '', ch: CH[s.t] || '' }));

// ---------- 引擎 ----------
const stage = document.getElementById('stage');
const N = SLIDES.length;
stage.innerHTML = SLIDES.map((s, i) => `<section class="slide ${s.field ? 'field ' : ''}${s.dark ? 'dark' : s.alt ? 'alt' : ''}" data-i="${i}" aria-label="${s.t}">${s.html()}${s.ch ? `<div class="ft">${RAIL.map((r) => `<span class="${r === s.ch ? 'on' : ''}">${r}</span>`).join('')}</div>` : ''}</section>`).join('');
const els = [...stage.children];
const rvs = els.map((e) => [...e.querySelectorAll('.rv')]);
const steps = els.map(() => 0);
let cur = 0;

const apply = () => {
  rvs[cur].forEach((e, k) => e.classList.toggle('on', k < steps[cur]));
  document.getElementById('progress').style.width = `${((cur + 1) / N) * 100}%`;
  document.getElementById('notes').textContent = SLIDES[cur].n;
  document.querySelectorAll('#toc li').forEach((li, k) => li.classList.toggle('cur', k === cur));
};
const show = (i, full) => {
  cur = Math.max(0, Math.min(N - 1, i));
  els.forEach((e, k) => e.classList.toggle('active', k === cur));
  if (full) steps[cur] = rvs[cur].length;
  apply();
  history.replaceState(null, '', `#${cur + 1}`);
  document.title = `${SLIDES[cur].t}　·　張浩富 工作經驗簡報`;
};
const next = () => { if (cur < N - 1) show(cur + 1, true); };
const prev = () => { if (cur > 0) show(cur - 1, true); };

const fit = () => { const s = Math.min(innerWidth / 1920, innerHeight / 1080); stage.style.transform = `scale(${s})`; };
addEventListener('resize', fit); fit();

const drawer = document.getElementById('drawer');
document.getElementById('toc').innerHTML = SLIDES.map((s, i) => `<li><button data-go="${i}"><span>${i + 1}</span>${s.t}</button></li>`).join('');
const toggle = (o) => drawer.classList.toggle('open', o);
document.getElementById('menu-btn').addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
drawer.addEventListener('click', (e) => { const b = e.target.closest('[data-go]'); if (b) { show(+b.dataset.go, true); toggle(false); } e.stopPropagation(); });

document.getElementById('viewport').addEventListener('click', () => { if (drawer.classList.contains('open')) toggle(false); else next(); });
addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || k === ' ' || k === 'Enter') { e.preventDefault(); next(); }
  else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prev(); }
  else if (k === 'Home') show(0);
  else if (k === 'End') show(N - 1, true);
  else if (k === 'g' || k === 'G') toggle();
  else if (k === 'n' || k === 'N') document.getElementById('notes').classList.toggle('open');
  else if (k === 't' || k === 'T') setTheme(theme + 1, true);
  else if (k === 'Escape') toggle(false);
  else if (k === 'a' || k === 'A') { steps[cur] = rvs[cur].length; apply(); }
});
let tx = null;
addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
addEventListener('touchend', (e) => { if (tx === null) return; const d = e.changedTouches[0].clientX - tx; tx = null; if (Math.abs(d) > 50) (d < 0 ? next : prev)(); });

// 配色：T 鍵循環；?t=1~4 可指定；選擇會記在這個瀏覽器
const THEMES = ['黑橘', '石墨青', '黑白紅', '森林綠', '海軍藍'];
const THEME_CLASS = ['t5', 't1', 't2', 't3', 't4'];
let theme = 0;
const setTheme = (i, say) => {
  theme = ((i % THEMES.length) + THEMES.length) % THEMES.length;
  document.documentElement.className = THEME_CLASS[theme];
  try { localStorage.setItem('deck-theme', String(theme)); } catch (e) { /* 無痕模式等情況略過 */ }
  if (say) { const hn = document.getElementById('hint'); hn.textContent = `配色：${THEMES[theme]}（按 T 換）`; hn.classList.remove('off'); clearTimeout(setTheme.t); setTheme.t = setTimeout(() => hn.classList.add('off'), 2000); }
};
{
  const q = parseInt(new URLSearchParams(location.search).get('t'), 10);
  let saved = NaN;
  try { saved = parseInt(localStorage.getItem('deck-theme'), 10); } catch (e) { /* 略過 */ }
  setTheme(q >= 1 && q <= THEMES.length ? q - 1 : (saved >= 0 ? saved : 0), false);
}

const h = parseInt(location.hash.slice(1), 10);
show(h >= 1 && h <= N ? h - 1 : 0, true);
setTimeout(() => document.getElementById('hint').classList.add('off'), 5000);
})();

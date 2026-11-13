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

// ---------- Wisdome 後端架構圖（示意；箭頭表示主要方向，依 LinkedIn 與履歷整理；AWS 圖示為 AWS 官方 Architecture Icons，未改色） ----------
// 節點：o.aws 用 AWS 官方彩色圖示；o.ic 用單色圖示（遮罩，跟主題上色）；o.sym 用簡報內建線條圖示；沒有圖示就置中
const aN = (x, y, w, h, a, b = '', o = {}) => {
  const cy = y + h / 2, has = o.aws || o.ic || o.sym, tx = has ? x + 62 : x + w / 2;
  const icon = o.aws ? `<image href="assets/logos/aws/${o.aws}.svg" x="${x + 12}" y="${cy - 21}" width="42" height="42"/>`
    : o.ic ? `<rect class="icn" x="${x + 14}" y="${cy - 19}" width="38" height="38" style="-webkit-mask:url(assets/logos/${o.ic}.svg) center/contain no-repeat;mask:url(assets/logos/${o.ic}.svg) center/contain no-repeat"/>`
    : o.sym ? `<g class="sy" transform="translate(${x + 14} ${cy - 19}) scale(1.58)"><use href="#i-${o.sym}" width="24" height="24"/></g>` : '';
  return `<g class="nd ${o.c || ''}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>${icon}<text class="t1 ${has ? 'l' : ''}" x="${tx}" y="${b ? cy - 11 : cy}">${a}</text>${b ? `<text class="t2 ${has ? 'l' : ''}" x="${tx}" y="${cy + 16}">${b}</text>` : ''}</g>`;
};
const aP = (x, y, w, h, title = '', tone = '') => `<g><rect class="panel ${tone}" x="${x}" y="${y}" width="${w}" height="${h}" rx="16"/>${title ? `<text class="gt" x="${x + 22}" y="${y + 36}">${title}</text>` : ''}</g>`;
const aL = (pts, c = '', head = true) => `<polyline class="ln ${c}" points="${pts}"${head ? ` marker-end="url(#${c.includes('main') ? 'wd-ac' : 'wd-ah'})"` : ''}/>`;
const aT = (x, y, s, anchor = 'middle', c = 'lb') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;
const WD_ARCH = `<svg class="arch" viewBox="0 0 1728 655" role="img" aria-label="Wisdome.AI 後端架構：前端請求經 ALB（反向代理與 SSL）負載平衡到 EC2 上用 Docker Compose 跑的多個 Django 容器；Django 把任務丟進 RabbitMQ 由 Celery 執行；資料在 MySQL（RDS）、MongoDB 與 S3，S3 前面是 CloudFront；Route 53 負責 DNS；交付是 GitHub Actions 建映像推到 ECR 再到 EC2 pull 與 up；監控是旁路">
  <defs>
    <marker id="wd-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon class="ah" points="0,0 10,5 0,10"/></marker>
    <marker id="wd-ac" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon class="ah ac" points="0,0 10,5 0,10"/></marker>
  </defs>
  ${aP(200, 56, 940, 548)}${aT(1118, 92, 'AWS', 'end', 'gt')}
  ${aN(0, 342, 184, 64, '前端網頁', '使用者', { sym: 'globe' })}${aL('184,374 216,374', 'main')}
  ${aN(216, 210, 190, 64, 'Route 53', 'DNS', { aws: 'route53', c: 'in' })}${aL('311,274 311,342', 'dash')}${aT(327, 314, 'DNS 解析', 'start', 'lb sm')}
  ${aN(216, 342, 190, 64, 'ALB', '反向代理 · SSL', { aws: 'elb', c: 'in' })}${aL('406,374 462,374', 'main')}
  <rect class="host" x="450" y="266" width="320" height="172" rx="14"/>${aT(470, 302, 'EC2 · Docker Compose', 'start', 'gt sm')}
  <image href="assets/logos/aws/ec2.svg" x="722" y="276" width="36" height="36"/>
  ${aN(462, 324, 296, 100, 'Django REST', 'Gunicorn · 多個容器', { ic: 'django', c: 'hot' })}
  ${aN(475, 0, 270, 48, 'ECPay 金流', '', { c: 'ext' })}${aL('610,266 610,48')}${aT(626, 168, '付款', 'start')}
  ${aP(832, 104, 280, 328, '資料')}${aT(800, 160, '讀寫', 'middle', 'lb sm')}
  ${aL('758,374 800,374 800,176', '', false)}
  ${aN(848, 148, 248, 56, 'MySQL', 'RDS', { ic: 'mysql', c: 'in' })}${aL('800,176 848,176')}
  ${aN(848, 216, 248, 56, 'MongoDB', '', { ic: 'mongodb', c: 'in' })}${aL('800,244 848,244')}
  ${aN(848, 284, 248, 56, 'S3', '檔案', { aws: 's3', c: 'in' })}${aL('800,312 848,312')}
  ${aL('972,340 972,368')}
  ${aN(848, 368, 248, 56, 'CloudFront', '檔案 CDN', { aws: 'cloudfront', c: 'in' })}
  ${aL('720,438 720,524')}${aT(704, 482, '丟進佇列', 'end')}
  ${aP(494, 484, 570, 106, '背景工作')}
  ${aN(622, 522, 196, 54, 'RabbitMQ', '', { ic: 'rabbitmq', c: 'in' })}${aL('818,549 884,549')}${aT(851, 537, '分派任務', 'middle', 'lb sm')}${aN(884, 522, 168, 54, 'Celery', '', { ic: 'celery', c: 'in' })}
  ${aP(1170, 56, 280, 262, '交付')}
  ${aN(1186, 112, 248, 64, 'GitHub Actions', '建置映像', { ic: 'githubactions', c: 'in' })}${aL('1310,176 1310,220')}
  ${aN(1186, 220, 248, 64, 'ECR', '推送映像', { aws: 'ecr', c: 'in' })}
  ${aL('1186,252 1158,252 1158,462 764,462 764,438', 'dash')}${aT(960, 450, 'pull · up', 'middle', 'lb sm')}
  ${aP(1478, 56, 250, 464, '監控')}
  ${aN(1490, 112, 226, 64, 'ELK', '日誌', { ic: 'elasticsearch', c: 'in' })}
  ${aN(1490, 216, 226, 64, 'Grafana', '儀表板', { ic: 'grafana', c: 'in' })}${aL('1603,280 1603,324')}${aT(1619, 308, '查詢', 'start', 'lb sm')}
  ${aN(1490, 324, 226, 64, 'Prometheus', '指標', { ic: 'prometheus', c: 'in' })}${aL('1603,388 1603,432')}${aT(1619, 416, '觸發', 'start', 'lb sm')}
  ${aN(1490, 432, 226, 64, 'Alertmanager', '告警', { sym: 'bell', c: 'in' })}
  ${aL('1140,572 1464,572 1464,144 1490,144', 'dash')}${aL('1464,356 1490,356', 'dash')}${aT(1300, 560, '日誌 · 指標', 'middle', 'lb sm')}
  ${aT(0, 645, '示意圖　橘線：請求主線　灰線：資料與任務　虛線：部署、DNS 與監控旁路', 'start', 'lb sm')}
</svg>`;

// ---------- 交付與部署：自動部署、多雲儲存流程圖（示意；marker id 另用 dp- 前綴，避免和隱藏頁的 wd- 衝突） ----------
const DP_ARCH = `<svg class="arch" viewBox="0 0 1728 625" role="img" aria-label="交付與部署：自動部署流程是 PR 觸發 GitHub Actions 自動測試，Merge 後建置 Docker 映像、推到 ECR、自動部署到 ECS 的 Dev 與 Staging，Production 手動上線，成功與失敗都通知 Slack；多雲儲存是應用程式透過 Provider Factory 使用 AWS S3 或 GCP GCS，後面接 CDN 與 RAG 流程；地端部署是協助客戶地端環境串接地端模型">
  <defs>
    <marker id="wd-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon class="ah" points="0,0 10,5 0,10"/></marker>
    <marker id="wd-ac" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon class="ah ac" points="0,0 10,5 0,10"/></marker>
  </defs>
  ${aP(0, 0, 1728, 280, '自動部署')}
  ${aN(24, 84, 130, 70, 'PR', '', { sym: 'git', c: 'in' })}${aL('154,119 227,119', 'main')}
  ${aN(227, 84, 240, 70, 'GitHub Actions', '自動測試', { ic: 'githubactions', c: 'in' })}${aL('467,119 540,119', 'main')}
  ${aN(540, 84, 130, 70, 'Merge', '', { sym: 'check', c: 'in' })}${aL('670,119 743,119', 'main')}
  ${aN(743, 84, 170, 70, 'Docker', '建置映像', { ic: 'docker', c: 'in' })}${aL('913,119 986,119', 'main')}
  ${aN(986, 84, 150, 70, 'ECR', '', { aws: 'ecr', c: 'in' })}${aL('1136,119 1199,119', 'main')}
  ${aN(1199, 84, 240, 70, 'ECS', 'Dev / Staging 自動部署', { aws: 'ecs', c: 'in key' })}${aL('1439,119 1512,119')}
  ${aN(1512, 84, 190, 70, 'Production', '手動上線', { sym: 'lock', c: 'ext' })}
  ${aL('1319,154 1319,198')}
  ${aN(1199, 198, 240, 70, '健康檢查', '失敗排查 · 回滾', { sym: 'refresh', c: 'in' })}${aL('1439,233 1512,233')}${aT(1475, 220, '通知', 'middle', 'lb sm')}
  ${aN(1512, 198, 190, 70, 'Slack', '成功與失敗', { sym: 'bell', c: 'in' })}
  ${aP(0, 304, 1304, 296, '多雲儲存')}${aT(24, 378, '部分客戶的部署環境不適用 AWS，或有地端需求，所以檔案儲存不能綁死一家雲', 'start', 'lb sm')}
  ${aN(24, 444, 200, 72, '應用程式', '', { sym: 'code', c: 'in' })}${aL('224,480 300,480', 'main')}
  ${aN(300, 444, 240, 72, 'Provider Factory', 'S3 / GCS 切換', { sym: 'layers', c: 'in key' })}
  ${aL('540,480 590,480 590,432', '', false)}${aL('590,432 640,432')}${aL('590,480 590,528 640,528', '', false)}${aL('590,528 640,528')}
  ${aN(640, 400, 300, 72, 'AWS S3', '物件儲存', { aws: 's3', c: 'in' })}${aL('940,436 1040,436')}
  ${aN(1040, 400, 250, 72, 'CDN', '', { sym: 'cloud', c: 'in' })}
  ${aN(640, 492, 300, 72, 'GCP GCS', 'Signed URL · IAM · Lifecycle', { ic: 'googlecloud', c: 'in' })}${aL('940,528 1040,528')}${aT(990, 514, '大檔上傳', 'middle', 'lb sm')}
  ${aN(1040, 492, 250, 72, 'RAG 流程', '', { sym: 'search', c: 'in' })}
  ${aP(1324, 304, 404, 296, '地端部署（協助）')}
  ${aN(1348, 400, 356, 72, '客戶地端環境', '金融、航空業', { sym: 'server', c: 'in' })}${aL('1526,472 1526,500')}
  ${aN(1348, 500, 356, 72, '地端模型', '', { sym: 'layers', c: 'in' })}
  ${aT(0, 618, '示意圖　橘色框：重點步驟　虛線框：手動　橘線：主流程', 'start', 'lb sm')}
</svg>`.replaceAll('wd-', 'dp-');

// ---------- 企業登入與身分同步流程圖（示意；各家串接細節依客戶而異；marker id 用 sso- 前綴） ----------
const SSO_ARCH = `<svg class="arch" viewBox="0 0 1728 640" role="img" aria-label="企業登入與身分同步：Keycloak、Azure AD 走各自的 SSO 登入管線，LDAP/AD 走同步管線，三條管線都匯到外部身分映射，對應成內部的使用者、組織、群組、角色，再調和既有帳號與權限並做租戶隔離；下方是 SSO 登入流程與 LDAP 同步流程的示意">
  <defs>
    <marker id="wd-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon class="ah" points="0,0 10,5 0,10"/></marker>
    <marker id="wd-ac" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon class="ah ac" points="0,0 10,5 0,10"/></marker>
  </defs>
  ${aP(0, 0, 1728, 262, '三種來源，各自的串接管線，匯到同一套內部身分')}
  ${aN(24, 56, 250, 56, 'Keycloak', '企業身分', { ic: 'keycloak', c: 'in' })}${aL('274,84 340,84', 'main')}${aN(340, 56, 600, 56, 'SSO 登入管線', '依客戶各自設定', { sym: 'lock', c: 'in' })}
  ${aN(24, 122, 250, 56, 'Azure AD', '企業身分', { sym: 'cloud', c: 'in' })}${aL('274,150 340,150', 'main')}${aN(340, 122, 600, 56, 'SSO 登入管線', '依客戶各自設定', { sym: 'lock', c: 'in' })}
  ${aN(24, 188, 250, 56, 'LDAP / AD', '使用者與群組', { sym: 'server', c: 'in' })}${aL('274,216 340,216', 'main')}${aN(340, 188, 600, 56, '同步管線', '單次最多 50,000 人 · 批次 · 冷卻 · 排程', { sym: 'refresh', c: 'in' })}
  ${aL('940,84 1000,84 1000,150', '', false)}${aL('940,216 1000,216 1000,150', '', false)}${aL('940,150 1060,150', 'main')}
  ${aN(1060, 56, 300, 188, '外部身分映射', 'User · Org · Group · Role', { sym: 'users', c: 'in key' })}${aL('1360,150 1404,150', 'main')}
  ${aN(1404, 56, 300, 88, '調和既有帳號', '預設權限 vs 既有權限', { sym: 'key', c: 'in key' })}
  ${aN(1404, 156, 300, 88, '企業租戶隔離', '', { sym: 'lock', c: 'in' })}
  ${aP(0, 282, 1100, 340, 'SSO 登入流程')}
  ${aN(24, 340, 170, 64, '使用者', '', { sym: 'users', c: 'in' })}${aL('194,372 264,372', 'main')}
  ${aN(264, 340, 250, 64, '轉到企業登入', 'MaiAgent 登入頁', { sym: 'lock', c: 'in' })}${aL('514,372 604,372', 'main')}
  ${aN(604, 340, 440, 64, 'Keycloak / Azure AD', '企業帳號驗證', { ic: 'keycloak', c: 'in' })}
  ${aL('824,404 824,437 164,437 164,470', 'main')}${aT(500, 428, '驗證成功，回傳身分資訊', 'middle', 'lb sm')}
  ${aN(24, 470, 280, 64, '收到身分資訊', '使用者 · 群組', { sym: 'check', c: 'in' })}${aL('304,502 374,502', 'main')}
  ${aN(374, 470, 300, 64, '外部身分映射', 'User · Org · Group · Role', { sym: 'users', c: 'in key' })}${aL('674,502 744,502', 'main')}
  ${aN(744, 470, 300, 64, '調和既有帳號', '保留既有帳號與權限', { sym: 'key', c: 'in key' })}
  ${aT(24, 596, '標準登入流程骨架；各家設定、欄位與細節依客戶而異', 'start', 'lb sm')}
  ${aP(1128, 282, 600, 340, 'LDAP / AD 同步流程')}
  ${aN(1152, 326, 552, 52, '讀取 LDAP / AD', '使用者 · 群組 · 帳號狀態', { sym: 'server', c: 'in' })}${aL('1428,378 1428,402')}
  ${aN(1152, 402, 552, 52, '批次處理', '單次最多 50,000 人', { sym: 'layers', c: 'in' })}${aL('1428,454 1428,478')}
  ${aN(1152, 478, 552, 52, '映射到內部', '使用者 · 群組 · 帳號狀態', { sym: 'users', c: 'in key' })}${aL('1428,530 1428,554')}
  ${aN(1152, 554, 552, 52, '排程與冷卻', '控制同步的負載', { sym: 'clock', c: 'in' })}
  ${aT(0, 636, '示意圖　橘色框：身分映射與帳號調和　橘線：流程方向', 'start', 'lb sm')}
</svg>`.replaceAll('wd-', 'sso-');

// ---------- 測試與 CI 流程圖（示意；CI 40→16 分為使用者確認；marker id 用 ci- 前綴） ----------
const CI_ARCH = `<svg class="arch" viewBox="0 0 1728 650" role="img" aria-label="測試與 CI：PR 觸發 GitHub Actions 自動檢查，包括九組平行測試與 Docker BuildKit 快取、N+1 偵測、SQL query count 上限、五階段安全掃描、租戶隔離測試，通過後由 AI Code Review 把關才能合併；CI 時間從 40 分鐘降到 16 分鐘，核心模組測試覆蓋率 96%">
  <defs>
    <marker id="wd-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon class="ah" points="0,0 10,5 0,10"/></marker>
    <marker id="wd-ac" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon class="ah ac" points="0,0 10,5 0,10"/></marker>
  </defs>
  ${aP(0, 0, 1728, 424, '所有 CI/CD 流程自動化（GitHub Actions）')}
  ${aN(24, 196, 150, 64, 'PR', '', { sym: 'git', c: 'in' })}${aL('174,228 230,228', 'main')}
  ${aP(230, 56, 954, 344, '自動檢查，全部通過才往下')}
  <g class="nd in key"><rect x="254" y="108" width="360" height="268" rx="12"/>
    <text class="t1 l" x="280" y="148">單元 · 整合測試</text>
    <text class="t2 l" x="280" y="178">9 組平行 · Docker BuildKit 快取</text>
    ${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect class="${r === 0 && c === 0 ? 'cl a' : 'cl'}" x="${280 + c * 58}" y="${204 + r * 58}" width="48" height="48" rx="6"/>`).join('')).join('')}
    <text class="lb sm" x="474" y="262" text-anchor="start">同時跑</text>
    <text class="lb sm" x="474" y="288" text-anchor="start">時間大幅縮短</text>
  </g>
  ${aN(660, 108, 500, 56, 'N+1 query 自動偵測', '', { sym: 'check', c: 'in' })}
  ${aN(660, 180, 500, 56, 'SQL query count 上限', '', { sym: 'gauge', c: 'in' })}
  ${aN(660, 252, 500, 56, '5 階段安全掃描', '', { sym: 'shield', c: 'in' })}
  ${aN(660, 324, 500, 52, '租戶隔離測試', '', { sym: 'lock', c: 'in' })}
  ${aL('1184,228 1236,228', 'main')}
  ${aN(1236, 180, 232, 96, 'AI Code Review', 'merge gate', { sym: 'search', c: 'in key' })}${aL('1468,228 1524,228', 'main')}
  ${aN(1524, 196, 180, 64, 'Merge', '', { sym: 'check', c: 'in' })}
  ${aP(0, 448, 640, 190, 'CI 執行時間')}
  <rect class="brb" x="24" y="498" width="420" height="34" rx="6"/><text class="lb sm bt" x="40" y="516">優化前　40 分</text>
  <rect class="bra" x="24" y="544" width="168" height="34" rx="6"/><text class="lb sm bt on" x="40" y="562">16 分</text>
  <text class="bgn a" x="214" y="574">−60%</text>
  <text class="lb sm" x="24" y="618" text-anchor="start">平行化與快取的效能最佳化</text>
  ${aP(664, 448, 496, 190, '核心模組測試覆蓋率')}
  <text class="bgn" x="688" y="568">96%</text>
  <rect class="brb" x="688" y="592" width="448" height="16" rx="8"/><rect class="bra" x="688" y="592" width="430" height="16" rx="8"/>
  ${aP(1184, 448, 544, 190, '寫測試，維持系統穩定')}
  ${aN(1208, 500, 496, 56, '核心模組的測試', '', { sym: 'check', c: 'in' })}
  ${aN(1208, 570, 496, 56, '修正效能與平行處理的問題', '', { sym: 'gauge', c: 'in' })}
</svg>`.replaceAll('wd-', 'ci-');

// ---------- 串流 Completion API 流程圖（示意；marker id 用 cp- 前綴） ----------
const CP_ARCH = `<svg class="arch" viewBox="0 0 1728 620" role="img" aria-label="串流 Completion API：既有路徑經 Channels、Celery、signals、LlamaIndex 到 WebSocket；新增路徑是 Client 進 Django Async View，由 View 呼叫抽出的共用 Service，再到 LLM，用 SSE 逐段送回；Service 以 Interface 與依賴注入重構，依 SOLID 與 Clean Architecture；這是接到最多客戶的最成功案例">
  <defs>
    <marker id="wd-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon class="ah" points="0,0 10,5 0,10"/></marker>
    <marker id="wd-ac" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon class="ah ac" points="0,0 10,5 0,10"/></marker>
  </defs>
  ${aP(0, 0, 1728, 150, '既有路徑')}
  ${['Client', 'Channels', 'Celery', 'signals 遞迴', 'LlamaIndex', 'WebSocket'].map((n, i) => `${aN(24 + i * 280, 60, 230, 64, n, '', { c: 'in' })}${i < 5 ? aL(`${254 + i * 280},92 ${304 + i * 280},92`) : ''}`).join('')}
  ${aP(0, 174, 1728, 430, '新增路徑，與既有並存')}
  <rect class="badge" x="1394" y="188" width="310" height="44" rx="22"/><text class="badget" x="1549" y="210">最成功的案例</text>
  ${aT(1704, 262, '接到最多客戶，是公司最賺錢的功能', 'end', 'lb sm')}
  ${aN(24, 300, 200, 76, 'Client', '', { c: 'in' })}${aL('224,338 331,338', 'main')}${aT(278, 322, '請求', 'middle', 'lb sm')}
  ${aN(331, 300, 290, 76, 'Django Async View', 'async generator', { ic: 'django', c: 'hot' })}${aL('621,338 728,338', 'main')}
  ${aN(728, 300, 290, 76, 'Service', '從 View 抽出，新舊路徑共用', { sym: 'layers', c: 'in key' })}${aL('1018,338 1125,338', 'main')}
  ${aN(1125, 300, 180, 76, 'LLM', '', { sym: 'cloud', c: 'in' })}${aL('1305,338 1412,338', 'main')}${aT(1358, 322, '逐段', 'middle', 'lb sm')}
  ${aN(1412, 300, 290, 76, 'SSE 逐段送出', '', { sym: 'zap', c: 'in' })}
  ${aL('873,300 873,150', 'dash')}${aT(889, 236, '新舊路徑共用', 'start', 'lb sm')}
  ${aL('1557,376 1557,412 124,412 124,376', 'dash')}${aT(840, 404, '逐段回傳給 Client', 'middle', 'lb sm')}
  ${aP(24, 440, 1076, 146, 'Refactor：從 View 抽出 Service')}
  ${aN(48, 494, 190, 64, '抽出 Service', '', { sym: 'layers', c: 'in' })}${aN(250, 494, 220, 64, '抽出 Interface', '', { sym: 'code', c: 'in' })}${aN(482, 494, 190, 64, '依賴注入 DI', '', { sym: 'key', c: 'in' })}${aN(684, 494, 180, 64, 'SOLID 原則', '', { sym: 'check', c: 'in' })}${aN(876, 494, 190, 64, 'Clean Arch.', '', { sym: 'layers', c: 'in' })}
  ${aP(1124, 440, 580, 146, 'SSE 事件（示意）')}
  <text class="mono" x="1148" y="512"><tspan class="mk1">data:</tspan> {"delta": "根據"}</text>
  <text class="mono" x="1148" y="538"><tspan class="mk1">data:</tspan> {"delta": "知識庫"}</text>
  <text class="mono" x="1148" y="564"><tspan class="mk1">data:</tspan> [DONE]</text>
</svg>`.replaceAll('wd-', 'cp-');

// ---------- 封面：背景技能標籤牆（來源：履歷、LinkedIn 經歷、資料包的功能清單與技術詞；只收後端與 AI 的專業項目，英文，不放基礎項目；標籤只是背景質感） ----------
const TG = ['Multi-tenant Architecture', 'Tenant Isolation', 'Multi-tenant RBAC', '103 Permission Classes', 'Resource-level Permissions', 'External Identity Mapping', 'Account & Role Reconciliation', 'SSO Integration', 'Keycloak', 'Azure AD / Entra ID', 'Google Workspace SSO', 'LDAP / AD Sync', 'Directory Sync Pipeline', 'Audit Trail', 'Change History (pghistory)', 'Audit Search & Export', 'Usage Metering', 'Token Accounting', 'Cost Aggregation', 'Async Completion API', 'SSE Streaming', 'async generator', 'Django Async View', 'Service Layer Refactor', 'Interface Extraction', 'Dependency Injection', 'SOLID Principles', 'Clean Architecture', 'Legacy Flow Reverse Engineering', 'WebSocket', 'Django Channels', 'Celery', 'Celery Canvas', 'chain / chord / group', 'Checkpoint & Resume', 'Idempotent Retry', 'Background Jobs & Scheduling', 'Batch Pipeline (10M+ records)', 'Big Data Processing', 'Data Migration (10M+ rows)', 'Schema-to-Data Migration', 'Cross-model Migration', 'Cross-org Migration', 'Bulk Data Repair', 'Streaming Iterators', 'SQL Optimization', 'Query Plan Analysis', 'N+1 Detection', 'Query Count Gate', 'Async Export (50k rows)', 'Large-file Upload Pipeline', 'Signed URLs', 'Storage IAM', 'Lifecycle Policies', 'Multi-cloud Storage', 'Provider Factory', 'S3 · CloudFront', 'GCS', 'Metadata Filtering', 'Query Scope Control', 'Citation Authorization', 'RAG Pipeline', 'Document Ingestion', 'Multi-format Parsing', 'OCR → Markdown', 'Parser Selection', 'Chunking', 'Pipeline Recovery', 'Reparse & Retry', 'Vector Index', 'Hybrid Search', 'BM25', 'RRF', 'Reranker', 'HyDE', 'Embedding', 'LlamaIndex', 'LLM Streaming', 'LLM Tool Use', 'Vision LLM', 'Batch API', 'Structured Output (Pydantic)', 'Multi-agent Workflow', 'AI Code Review', 'Merge Gate', 'Shared Skills & Rules', 'Claude Code', 'Cursor', 'GitHub Copilot', 'Codex', 'git worktree', 'Evaluation-driven Pipeline', 'Agent Session Measurement', 'OCR Agent', 'AI KM', 'Long-term Memory', 'Row-level Security', 'Docker', 'Docker Compose', 'BuildKit Cache', 'GitHub Actions', 'CI/CD Automation', 'Parallel Test Groups', 'Auto Deployment', 'ECS · ECR', 'Rollback & Health Check', 'EC2', 'RDS', 'ALB', 'Route 53', 'CloudFront', 'Gunicorn', 'Nginx', 'Prometheus', 'Grafana', 'Alertmanager', 'ELK Stack', 'Elasticsearch', 'PostgreSQL', 'MySQL', 'MongoDB', 'RabbitMQ', 'Django', 'Django REST Framework', 'FastAPI', 'Python', '5-phase Security Scanning', 'Tenant Isolation Tests', 'Test Coverage 96%', 'Server-Sent Events', 'ASGI', 'Uvicorn', 'Django Signals', 'Django Middleware', 'Custom Permission Classes', 'Multi-tenant Data Model', 'Tenant-aware Queries', 'Organization Hierarchy', 'OIDC', 'SAML', 'OAuth 2.0', 'JWT', 'Message Queue', 'Task Queue', 'Retry with Backoff', 'Event-driven Design', 'Structured Logging', 'Observability', 'Health Checks', 'Database Indexing', 'Query Optimization', 'Connection Pooling', 'Schema Migration', 'Data Backfill', 'Vector Database', 'Semantic Search', 'Function Calling', 'LLM Evaluation', 'Context Window Management', 'Streaming Responses', 'Embedding Pipeline', 'Rerank Pipeline', 'Prompt Caching', 'Agent Loop', 'Tool Orchestration', 'Test-first Development', 'Merge Gate Automation', 'Docker BuildKit'];
// 固定種子的洗牌：每一輪順序不同，把整面牆堆滿（超出的被裁掉）
const TG_WALL = (() => { const rnd = (s) => () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); const sh = (a, seed) => { const r = rnd(seed), o = [...a]; for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; } return o; }; return [...sh(TG, 7), ...sh(TG, 21), ...sh(TG, 99), ...sh(TG, 5)].map((x) => `<span class="tg">${x}</span>`); })();

const BASE = [
// 1 封面
{ t: '封面', dark: 1, html: () => `
  <div class="cv-bg">
    <div class="cv-band" style="flex:1;min-height:0">${TG_WALL.slice(0, 45).concat(TG_WALL.slice(100, 200)).join('')}</div>
    <div class="cv-hero">
      <div class="cv-band cv-lt">${TG_WALL.slice(45, 70).join('')}</div>
      <div class="cv-id">
        <img src="assets/avatar_pixel.jpg" alt="Hao-Fu 的像素頭像">
        <div class="cv-txt"><h1>張浩富</h1><p class="cv-en">Hao-Fu Chang</p><p class="cv-ti">AI 後端工程師</p></div>
      </div>
      <div class="cv-band cv-rt">${TG_WALL.slice(70, 100).join('')}</div>
    </div>
    <div class="cv-band" style="flex:1;min-height:0">${TG_WALL.slice(200, 365).concat(TG_WALL.slice(0, 45)).join('')}</div>
  </div>` },

// 2 自我介紹
{ t: '自我介紹', html: () => H('自我介紹', '近 3 年，兩家新創的後端') + `
  <div class="bd"><div class="row" style="flex:1;gap:56px">
    <div class="card soft grow rv">
      <div class="cap"><span class="per">2023/09 – 2024/10</span>${ic('book', 'acc')}</div>
      <h3>Wisdome.AI</h3>
      <p class="desc">LLM 教育科技新創，產品是 BrainBox 考試準備 Web App</p>
      <div class="row ctr" style="gap:28px">${sq(5, 2, ['a', ...rep('m', 9)], 34)}<div class="col" style="gap:4px"><b style="font-size:36px">約 10 人團隊</b><span style="font-size:28px;color:var(--acc);font-weight:500">唯一的後端工程師</span></div></div>
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
  <div class="bd" style="gap:18px;min-height:0">
    <figure class="rv" style="margin:0;flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center">${CP_ARCH}</figure>
    <div class="row rv" style="gap:56px;align-items:flex-start">${[
      ['search', '先讀原始碼，畫出完整資料流', '先搞清楚舊系統，才知道哪些邏輯可以共用'],
      ['link', '新舊路徑並存，不必一次重寫', '既有 WebSocket 照常運作'],
      ['chart', 'token 用量與成本計量', 'LLM · Embedding · Reranker，供企業計費'],
    ].map(([i, a, b]) => `<div class="row" style="gap:14px;flex:1">${ic(i, 'acc')}<div><p style="font-size:24px;line-height:1.3">${a}</p><p class="why" style="font-size:20px">${b}</p></div></div>`).join('')}</div>
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
  <div class="bd" style="min-height:0"><figure class="rv" style="margin:0;flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center">${SSO_ARCH}</figure></div>` },

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
  <div class="bd" style="min-height:0"><figure class="rv" style="margin:0;flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center">${CI_ARCH}</figure></div>` },

// 11 AI 開發流程
{ t: 'AI 開發流程', dark: 1, html: () => H('MaiAgent　團隊', '導入 Claude Code 與 Cursor：速度變快，關卡跟上') + `
  <div class="bd" style="gap:26px">
    <div class="row ctr rv" style="gap:0">
      <div class="g2" style="width:420px;gap:12px">${rep(0, 4).map(() => `<div class="node" style="padding:22px;align-items:center"><b style="font-size:26px">repo</b></div>`).join('')}</div>
      ${ar()}${node('12+ 共用 skills 與規則', '跨 4 個 repo，程式風格與架構慣例', 'acc')}${ar()}${node('整個工程團隊', 'Claude Code · Cursor · Copilot', '')}
    </div>
    <div class="rv">${flow([['Pull Request', ''], ['AI Reviewer', 'security · performance · N+1', 'acc'], ['Merge gate', '通過才能合併', 'ink']])}</div>
    ${bl([
      ['zap', 'AI 讓寫程式變快，人工 review 跟不上', '產出變多，品質、安全與效能問題更容易漏過'],
      ['shield', '把檢查變成自動關卡，而不是靠人盯', '開發速度提升後，瓶頸移到 CI，於是優化測試與建置流程'],
    ])}
    <div class="box rv" style="gap:8px"><h4>${ic('code', 'acc')}開發環境</h4>
      <p>引進 uv，管理 Python 套件與虛擬環境</p></div>
  </div>` },

// 12 用量與稽核
{ t: '用量計量與稽核', alt: 1, html: () => H('MaiAgent　企業需求', '用量計量與稽核紀錄') + `
  <div class="bd" style="gap:22px;min-height:0">
    <div class="row" style="gap:40px;flex:1;min-height:0">
      <div class="col grow rv" style="gap:14px;min-width:0">
        <div class="row ctr" style="gap:14px">${ic('chart', 'acc')}<h3 style="font-size:34px">用量計量：誰花了多少 token、多少成本</h3></div>
        <p class="why" style="font-size:22px">每次呼叫計 token → 算成本 → 依組織、使用者、Agent 彙總</p>
        <div class="mk">
          <div class="mk-bar"><i></i><i></i><i></i><b>用量報表</b><span class="mk-pill">本月</span></div>
          <div class="mk-kpi">
            <div><span>總用量</span><b>4.72M</b><small>tokens</small></div>
            <div><span>總成本</span><b class="a">$69.95</b><small>本月累計</small></div>
            <div><span>組織數</span><b>4</b><small>有用量</small></div>
          </div>
          <div class="mk-tabs"><span class="on">組織</span><span>使用者</span><span>Agent</span></div>
          <table class="mk-t"><thead><tr><th>名稱</th><th class="n">LLM</th><th class="n">Embedding</th><th class="n">Reranker</th><th class="n">成本</th><th>占比</th></tr></thead><tbody>
            <tr><td>組織 A</td><td class="n">1.84M</td><td class="n">0.62M</td><td class="n">0.09M</td><td class="n c">$38.20</td><td class="p"><em style="width:84px"></em><i>54.6%</i></td></tr>
            <tr><td>組織 B</td><td class="n">0.97M</td><td class="n">0.31M</td><td class="n">0.04M</td><td class="n c">$19.75</td><td class="p"><em style="width:43px"></em><i>28.2%</i></td></tr>
            <tr><td>組織 C</td><td class="n">0.42M</td><td class="n">0.18M</td><td class="n">0.02M</td><td class="n c">$8.90</td><td class="p"><em style="width:19px"></em><i>12.7%</i></td></tr>
            <tr><td>組織 D</td><td class="n">0.15M</td><td class="n">0.07M</td><td class="n">0.01M</td><td class="n c">$3.10</td><td class="p"><em style="width:7px"></em><i>4.4%</i></td></tr>
          </tbody><tfoot><tr><td>合計</td><td class="n">3.38M</td><td class="n">1.18M</td><td class="n">0.16M</td><td class="n c">$69.95</td><td></td></tr></tfoot></table>
          <p class="mk-note">單位：tokens；數字與成本皆為示意</p>
        </div>
      </div>
      <div class="col grow rv" style="gap:14px;min-width:0">
        <div class="row ctr" style="gap:14px">${ic('file', 'acc')}<h3 style="font-size:34px">稽核紀錄：誰在什麼時候做了什麼</h3></div>
        <p class="why" style="font-size:22px">登入 · API · CRUD 事件 → 記下變更前後差異 → 搜尋與匯出</p>
        <div class="mk">
          <div class="mk-bar"><i></i><i></i><i></i><b>稽核紀錄</b></div>
          <div class="mk-tool"><span class="mk-search">搜尋使用者、事件、對象…</span><span class="mk-btn">匯出</span></div>
          <table class="mk-t"><thead><tr><th>時間</th><th>使用者</th><th>事件</th><th>對象</th></tr></thead><tbody>
            <tr><td>10:42:07</td><td>user_a</td><td><span class="mk-tag">登入</span></td><td>管理後台</td></tr>
            <tr><td>10:43:15</td><td>user_a</td><td><span class="mk-tag a">更新</span></td><td>知識庫權限</td></tr>
            <tr class="df"><td></td><td colspan="3"><span class="mk-diff">變更前後</span>　權限：<s>唯讀</s> → <b>可編輯</b></td></tr>
            <tr><td>10:45:31</td><td>user_b</td><td><span class="mk-tag">API</span></td><td>GET /conversations</td></tr>
            <tr><td>10:47:02</td><td>user_c</td><td><span class="mk-tag">刪除</span></td><td>檔案 sample.pdf</td></tr>
          </tbody></table>
          <p class="mk-note">事件、名稱與時間為示意</p>
        </div>
      </div>
    </div>
    <p class="tag rv">畫面與數字皆為示意，不是真實資料</p>
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
{ t: '交付與部署', alt: 1, html: () => H('MaiAgent　交付', '自動部署與多雲儲存') + `
  <div class="bd" style="min-height:0"><figure class="rv" style="margin:0;flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center">${DP_ARCH}</figure></div>` },

// 15 Wisdome
{ t: 'Wisdome.AI 後端架構', html: () => H('Wisdome.AI　約 10 人團隊，唯一的後端', '從零建起整套後端') + `
  <div class="bd" style="gap:22px;min-height:0">
    <figure class="rv" style="margin:0;flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center">${WD_ARCH}</figure>
    <div class="row rv" style="gap:56px;align-items:flex-start">${[
      ['zap', '先上線 MVP，再依回饋快速迭代', '與前端、ML 工程師、設計師一起做'],
      ['check', '負責測試與 code review', ''],
      ['file', 'API 文件與資料備份', ''],
    ].map(([i, a, b]) => `<div class="row ctr" style="gap:14px;flex:1">${ic(i, 'acc')}<div><p style="font-size:26px;line-height:1.3">${a}</p>${b ? `<p class="why" style="font-size:21px">${b}</p>` : ''}</div></div>`).join('')}</div>
  </div>` },

// 16 獲獎
{ t: '獲獎與發表', dark: 1, html: () => H('2018 → 2025，依時間順序', '獲獎、論文與志工服務') + `
  <div class="bd" style="gap:14px;min-height:0">
    <div class="mz-row rv" style="height:392px">
      <figure class="mz" style="flex:3"><figcaption><span>2018</span>程式職種　全國第四名</figcaption><div class="mz-i"><img src="assets/photo_highschool_2018.jpg" alt="全國高級中等學校商業技藝競賽頒獎" style="object-position:50% 18%"><em>全國商業技藝競賽　台中家商</em></div></figure>
      <figure class="mz" style="flex:4"><figcaption><span>2022</span>陳聰林創毅特別獎</figcaption><div class="mz-i"><img src="assets/award_2022.jpg" alt="2022 全國大專院校產學創新實作競賽頒獎"><em>全國大專院校產學創新實作競賽　圖：工商時報</em></div></figure>
      <figure class="mz" style="flex:5"><figcaption><span>2023.02</span>彰師大資工系專題競賽　第一名（擔任隊長）</figcaption><div class="mz-i"><img src="assets/photo_first_place_2023.jpg" alt="專題競賽第一名合照" style="object-position:50% 55%"></div></figure>
    </div>
    <div class="mz-row rv" style="height:292px">
      <figure class="mz" style="flex:4"><figcaption><span>2023.06</span>國科會大專生研究創作獎　全國 200 名</figcaption><div class="mz-i"><img src="assets/nstc_research_creativity_award.png" alt="國科會大專學生研究創作獎查詢紀錄" style="object-position:0 0;background:#fff"><em>查詢紀錄截圖</em></div></figure>
      <figure class="mz" style="flex:4"><figcaption><span>2024.01</span>MDPI 論文作者</figcaption><div class="mz-i"><img src="assets/mdpi_paper.png" alt="MDPI Machines 論文頁面，作者" style="object-position:0 0;background:#fff"><em>論文頁面截圖</em></div></figure>
      <figure class="mz" style="flex:4"><figcaption><span>2025</span>光復超人　志工後端工程師</figcaption><div class="mz-i mz-col"><img src="assets/guangfu_platform.png" alt="光復超人平台，志工與物資媒合"><div class="mz-s"><img src="assets/guangfu_timeline.png" alt="光復超人階段流程時間軸"><img src="assets/guangfu_meeting.jpg" alt="遠端志工團隊的線上會議"></div></div></figure>
    </div>
  </div>` },
];

// ---------- 講述順序：起點 → 能用 → 敢用 → 撐得住 → 跑得快 ----------
const S = Object.fromEntries(BASE.map((s) => [s.t, s]));

const A = (t) => `<b style="color:var(--acc);font-weight:900">${t}</b>`;
const INTRO = { t: '自我介紹', alt: 1, html: () => H('自我介紹', '我是張浩富，AI SaaS 後端工程師') + `
  <div class="bd"><div class="g4" style="flex:1">${[
    ['book', '背景', `<ul class="bl">${[['彰化師範大學 資訊工程學系', '2019–2023'], ['兩間 B2B AI 公司的後端', '<div style="margin-top:10px"><div style="display:flex;justify-content:space-between;font-size:23px;color:var(--ink)"><b style="color:var(--acc);font-weight:900">0 → 1</b><span>Wisdome.AI</span></div><div style="height:12px;background:var(--paper2);margin-top:6px"><div style="height:100%;width:17%;background:var(--acc)"></div></div></div><div style="margin-top:10px"><div style="display:flex;justify-content:space-between;font-size:23px;color:var(--ink)"><b style="color:var(--acc);font-weight:900">1 → 100</b><span>MaiAgent</span></div><div style="height:12px;background:var(--paper2);margin-top:6px"><div style="height:100%;width:100%;background:var(--acc)"></div></div></div>'], ['LLM 產品的後端全流程', '架構、開發、測試到部署']].map(([a, b]) => `<li><div><p style="font-size:27px">${a}</p><div class="why">${b}</div></div></li>`).join('')}</ul>`],
    ['layers', '做過', `<div class="col" style="gap:7px">${[['Wisdome.AI', [`團隊第 ${A('3')} 人，成長到約 ${A('10')} 人`, '唯一的後端，從零建起整套']], ['MaiAgent', [`團隊第 ${A('7')} 人，成長到 ${A('30+')} 人`, 'RAG 管線與串流 API', '多租戶 RBAC（<b style="color:var(--acc);font-weight:900">103</b> 類權限）', '企業登入與 LDAP 同步', '<b style="color:var(--acc);font-weight:900">10M+</b> 筆資料批次管線', '千萬級資料與 SQL 優化', '用量計量與稽核', '測試、CI 與自動部署']]].map(([h, items]) => `<p style="font-size:24px;font-weight:700;margin-top:6px">${h}</p>` + items.map((x) => `<div style="background:var(--paper2);border-radius:6px;padding:6px 16px;font-size:24px;line-height:1.35">${x}</div>`).join('')).join('')}</div>`],
    ['chart', '貢獻', `<div class="col" style="gap:14px">${[['103', '類權限的多租戶 RBAC'], ['10M+', '筆資料的批次處理'], ['96%', '核心模組測試覆蓋率'], ['−60%', '<span style="font-size:26px;line-height:1.4">CI 時間</span><div style="display:flex;align-items:center;gap:10px;font-size:22px;margin-top:6px"><span style="width:56px">40 分</span><div style="flex:1;height:12px;background:var(--paper2)"><div style="height:100%;width:100%;background:var(--mute)"></div></div></div><div style="display:flex;align-items:center;gap:10px;font-size:22px;margin-top:6px"><span style="width:56px">16 分</span><div style="flex:1;height:12px;background:var(--paper2)"><div style="height:100%;width:40%;background:var(--acc)"></div></div></div>']].map(([a, b]) => `<div class="col" style="gap:0"><b style="font-size:64px;line-height:1.05;color:var(--acc);font-weight:900;letter-spacing:-.03em">${a}</b><span style="font-size:26px;line-height:1.4">${b}</span></div>`).join('')}</div>`],
    ['award', '證明', `<ul class="bl">${[['g', '個人'], ['國科會大專學生研究創作獎', `${A('約前 6%')}，全國 200 名之一`], ['彰師大專題競賽' + A('第一名'), '擔任隊長'], ['光復超人救災媒合平台', '志工後端，花蓮 2025/09–10'], ['MDPI 論文作者', '無人機搜救研究'], ['g', 'MaiAgent 公司'], ['2024 總統盃黑客松優秀團隊', `${A('全國僅 5 隊')}獲獎`], ['金峰獎' + A('十大') + '優良產品', '第 23 屆，中小企業組']].map(([a, b]) => a === 'g' ? `<li style="padding:6px 0 0"><div style="font-size:21px;color:var(--acc);font-weight:700;letter-spacing:.08em">${b}</div></li>` : `<li style="padding:7px 0"><div><p style="font-size:26px;font-weight:500;line-height:1.35">${a}</p><p class="why" style="font-size:23px">${b}</p></div></li>`).join('')}</ul>`],
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
    <div class="col" style="gap:10px"><p class="tag">我負責平台的核心後端</p>${chips(['串流 Completion API', '多租戶 RBAC', 'SSO · LDAP 同步', '稽核與用量計量', '批次資料管線', 'API Key 與 OpenAPI 文件', 'CI/CD'], 'a')}</div>
  </div>` };

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
    ex: flow([['共享 rules', '程式風格與架構慣例'], ['AI Reviewer', 'security · performance · N+1', 'acc'], ['Merge gate', '通過才能合併', 'ink'], ['CI 40 → 16 分', '9 組平行測試與快取']]),
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

// ---------- MaiAgent 平台架構圖（來源：maiagent.ai 官網；紅框為本人標示負責過的部分） ----------
const MA_ARCH = { t: 'MaiAgent 平台架構', n: '官網的全方位企業級 AI 架構圖，紅框是我負責過的部分。先看整體分層，再回到各章節講細節。', html: () => `
  <div class="bd" style="flex-direction:row;align-items:center;gap:56px;min-height:0">
    <div class="hd" style="width:420px;flex:none"><h2 style="font-size:76px;line-height:1.12">MaiAgent<br>平台架構</h2><p class="sub">官網架構圖<br>紅框是我負責過的部分</p></div>
    <div style="flex:1;min-width:0;height:100%;display:flex;align-items:center;justify-content:flex-end">
      <img src="assets/maiagent-architecture.png" alt="MaiAgent 平台架構圖，紅框標示本人負責的項目" style="height:100%;width:auto;max-width:100%;object-fit:contain;border:1px solid var(--line)">
    </div>
  </div>` };

const ORDER = [S['封面'], INTRO, ROAD, S['Wisdome.AI 後端架構'], MA1, MA_ARCH, S['串流 Completion API'], RBT, S['企業登入與 LDAP 同步'], S['用量計量與稽核'], S['10M+ 批次管線'], S['千萬級資料與 SQL'], S['測試與 CI'], S['AI 開發流程'], S['交付與部署'], S['技術地圖'], S['獲獎與發表']];

const RAIL = ['起點', '能用', '敢用', '撐得住', '跑得快'];
const CH = { 'Wisdome.AI 後端架構': '起點', '串流 Completion API': '能用', '知識庫、API 與匯出': '能用', '權限：從組織到資源': '敢用', '企業登入與 LDAP 同步': '敢用', '用量計量與稽核': '敢用', '10M+ 批次管線': '撐得住', '千萬級資料與 SQL': '撐得住', '測試與 CI': '跑得快', 'AI 開發流程': '跑得快', '交付與部署': '跑得快' };

// 講稿提示（按 N 顯示）：開場一句 → 重點 → 轉場
const NOTES = {
  '封面': '一句話：我做企業級 AI 產品的後端。接下來先用一頁讓你知道我是誰，再用五章講我做過的事。',
  '自我介紹': '開場：背景（學什麼、做多久）→ 做過（兩家公司各一句）→ 貢獻（四個數字）→ 證明（獎項與救災志工）。轉場：這些成果，我依「一個企業 AI 產品要走過的順序」來講。',
  '路線圖': '先講結論再展開：五章 = 起點、能用、敢用、撐得住、跑得快。每章回答一個問題。轉場：先從我一個人建產品的起點開始。',
  'Wisdome.AI 後端架構': '重點：約 10 人團隊、我是唯一的後端，所以每一層都要自己選、自己扛。先上線 MVP，再依回饋迭代。轉場：這是 0 到 1；接著是企業級產品怎麼做到「能用」。',
  '串流 Completion API': '重點：這是接到最多客戶、公司最賺錢的功能，我最成功的案例。舊路徑跨好幾層、難整合。我先讀原始碼畫出資料流，再新增 SSE 路徑並與舊路徑並存。重構：從 Async View 裡抽出共用 Service，抽 Interface、做依賴注入，依 SOLID 與 Clean Architecture。轉場：功能能用了，補上客戶日常要用的平台功能。',
  '知識庫、API 與匯出': '快速帶過：知識庫與引用權限、開放 API、非同步匯出、RAG 檢索範圍控制（與同事共同開發）。轉場：能用之後，企業第一個問題是：資料安全嗎？',
  '多租戶 RBAC': '重點：從企業真實運作出發：部門隔離、主管向下看、跨部門共享。QuerySet 層過濾，並以大量測試驗證租戶隔離。轉場：權限有了，要接上企業既有的登入。',
  '企業登入與 LDAP 同步': '重點：客戶不必換登入方式。LDAP 同步是我從零建的，單次最多 50,000 人，用批次、冷卻、排程控制負載。轉場：還有兩件企業一定會問的事：花了多少、誰做了什麼。',
  '用量計量與稽核': '重點：token 用量與成本供企業計費；pghistory 保存變更前後，搜尋與匯出。轉場：企業敢用了，接著是資料量大時要撐得住。',
  '10M+ 批次管線': '重點故事：Worker 一直 OOM，我先試平行化反而更慢，才回頭用 Canvas 切批次、加 checkpoint 與防重複寫入。講「先錯再改」比講結果更有說服力。',
  '千萬級資料與 SQL': '重點：沒有一種寫法適合所有資料，逐案判斷；EXPLAIN 先看計畫；用 CI 的 query count 上限把 N+1 擋在 Merge 前。轉場：系統撐得住，團隊也要能持續快速交付。',
  '測試與 CI': '重點：所有 CI/CD 都自動化（GitHub Actions）。自動檢查：9 組平行測試、N+1、query count 上限、5 階段安全掃描、租戶隔離測試，再由 AI Code Review 把關才能合併。CI 時間從 40 分降到 16 分；我負責寫測試維持穩定，核心模組覆蓋率 96%。長條只表示相對長度。',
  'AI 開發流程': '重點：AI 讓產出變多，所以把檢查做成自動關卡。共享 rules 讓 AI 照團隊慣例寫，AI Reviewer 當 merge gate。另外我也引進了 uv 來管 Python 環境。',
  '交付與部署': '重點：自動部署：PR 自動測試，Merge 後自動部署 Dev 與 Staging，Production 手動上線，部署成功或失敗都會通知 Slack。多雲儲存：先講為什麼（客戶環境不適用 AWS、有地端需求），再講做了什麼（GCS 檔案存取、Signed URL、IAM、Lifecycle、大檔上傳）。地端部署我是協助，不講成主導。轉場：技術總覽。',
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

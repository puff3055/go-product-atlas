// Public product snapshot. Native evidence is fixed to 4511d35, not this worktree's candidates.
export const mapBaseline = '4511d35';
export const pageGroups = [
  { id:'capture', title:'01 · 记录与事情', entry:'Todo 首页', action:'快速输入并提交，或点事情卡片', page:'事情详情／编辑', deeper:'Go；新建岛屿；关联的担忧与状态', note:'快速输入、子任务、日期选择和补充说明属于页内内容。事情详情也被岛屿、历史、聊天结果及回顾页共用，不是多份事情。', evidence:'GoApp.swift: RootView、TaskEditor；ChatPage.swift' },
  { id:'islands', title:'02 · 岛屿与关联', entry:'Todo 的岛屿入口', action:'选择岛屿', page:'岛屿事情列表', deeper:'事情详情；Go；编辑岛屿；新增／查看担忧与状态', note:'新建岛屿另有编辑页面；首页新建保存后进入该岛屿。事情或补记活动中新建岛屿，是为原表单选择归属。担忧与状态可关联多件事情，并可打开关联事情。', evidence:'GoApp.swift: IslandTasksPage、IslandEditorPage；ConcernPages.swift；ActivityPages.swift' },
  { id:'focus', title:'03 · Go 与体验', entry:'Todo／事情详情／岛屿列表', action:'点 Go，开始或打开已有计时', page:'Go', deeper:'时段详情（查看本次记录）', note:'暂停、继续、结束、子任务操作以及结束后的体验填写，均在 Go 页面内。单点“结束”不自动完成事情；明确完成当前事情时，同一事务结束其 Go。', evidence:'GoApp.swift: focusRoute；FocusPage.swift' },
  { id:'history', title:'04 · 记与历史', entry:'记（底部 Tab）', action:'点历史入口', page:'历史', deeper:'消息记录；事情详情（共用）', note:'历史内的“事情／消息”、搜索与日期筛选是页内切换。点消息进入“消息记录”，展开该对话上下文并定位所选消息；点事情打开事情详情。点“新对话”才返回记并开始新的对话。当前不是按一场存档事件汇总的新版历史。', evidence:'GoApp.swift: showHistory；HistoryDrawer.swift: HistoryPage、MessageRecordPage' },
  { id:'review', title:'05 · 报告与足迹', entry:'Todo 的成长报告入口', action:'打开报告，再选择某一天', page:'成长报告 → 当日足迹', deeper:'时段详情；补记活动；活动详情；事情详情', note:'报告中的记录也能直达相应详情。足迹可继续打开时段或活动；活动详情可进入更正活动。层级取决于进入路径，并非所有详情固定是三级页面。时段更正在详情内展开；活动更正使用编辑页面。', evidence:'GoApp.swift: showGrowthReport、footprintDayRoute；FootprintPages.swift；ActivityPages.swift' },
  { id:'settings', title:'06 · 我的与设置', entry:'Todo／记的个人入口', action:'打开我的', page:'我的', deeper:'备份恢复；导出；查看归档；担忧与状态；AI 处理授权', note:'这五项各有设置页面。担忧与状态／归档可继续打开担忧记录；备份导入导出会使用系统文件界面，合并恢复有确认弹窗。AI 授权、密钥配置和连接测试在授权页面内，不代表线上服务已验证可用。', evidence:'GoApp.swift: MyPage；SettingsPage.swift' },
];
export const flows = [
  { id:'record', title:'记录与整理', steps:[['Todo 快速输入','提交后保存一件事情'],['事情卡片','点卡片进入事情详情'],['事情详情','修改名称、日期、岛屿、步骤或补充'],['保存并返回','回到清单找回同一件事情']], note:'当前 0.1.18 的保存按钮仍在表单下方；未保存退出会丢失本次文字修改。右上角保存＋退出气泡是未合并候选，不画成现状。' },
  { id:'act', title:'Go 与反馈', steps:[['选一件事情','点 Go 开始本次行动'],['Go 进行中','暂停不计时；继续重新累计'],['结束 Go','保留本次实际投入，页内展开体验'],['保存体验／返回 Todo','之后从足迹找回本次记录']], note:'“结束一轮”与“完成事情”是两件事。保存体验失败时保留输入并提供重试；不能把失败画成已保存。' },
  { id:'find', title:'历史查找', steps:[['记','点历史入口'],['历史：消息／事情','选择分类、搜索或按日期筛选'],['点结果卡片','消息 → 对话上下文；事情 → 事情详情'],['返回历史','继续查找其他记录']], note:'消息记录页不是直接返回 AI 输入页。“将整场对话手动存档成事件，并汇总产出的待办”是待完善要求，不是当前历史的已实现结构。' },
  { id:'review', title:'报告与足迹', steps:[['成长报告','选区间，再打开某一天'],['当日足迹','点时段／活动；也可补记活动'],['记录详情','查看实际内容、感受及原始／更正版本'],['保存更正并回看','统计采用生效版本，原始记录保留']], note:'补记活动保存后显示活动详情；更正活动保存后返回详情。Go 时段更正在原详情内完成。返回未提交的活动／时段更正会保留草稿，草稿不计入统计。' },
];
const esc = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const productMap = `
<section id="product-map" class="product-map" aria-labelledby="product-map-title">
  <div class="map-heading"><span class="badge">当前实现 · 0.1.18</span><h2 id="product-map-title">产品全景</h2><p>先看入口，再看去向。这里画的是 App 的页面关系；网站仍是一页到底。</p></div>
  <div class="map-overview" aria-label="App 入口总览">
    <div class="map-branch"><span class="map-kicker">一级入口 · 底部 Tab</span><h3>Todo</h3><p>快速记录 · 事情清单</p><div class="map-connector">↓ 从首页进入</div><p class="map-node">事情详情 · 岛屿 · Go<br>成长报告与足迹</p></div>
    <div class="map-branch"><span class="map-kicker">一级入口 · 底部 Tab</span><h3>记</h3><p>原话记录 · AI 整理</p><div class="map-connector">↓ 从记录中找回</div><p class="map-node">历史 → 消息记录<br>整理结果 → 事情详情</p></div>
    <div class="map-branch"><span class="map-kicker">共用入口 · 不是第三个 Tab</span><h3>我的</h3><p>由 Todo／记的个人入口打开</p><div class="map-connector">↓ 管理与设置</div><p class="map-node">备份恢复 · 导出 · 归档<br>担忧与状态 · AI 授权</p></div>
  </div>
  <p class="map-caption">文字总览：Todo 承接事情与行动，记承接原话与整理，两者共用事情详情和个人设置；成长报告再通往足迹与记录详情。</p>
  <div class="map-legend"><span class="map-type">完整页面</span><span class="map-type inline">页内展开／状态</span><span class="map-type system">确认弹窗／系统界面</span><span class="map-type candidate">备选／未实现</span></div>
  <h3>页面地图 · 按入口分组</h3>
  <p class="map-caption">二级、三级表示从某个入口进入的先后，不是固定等级；同一个详情可从多处到达。下列六组全部直接展开。</p>
  <div class="map-groups">${pageGroups.map(g=>`<section class="map-group" id="map-${g.id}" aria-labelledby="map-${g.id}-title"><h4 id="map-${g.id}-title">${esc(g.title)}</h4><ol class="map-route"><li><span class="map-kicker">入口</span><strong>${esc(g.entry)}</strong><small>${esc(g.action)}</small></li><li><span class="map-kicker">进入页面</span><strong>${esc(g.page)}</strong></li><li><span class="map-kicker">可继续到达 · 可能更深</span><strong>${esc(g.deeper)}</strong></li></ol><p>${esc(g.note)}</p></section>`).join('')}</div>
  <section class="map-states" aria-labelledby="map-states-title"><h3 id="map-states-title">这些不是新的页面</h3><div class="map-state-grid"><div><span class="map-type inline">页内展开／状态</span><p>快速输入、步骤编辑、日期控件、历史分类与筛选、Go 结束体验、时段更正与版本查看。空内容、无搜索结果和失败提示也属于状态，不单算页面。</p></div><div><span class="map-type system">确认弹窗／系统界面</span><p>备份合并恢复的确认、系统文件选择与导出界面；发生在原流程里，不是新的产品主入口。锁屏与灵动岛属于系统表面，也不算 App 的三级页面。</p></div></div></section>
  <h3>关键流程 · 操作之后发生什么</h3>
  <div class="map-flows">${flows.map(f=>`<section class="map-flow" id="flow-${f.id}" aria-labelledby="flow-${f.id}-title"><h4 id="flow-${f.id}-title">${esc(f.title)}</h4><ol class="flow-steps">${f.steps.map(([title,action],i)=>`<li><span class="map-step">${i+1}</span><strong>${esc(title)}</strong><span>${esc(action)}</span></li>`).join('')}</ol><p>${esc(f.note)}</p></section>`).join('')}</div>
  <section class="map-future" aria-labelledby="map-future-title"><span class="map-type candidate">备选／未实现 · 不并入现状地图</span><h3 id="map-future-title">下一版想改变什么</h3><p><strong>未合并候选：</strong>事情详情右上保存、退出【保存】【不存】气泡；快速输入长文字滚动。它们不属于当前已安装版本。</p><p><strong>待完善的历史：</strong>用户主动存档一场对话 → 形成事件 → 历史查看完整对话及产生的待办。这是目标流程，不等于现有消息列表。</p><p><strong>3.0 概念关系：</strong>先存下 → 整理理解 → 选择主线 → 行动与接续。出发（暂名）、消化、滋养是工作台设想；跨岛项目与每日主线仍待定义，不画成已确定的二级／三级页面。</p></section>
  <p class="map-caption">依据：0.1.18（20）／4511d35 的页面与导航代码。地图不是一次新的真机或 AI 联通验收；历史 31 张设计图包含状态，不等于 31 个实际页面。</p>
</section>`;

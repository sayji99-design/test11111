
const seed = {
  customers: [
    {id:1,name:"한빛자동화",industry:"산업자동화",contact:"김민수 부장",phone:"010-4821-****",email:"minkim@hanbit.co.kr",grade:"A",lastContact:"2026-06-14",potential:180000000,notes:"생산라인 에너지 효율 개선과 모터 교체 검토 중. 3분기 예산 심의 예정."},
    {id:2,name:"대한정밀",industry:"기계·장비",contact:"박지훈 이사",phone:"010-7113-****",email:"jhpark@daehanp.co.kr",grade:"A",lastContact:"2026-06-12",potential:130000000,notes:"로봇 셀 증설 프로젝트. 기술 검토 자료와 ROI 자료 요청."},
    {id:3,name:"세광에너지",industry:"에너지",contact:"이서연 팀장",phone:"010-9340-****",email:"seoyeon@sekwang.com",grade:"B",lastContact:"2026-06-08",potential:85000000,notes:"배전반 현대화 및 유지보수 계약 관심."},
    {id:4,name:"미래제철",industry:"철강",contact:"정우진 과장",phone:"010-6602-****",email:"wjjeong@mirae-steel.co.kr",grade:"B",lastContact:"2026-05-29",potential:62000000,notes:"인버터 교체 수요. 경쟁사 견적 비교 중."},
    {id:5,name:"동해화학",industry:"화학",contact:"최은지 대리",phone:"010-2891-****",email:"ejchoi@donghaechem.co.kr",grade:"C",lastContact:"2026-05-18",potential:35000000,notes:"안전 규정 변경 이후 설비 진단 필요 가능성."}
  ],
  opportunities: [
    {id:1,customer:"한빛자동화",title:"고효율 모터 교체 프로젝트",stage:"제안",value:180000000,probability:60,owner:"최영복"},
    {id:2,customer:"대한정밀",title:"로봇 셀 증설 패키지",stage:"협상",value:130000000,probability:80,owner:"최영복"},
    {id:3,customer:"세광에너지",title:"배전반 현대화",stage:"발굴",value:85000000,probability:30,owner:"최영복"},
    {id:4,customer:"미래제철",title:"인버터 교체",stage:"제안",value:62000000,probability:50,owner:"최영복"},
    {id:5,customer:"동해화학",title:"설비 진단 서비스",stage:"발굴",value:35000000,probability:20,owner:"최영복"}
  ],
  activities: [
    {id:1,date:"2026-06-17",type:"미팅",customer:"한빛자동화",title:"기술 제안서 설명 및 예산 일정 확인",memo:"오후 2시, 고객 본사 회의실"},
    {id:2,date:"2026-06-18",type:"전화",customer:"대한정밀",title:"최종 가격 조건 협의",memo:"유지보수 옵션 포함 여부 확인"},
    {id:3,date:"2026-06-19",type:"이메일",customer:"세광에너지",title:"레퍼런스 사례 발송",memo:"에너지 업종 유사 구축사례 2건 첨부"},
    {id:4,date:"2026-06-23",type:"제안서",customer:"미래제철",title:"개정 견적서 제출",memo:"납기 단축안 포함"}
  ]
};

let data = JSON.parse(localStorage.getItem("abb-crm-data") || "null") || seed;
let modalMode = "customer";

const won = v => "₩" + Number(v).toLocaleString("ko-KR");
const save = () => localStorage.setItem("abb-crm-data", JSON.stringify(data));
const stages = ["발굴","제안","협상","수주"];

function switchView(id){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===id));
  const titles={dashboard:"영업 대시보드",customers:"고객 관리",opportunities:"영업기회",activities:"영업 활동"};
  document.getElementById("pageTitle").textContent=titles[id];
}
document.querySelectorAll(".nav-item").forEach(b=>b.onclick=()=>switchView(b.dataset.view));
document.querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>switchView(b.dataset.jump));

function render(){
  const total=data.opportunities.filter(o=>o.stage!=="수주").reduce((s,o)=>s+o.value,0);
  document.getElementById("metricCustomers").textContent=data.customers.length;
  document.getElementById("metricOpps").textContent=data.opportunities.filter(o=>o.stage!=="수주").length;
  document.getElementById("metricTasks").textContent=data.activities.length;
  document.getElementById("metricRevenue").textContent=won(total);
  document.getElementById("heroPipeline").textContent=won(total);
  renderPipeline(); renderTasks(); renderCustomers(); renderOpportunities(); renderActivities();
}
function renderPipeline(){
  const max=Math.max(...stages.map(s=>data.opportunities.filter(o=>o.stage===s).reduce((a,b)=>a+b.value,0)),1);
  document.getElementById("pipelineBars").innerHTML=stages.map(stage=>{
    const value=data.opportunities.filter(o=>o.stage===stage).reduce((a,b)=>a+b.value,0);
    return `<div class="pipeline-row"><span>${stage}</span><div class="bar-track"><div class="bar-fill" style="width:${value/max*100}%"></div></div><strong>${won(value)}</strong></div>`;
  }).join("");
}
function renderTasks(){
  document.getElementById("taskList").innerHTML=[...data.activities].sort((a,b)=>a.date.localeCompare(b.date)).slice(0,4).map(a=>{
    const d=new Date(a.date+"T00:00:00");
    return `<div class="task-item"><div class="task-date">${String(d.getDate()).padStart(2,"0")}<span>${d.getMonth()+1}월</span></div><div><strong>${a.title}</strong><small>${a.customer} · ${a.type}</small></div></div>`;
  }).join("");
}
function row(c, detail=true){
  return `<tr><td><strong>${c.name}</strong></td><td>${c.industry}</td><td>${c.contact}</td>${detail?`<td>${c.phone}</td>`:""}<td><span class="badge ${c.grade}">${c.grade}</span></td><td>${c.lastContact}</td><td>${won(c.potential)}</td>${detail?`<td><button class="text-btn" onclick="showCustomer(${c.id})">상세</button></td>`:""}</tr>`;
}
function renderCustomers(){
  const q=(document.getElementById("customerSearch")?.value||"").toLowerCase();
  const g=document.getElementById("gradeFilter")?.value||"";
  const list=data.customers.filter(c=>(!g||c.grade===g)&&[c.name,c.contact,c.industry].join(" ").toLowerCase().includes(q));
  document.getElementById("customerTable").innerHTML=list.map(c=>row(c,true)).join("");
  document.getElementById("dashboardCustomers").innerHTML=[...data.customers].sort((a,b)=>b.potential-a.potential).slice(0,5).map(c=>row(c,false)).join("");
}
document.getElementById("customerSearch").oninput=renderCustomers;
document.getElementById("gradeFilter").onchange=renderCustomers;

function renderOpportunities(){
  document.getElementById("opportunityBoard").innerHTML=stages.map(stage=>{
    const items=data.opportunities.filter(o=>o.stage===stage);
    return `<div class="stage-column"><div class="stage-head"><strong>${stage}</strong><span>${items.length}</span></div>${items.map(o=>`<div class="opp-card"><h4>${o.title}</h4><p>${o.customer}</p><p>담당: ${o.owner}</p><div class="opp-value"><span>${won(o.value)}</span><span>${o.probability}%</span></div></div>`).join("")||"<p style='color:#8a949e;font-size:12px'>등록된 기회가 없습니다.</p>"}</div>`;
  }).join("");
}
function renderActivities(){
  document.getElementById("activityTimeline").innerHTML=[...data.activities].sort((a,b)=>a.date.localeCompare(b.date)).map(a=>`<div class="timeline-item"><h4>${a.title}</h4><div class="timeline-meta">${a.date} · ${a.type} · ${a.customer}</div><p>${a.memo}</p></div>`).join("");
}
window.showCustomer=id=>{
  const c=data.customers.find(x=>x.id===id); if(!c)return;
  const opps=data.opportunities.filter(o=>o.customer===c.name);
  document.getElementById("drawerContent").innerHTML=`<div class="detail-hero"><span>고객 상세</span><h2>${c.name}</h2><p>${c.industry} · 등급 ${c.grade}</p></div>
  <div class="detail-grid"><div class="detail-box"><span>담당자</span><strong>${c.contact}</strong></div><div class="detail-box"><span>연락처</span><strong>${c.phone}</strong></div><div class="detail-box"><span>이메일</span><strong>${c.email}</strong></div><div class="detail-box"><span>최근 접촉</span><strong>${c.lastContact}</strong></div><div class="detail-box"><span>잠재 매출</span><strong>${won(c.potential)}</strong></div><div class="detail-box"><span>영업기회</span><strong>${opps.length}건</strong></div></div>
  <div class="notes"><strong>고객 메모</strong><br>${c.notes}</div>
  <h3 style="margin-top:22px">관련 영업기회</h3>${opps.map(o=>`<div class="detail-box" style="margin-bottom:8px"><span>${o.stage} · 성공확률 ${o.probability}%</span><strong>${o.title}</strong><small>${won(o.value)}</small></div>`).join("")||"<p>등록된 영업기회가 없습니다.</p>"}`;
  document.getElementById("detailDrawer").classList.remove("hidden");
};

function openModal(mode){
  modalMode=mode;
  const title={customer:"신규 고객 등록",opportunity:"영업기회 추가",activity:"영업 활동 추가"}[mode];
  document.getElementById("modalTitle").textContent=title;
  const fields={
    customer:`${field("name","고객사명")}${field("industry","산업군")}${field("contact","담당자")}${field("phone","연락처")}${field("email","이메일","email")}${selectField("grade","등급",["A","B","C"])}${field("lastContact","최근 접촉일","date")}${field("potential","잠재 매출","number")}${area("notes","고객 메모")}`,
    opportunity:`${selectField("customer","고객사",data.customers.map(c=>c.name))}${field("title","기회명")}${selectField("stage","영업 단계",stages)}${field("value","예상 매출","number")}${field("probability","성공 확률(%)","number")}${field("owner","담당자","text","최영복")}`,
    activity:`${field("date","활동일","date")}${selectField("type","활동 유형",["미팅","전화","이메일","제안서","기타"])}${selectField("customer","고객사",data.customers.map(c=>c.name))}${field("title","활동 제목")}${area("memo","상세 메모")}`
  };
  document.getElementById("formFields").innerHTML=fields[mode];
  document.getElementById("modal").classList.remove("hidden");
}
const field=(name,label,type="text",value="")=>`<div class="field"><label>${label}</label><input name="${name}" type="${type}" value="${value}" required></div>`;
const area=(name,label)=>`<div class="field"><label>${label}</label><textarea name="${name}" required></textarea></div>`;
const selectField=(name,label,opts)=>`<div class="field"><label>${label}</label><select name="${name}" required>${opts.map(o=>`<option>${o}</option>`).join("")}</select></div>`;

document.getElementById("addCustomerBtn").onclick=()=>openModal("customer");
document.getElementById("addOpportunityBtn").onclick=()=>openModal("opportunity");
document.getElementById("addActivityBtn").onclick=()=>openModal("activity");
["modalClose","modalCancel"].forEach(id=>document.getElementById(id).onclick=()=>document.getElementById("modal").classList.add("hidden"));
document.getElementById("drawerClose").onclick=()=>document.getElementById("detailDrawer").classList.add("hidden");

document.getElementById("modalForm").onsubmit=e=>{
  e.preventDefault(); const obj=Object.fromEntries(new FormData(e.target).entries());
  ["potential","value","probability"].forEach(k=>{if(k in obj)obj[k]=Number(obj[k])});
  obj.id=Date.now();
  if(modalMode==="customer")data.customers.push(obj);
  if(modalMode==="opportunity")data.opportunities.push(obj);
  if(modalMode==="activity")data.activities.push(obj);
  save(); render(); document.getElementById("modal").classList.add("hidden"); e.target.reset();
};
document.getElementById("exportBtn").onclick=()=>{
  const header=["고객사","산업군","담당자","연락처","이메일","등급","최근접촉","잠재매출"];
  const rows=data.customers.map(c=>[c.name,c.industry,c.contact,c.phone,c.email,c.grade,c.lastContact,c.potential]);
  const csv="\ufeff"+[header,...rows].map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
  const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"})); a.download="abb_korea_customers.csv"; a.click();
};
document.getElementById("todayText").textContent=new Intl.DateTimeFormat("ko-KR",{dateStyle:"full"}).format(new Date());
render();

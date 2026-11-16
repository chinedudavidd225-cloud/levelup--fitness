const $=s=>document.querySelector(s),K='levelup-v1';
const LV=['Beginner','Rookie','Trainee','Fighter','Warrior','Champion','Elite','Legend','Master','Fitness Hero'];
const TH=[0,150,400,750,1200,1800,2600,3600,4900,6500];
const E={ // name, icon, muscles, steps, mistakes, easier, type(r=reps,h=hold)
jj:['Jumping Jacks','🤸','Heart, endurance, coordination','Stand tall, feet together.|Jump feet apart as arms rise overhead.|Jump back and land softly.','Landing on stiff, locked knees.','Step side to side without jumping.','r'],
wp:['Wall Push-Ups','🧱','Chest, shoulders, arms','Stand an arm\u2019s length from a wall.|Hands on the wall at shoulder height.|Bend elbows, bring chest to the wall, push back.','Sagging hips; elbows flaring wide.','Stand closer to the wall.','r'],
kp:['Knee Push-Ups','🙇','Chest, shoulders, triceps, core','Hands under shoulders, knees on the floor.|Keep a straight line from head to knees.|Lower your chest slowly, then push up.','Hips sticking up; rushing.','Go back to wall push-ups.','r'],
pu:['Push-Ups','💥','Chest, shoulders, arms, core','Hands under shoulders, body in a straight line.|Lower slowly with elbows at about 45\u00b0.|Push the floor away.','Dropping hips or neck.','Switch to knee push-ups.','r'],
sq:['Bodyweight Squats','🦵','Thighs, glutes, balance','Feet shoulder-width apart.|Sit your hips back as if onto a chair.|Keep heels down, then stand tall.','Knees caving inward.','Squat down to a chair.','r'],
lu:['Lunges','🚶','Legs, glutes, balance','Step forward with one foot.|Lower your back knee toward the floor.|Push through the front foot to stand. Switch legs.','Wobbling; front knee collapsing in.','Hold a wall and do shallow lunges.','r'],
pl:['Plank','🪵','Core, shoulders','Forearms down, elbows under shoulders.|Body in one straight line.|Breathe. Stop when your form slips.','Hips too high or sagging.','Plank on your knees.','h'],
gb:['Glute Bridges','🌉','Glutes, hamstrings, lower back','Lie on your back, knees bent.|Squeeze glutes and lift hips.|Pause, then lower slowly.','Arching the lower back.','Lift hips only halfway.','r'],
bd:['Bird Dogs','🐕','Core, back, balance','Start on hands and knees.|Reach opposite arm and leg out.|Return and switch sides.','Twisting the hips.','Lift just an arm or just a leg.','r'],
db:['Dead Bugs','🪲','Deep core','Lie on your back, arms up, knees bent over hips.|Slowly lower opposite arm and leg.|Return and switch.','Lower back lifting off the floor.','Move only the legs.','r']};
const W={1:['jj','push','sq','gb','pl'],3:['jj','lu','bd','db','push'],5:['jj','sq','push','lu','pl']};
const PH=[[2,8,15],[2,10,20],[3,10,25]]; // sets, reps, hold seconds
const CH=['Play outside for 20 minutes','Do 20 jumping jacks','Hold a plank for 20 seconds','Do 10 slow squats','Balance on one foot, 20s each side','Do 10 glute bridges','Walk for 10 minutes'];
const MS=[['wu','Warm up for 3 minutes',20],['st','Stretch for 5 minutes',30],['ch','',50],['wa','Drink 6 glasses of water',20],['sl','Sleep 8\u201310 hours tonight',20]];
const ML=['Breakfast','Lunch','Dinner','Snack'],
WHY=['Energy and protein to start the day.','Carbs for energy, protein for muscles, veg for vitamins.','Protein and slow carbs help muscles repair overnight.','Healthy fats and protein keep energy up.'],
ALT=['Cheaper: eggs or beans instead of milk.','Cheaper: beans instead of chicken or fish.','Cheaper: eggs instead of fish.','Cheaper: groundnuts or fruit in season.'],
DN=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
M=[['Pap (ogi) with milk and akara','Rice, beans and fried plantain with vegetables','Yam with egg sauce and spinach','Groundnuts and a banana'],
['Boiled eggs, bread and a glass of milk','Jollof rice with chicken and salad','Moi moi with pap and cucumber','Orange and a handful of groundnuts'],
['Custard or oats with milk and groundnuts','Beans porridge with ripe plantain','Rice with fish stew and vegetables','Boiled sweet potato and pawpaw'],
['Akara with pap','Moi moi, rice and vegetable sauce','Sweet potato with egg and tomato sauce','Yoghurt and groundnuts'],
['Scrambled eggs with yam','Rice, chicken stew and steamed vegetables','Beans with yam and vegetables','Banana and milk'],
['Pap with moi moi','Rice and fish with salad','Chicken pepper soup with yam','Groundnuts and watermelon'],
['Eggs, bread and fruit','Rice, beans and chicken with vegetables','Egg and vegetable sauce with sweet potato','Pawpaw and a glass of milk']];
const cnt=k=>S.hist.filter(h=>h.k===k).length,
actDays=()=>Object.keys(S.log).filter(d=>S.log[d].m.length).length;
const AC=[['First Workout','🥇','Finish 1 workout',()=>cnt('w')>=1],['First 100 XP','⭐','Earn 100 XP',()=>S.xp>=100],
['3-Day Consistency','🔥','Be active 3 days in a row',()=>S.best>=3],['7-Day Challenge','🏅','Be active 7 days in a row',()=>S.best>=7],
['Push-Up Beginner','💪','Finish 5 workouts',()=>cnt('w')>=5],['Core Master','🛡️','Finish 10 workouts',()=>cnt('w')>=10],
['Flexibility Champion','🧘','Do 5 stretch sessions',()=>cnt('st')>=5],['Weekly Warrior','⚔️','Reach a weekly goal (3 workouts)',()=>cnt('wk')>=1],
['30-Day Achievement','👑','Be active on 30 different days',()=>actDays()>=30]];
function td(d=new Date()){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
const fresh=()=>({xp:0,log:{},hist:[],water:{},meals:{},sets:{},ach:[],nick:'Player',start:td(),best:0});
let S;try{S=JSON.parse(localStorage.getItem(K))||fresh()}catch(e){S=fresh()}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}},
esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),
dow=()=>new Date().getDay(),
type=()=>W[dow()]?'w':(dow()==2||dow()==6?'a':'r'),
wk=()=>Math.max(1,Math.min(12,Math.floor((new Date(td())-new Date(S.start))/6048e5)+1)),
ph=()=>Math.ceil(wk()/4)-1,
lvl=()=>{let l=0;TH.forEach((t,i)=>{if(S.xp>=t)l=i});return l},
mon=()=>{const d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7));return d},
mlist=()=>{const t=type();return[t=='w'?['w',"Finish today's workout",100]:['r',t=='a'?'Active play for 20 minutes':'Rest day: relax and recover',t=='a'?40:30],...MS.map(m=>m[0]=='ch'?['ch',CH[dow()],50]:m)]};
let PQ=[],T=null,tab=0;
function streak(){let n=0,d=new Date();const a=x=>(S.log[td(x)]||{m:[]}).m.length>0;if(!a(d))d.setDate(d.getDate()-1);while(a(d)){n++;d.setDate(d.getDate()-1)}S.best=Math.max(S.best||0,n);return n}
function award(id,xp,why,k){const L=(S.log[td()]=S.log[td()]||{m:[]});if(L.m.includes(id))return;const b=lvl();L.m.push(id);S.xp+=xp;S.hist.unshift({d:td(),t:why,x:xp,k});
 if(lvl()>b)PQ.push('⬆️ LEVEL UP!<br>You are now a '+LV[lvl()]+'!');
 streak();AC.forEach(a=>{if(!S.ach.includes(a[0])&&a[3]()){S.ach.push(a[0]);PQ.push('🏆 Unlocked: '+a[0])}});
 const ms=td(mon());if(S.hist.filter(h=>h.k==='w'&&h.d>=ms).length>=3)award('wk'+ms,150,'Weekly goal','wk');save()}
function tick(id){const m=mlist().find(x=>x[0]==id);if(m)award(id,m[2],m[1],id);render()}
function timer(sec,label,cb){if(T)clearInterval(T.iv);T={s:sec,label,cb};T.iv=setInterval(()=>{T.s--;if(T.s<=0)skipT();else drawT()},1000);drawT()}
function drawT(){const e=$('#tb');if(!T){e.hidden=true;return}e.hidden=false;e.innerHTML=T.label+': <b>'+T.s+'s</b><button onclick="skipT()">Skip</button>'}
function skipT(){if(!T)return;const c=T.cb;clearInterval(T.iv);T=null;drawT();c&&c()}
function setDone(id){const d=(S.sets[td()]=S.sets[td()]||{});d[id]=(d[id]||0)+1;save();render();if(d[id]<PH[ph()][0])timer(30,'Rest',()=>{})}
const hold=(id,s)=>timer(s,'Hold, keep breathing',()=>setDone(id));
function finish(){award('w',100,'Workout','w');render()}
function water(n){const w=S.water[td()]||0;S.water[td()]=w==n?n-1:n;if(S.water[td()]>=6)award('wa',20,'Drank water','wa');save();render()}
function meal(i){const a=(S.meals[td()]=S.meals[td()]||[]),j=a.indexOf(i);j<0?a.push(i):a.splice(j,1);save();render()}
function nick(v){S.nick=v.trim().slice(0,16)||'Player';save()}
let fd=(dow()+6)%7;const setFd=i=>{fd=i;render()};
function lvCard(){const l=lvl(),n=TH[l+1],p=n?(S.xp-TH[l])/(n-TH[l])*100:100;
 return `<div class="card lv"><small>Level ${l+1} of 10</small><div class="big">${LV[l]}</div><div class="bar"><i data-w="${p}"></i></div><small>${S.xp} XP${n?' \u00b7 '+(n-S.xp)+' XP to '+LV[l+1]:' \u00b7 Top level!'}</small></div>`}
function missions(){const L=(S.log[td()]||{m:[]}).m;return mlist().map(m=>{const d=L.includes(m[0]);return `<div class="card mi ${d?'done':''}"><span>${d?'✅':'⬜'} ${esc(m[1])}</span><span><small>+${m[2]} XP</small>${d||m[0]=='w'||m[0]=='wa'?'':`<button onclick="tick('${m[0]}')">Done</button>`}</span></div>`}).join('')}
const SAFE='<div class="card safe"><b>Safety first.</b> This app is for learning and fun. It does not replace advice from a doctor or dietitian. Talk to a parent or guardian and a healthcare professional before starting a new exercise plan, especially if you have any health concern. Stop if anything hurts and ask an adult for help. Exercise with an adult nearby when you can.</div>';
function home(){const t=type(),st=streak();return `<h1>Hey, ${esc(S.nick)}</h1>${lvCard()}<div class="row"><div class="card c"><b>🔥 ${st}</b><small>day streak</small></div><div class="card c"><b>Week ${wk()}/12</b><small>Phase ${ph()+1}</small></div><div class="card c"><b>${S.ach.length}/${AC.length}</b><small>trophies</small></div></div><h2>Today: ${{w:'Workout day',a:'Active day',r:'Rest day'}[t]}</h2>${t=='w'?'<button class="btn" onclick="nav(1)">Open today\u2019s workout</button>':''}<h2>Daily missions</h2>${missions()}<small>Rest days count toward your streak. Missed a day? No problem, just start again.</small><h2></h2>${SAFE}`}
function hist(){const h=S.hist.filter(x=>x.k==='w').slice(0,8);return `<h2>Workout history</h2>`+(h.length?h.map(x=>`<div class="card">✅ ${x.d}</div>`).join(''):'<small>Your finished workouts show up here.</small>')}
function train(){const t=type(),P=PH[ph()];
 if(t!='w')return `<h1>${t=='a'?'Active day':'Rest day'}</h1><div class="card">${t=='a'?'Play outside, ride a bike, kick a ball or walk for 20 minutes, then stretch gently.':'Muscles grow while you rest. Relax, eat well and go to bed on time.'}</div>`+hist();
 const ids=W[dow()].map(x=>x=='push'?['wp','kp','pu'][ph()]:x),dn=S.sets[td()]||{},fin=(S.log[td()]||{m:[]}).m.includes('w');let all=true;
 const cards=ids.map(id=>{const e=E[id],h=e[6]=='h',n=dn[id]||0,tg=h?P[2]+'s hold':(id=='jj'?P[1]*2:P[1])+' reps';if(n<P[0])all=false;
  return `<div class="card"><b>${e[1]} ${e[0]}</b> <small>${P[0]} sets \u00d7 ${tg}</small><div class="dots">${'●'.repeat(n)+'○'.repeat(P[0]-n)}</div>${n<P[0]?`<button class="btn" onclick="${h?`hold('${id}',${P[2]})`:`setDone('${id}')`}">${h?'Start '+P[2]+'s hold':'Set '+(n+1)+' done'}</button>`:'<small>All sets done ✅</small>'}<details><summary>How to do it</summary><p><b>Builds:</b> ${e[2]}</p><p>${e[3].split('|').map((s,i)=>(i+1)+'. '+s).join('<br>')}</p><p><b>Avoid:</b> ${e[4]}</p><p><b>Easier:</b> ${e[5]}</p></details></div>`}).join('');
 return `<h1>Workout</h1><small>Week ${wk()} \u00b7 move slowly, rest 30s between sets, stop if anything hurts.</small><div class="card"><b>Warm-up</b><br><small>Arm circles, march on the spot and leg swings for 3 minutes.</small></div>${cards}<div class="card"><b>Cool-down</b><br><small>Gentle stretches for arms, legs and back. Breathe slowly.</small></div><button class="btn" ${all&&!fin?'':'disabled'} onclick="finish()">${fin?'Workout complete ✅':'Finish workout +100 XP'}</button>`+hist()}
function food(){const dn=(S.meals[td()]||[]),w=S.water[td()]||0,today=fd==(dow()+6)%7;
 return `<h1>Food</h1><div class="chips">${DN.map((d,i)=>`<button class="${i==fd?'on':''}" onclick="setFd(${i})">${d.slice(0,3)}</button>`).join('')}</div>${M[fd].map((m,i)=>`<div class="card"><label><input type="checkbox" style="width:auto" ${today?'':'disabled'} ${dn.includes(i)&&today?'checked':''} onchange="meal(${i})"> <b>${ML[i]}:</b> ${m}</label><br><small>${WHY[i]} ${ALT[i]}</small></div>`).join('')}
 <h2>Water</h2><div class="card"><div class="chips">${[1,2,3,4,5,6,7,8].map(n=>`<button class="${n<=w?'on':''}" onclick="water(${n})">💧</button>`).join('')}</div><small>${w} glasses today. Sip through the day.</small></div>
 <h2>Eating tips</h2><div class="card"><small>Eat 3 meals and 1\u20132 snacks every day. Eating enough is part of getting stronger.<br>Protein: eggs, beans, fish, chicken, milk, groundnuts.<br>Carbs for energy: rice, yam, sweet potato, plantain, pap.<br>Healthy fats: groundnuts and fish. Add vegetables and fruit daily.<br>Sleep 8\u201310 hours: that is when your body recovers and grows.<br>Ask a parent or healthcare professional for personal food advice.</small></div>`}
function stats(){const m=mon(),days=[...Array(7)].map((_,i)=>{const d=new Date(m);d.setDate(m.getDate()+i);return (S.log[td(d)]||{m:[]}).m.length>0});
 return `<h1>Progress</h1>${lvCard()}<div class="row"><div class="card c"><b>${cnt('w')}</b><small>workouts</small></div><div class="card c"><b>${S.best}</b><small>best streak</small></div></div><h2>This week</h2><div class="card w">${days.map((a,i)=>`<div class="${a?'on':''}"><i></i>${DN[i][0]}</div>`).join('')}</div><h2>Levels reached</h2><div class="card"><small>${LV.slice(0,lvl()+1).join(' \u2192 ')}</small></div><h2>XP history</h2>${S.hist.slice(0,12).map(h=>`<div class="card mi"><span>${esc(h.t)} <small>${h.d}</small></span><b>+${h.x}</b></div>`).join('')||'<small>Complete a mission to earn your first XP.</small>'}`}
function trophies(){return `<h1>Trophies</h1>`+AC.map(a=>{const u=S.ach.includes(a[0]);return `<div class="card ${u?'':'lock'}"><b>${u?a[1]:'🔒'} ${a[0]}</b><br><small>${a[2]}</small></div>`}).join('')}
function me(){return `<h1>Player</h1>${lvCard()}<div class="card"><small>Nickname</small><input value="${esc(S.nick)}" maxlength="16" onchange="nick(this.value)"></div><div class="card"><small>Total XP ${S.xp} \u00b7 Workouts ${cnt('w')} \u00b7 Challenges ${cnt('ch')} \u00b7 Active days ${actDays()}</small></div>${SAFE}<button class="btn" style="background:#3a1d1d;color:#ff9b9b" onclick="askReset()">Reset progress</button>`}
function pop(h){const p=$('#pop');p.innerHTML=`<div class="pc">${h}<button class="btn" onclick="closePop()">OK</button></div>`;p.hidden=false}
const closePop=()=>{$('#pop').hidden=true};
const askReset=()=>{$('#pop').innerHTML='<div class="pc"><p>Reset all progress?</p><small>XP, streaks, trophies and history will be erased.</small><button class="btn" onclick="closePop()">Keep my progress</button><button class="btn" style="background:#3a1d1d;color:#ff9b9b" onclick="doReset()">Yes, reset</button></div>';$('#pop').hidden=false};
function doReset(){S=fresh();save();closePop();render()}
const TABS=[['Home','🏠'],['Train','💪'],['Food','🍽️'],['Stats','📊'],['Trophies','🏆'],['Me','👤']];
function nav(i){tab=i;render();scrollTo(0,0)}
function render(){$('#app').innerHTML=[home,train,food,stats,trophies,me][tab]();
 $('#nav').innerHTML=TABS.map((t,i)=>`<button class="${i==tab?'on':''}" onclick="nav(${i})"><span>${t[1]}</span>${t[0]}</button>`).join('');
 document.querySelectorAll('[data-w]').forEach(e=>requestAnimationFrame(()=>e.style.width=e.dataset.w+'%'));
 if(PQ.length){pop(PQ.map(m=>`<p>${m}</p>`).join(''));PQ=[]}}
render();

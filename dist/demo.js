// A deliberately browser-local interaction illustration, not a native-app replica.
const form=document.querySelector('#demo-form');
if(form){
 const list=document.querySelector('#demo-list'),status=document.querySelector('#demo-status');
 const tasks=[];
 function render(){list.replaceChildren();for(const task of tasks){const li=document.createElement('li');const label=document.createElement('span');label.textContent=(task.done?'✓ ':'○ ')+task.text;const button=document.createElement('button');button.type='button';button.textContent=task.done?'撤销完成':'标记完成';button.setAttribute('aria-label',button.textContent+'：'+task.text);button.onclick=()=>{task.done=!task.done;render();status.textContent='演示状态已更新，不会同步到 App。'};li.append(label,button);list.append(li);}}
 form.addEventListener('submit',e=>{e.preventDefault();const input=form.elements.namedItem('task');const text=input.value.trim();if(!text){status.textContent='先写下一件事情。';input.focus();return;}tasks.push({text,done:false});input.value='';render();status.textContent='已加入本页演示清单；刷新页面即清空。';input.focus();});
 document.querySelector('#demo-reset').onclick=()=>{tasks.length=0;render();status.textContent='演示已重置。';};
}

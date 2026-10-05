import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pageGroups,flows,mapBaseline} from './product-map.mjs';
const root=path.resolve('dist');
const files=fs.readdirSync(root,{recursive:true}).filter(f=>fs.statSync(path.join(root,f)).isFile());
const pages=files.filter(f=>f.endsWith('.html'));
let links=0,images=0;
for(const file of pages){const html=fs.readFileSync(path.join(root,file),'utf8');assert.match(html,/<html lang="zh-CN">/);assert.match(html,/<h1>/);for(const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){const url=match[1];assert.ok(url.startsWith('/'),'Assets and navigation must be same-origin: '+url);const pathname=url.split('?')[0];const target=pathname==='/'?'index.html':pathname.slice(1);assert.ok(fs.existsSync(path.join(root,target)),`${file}: missing ${url}`);links++;}for(const match of html.matchAll(/<img\b[^>]*>/g)){assert.match(match[0],/alt="[^" ]+/);images++;}assert.doesNotMatch(html,/\/Users\/|sk-[a-zA-Z0-9_-]{12,}|PRIVATE KEY|00008150|github\.com\/puff|api\.deepseek/);}
assert.equal(pages.length,56);
const read=fs.readFileSync(path.join(root,'read.html'),'utf8');
const ids=[...read.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,'No duplicated sections or IDs');
assert.equal((read.match(/class="empty-gallery"/g)||[]).length,1);
assert.match(fs.readFileSync(path.join(root,'style.css'),'utf8'),/body main img\{max-height:min\(440px,60vh\)!important/);
assert.doesNotMatch(read,/<script|<iframe|<details|display:none/);
assert.equal(fs.readFileSync(path.join(root,'index.html'),'utf8'),read);
for(const file of pages){const content=fs.readFileSync(path.join(root,file),'utf8');assert.equal(content,read);for(const m of content.matchAll(/href="#([^"]+)"/g))assert.ok(content.includes(`id="${m[1]}"`));assert.doesNotMatch(content,/href="\/(?:pages|ip|current|alternatives|reference|empty-states|read)/);}
assert.equal((read.match(/<article id=/g)||[]).length,48);
for(const term of ['候选代码','未合并','3.0','未实现','保存','不存'])assert.ok(read.includes(term),term);
const assets=JSON.parse(fs.readFileSync(path.join(root,'asset-provenance.json'),'utf8')).assets;
assert.equal(assets.length,50);assert.equal(new Set(assets.map(a=>a.asset)).size,50);
for(const term of ['IP 角色与品牌','缺省、空状态与异常反馈','ChatGPT 需要点击吗'])assert.ok(read.includes(term),term);
const plain=fs.readFileSync(path.join(root,'reading.txt'),'utf8');
assert.equal(mapBaseline,'4511d35');
assert.equal(pageGroups.length,6);assert.equal(flows.length,4);
assert.ok(read.indexOf('id="product-map"')<read.indexOf('id="current"'));
assert.match(read,/href="\/style.css\?v=[a-f0-9]{12}"/);
const markdown=fs.readFileSync('READING.md','utf8');
for(const item of [...pageGroups,...flows]){for(const output of [read,plain,markdown])assert.ok(output.includes(item.title),`Missing map content: ${item.title}`);}
for(const term of ['页内展开／状态','确认弹窗／系统界面','不是第三个 Tab','未合并候选','不是按一场存档事件汇总'])assert.ok(plain.includes(term),term);
for(const match of read.matchAll(/<h3>([^<]+)<\/h3>/g))assert.ok(plain.includes(match[1].replaceAll('&amp;','&')), 'Text companion must preserve each section');
console.log(JSON.stringify({passed:true,pages:pages.length,checkedLinks:links,imageUsesWithAlt:images,uniqueAssets:assets.length,staticFullReading:true,secretAndLocalPathScan:true}));

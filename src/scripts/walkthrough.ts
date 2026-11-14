import { animateStage } from './motion';
import { element } from './dom';

const stages = [
  {label:'INPUT RECEIVED',heading:'Meet Meadow House.',copy:'A fictional care provider arrives in a researched spreadsheet, together with a company identifier, source evidence and campaign details.',key:'COMPANY',value:'Meadow House · demonstration only',key2:'STATUS',value2:'Waiting for checks',note:'A file is the starting point, not permission to send.'},
  {label:'CHECKS BEFORE OUTREACH',heading:'One company. One history.',copy:'The example finds a published email source and no earlier contact in the shared history. It prepares an outreach record for the campaign, subject to the sending rules.',key:'SOURCE',value:'Published address · mailbox unverified',key2:'QUEUE',value2:'Waiting for a permitted sending window',note:'A real history match or opt-out would stop new outreach.'},
  {label:'INTEREST DETECTED',heading:'“Yes, please send the brief.”',copy:'A consultancy reply is linked to the original conversation. Interest stops the cold follow-up sequence and the explicit request makes the proposal step eligible.',key:'REPLY',value:'Interested · brief requested',key2:'FOLLOW-UPS',value2:'Stopped for this company',note:'Interest is a conversation, not a reason to keep chasing.'},
  {label:'REQUESTED DOCUMENT',heading:'The right brief. In context.',copy:'The system prepares a branded eight-page proposal using the campaign details and approved plans and prices, and records the requested response in the company history.',key:'DOCUMENT',value:'Personalised proposal · approved template',key2:'HISTORY',value2:'Requested response recorded',note:'This is an illustration. No PDF or email has been sent.'}
];
let activeStage = 0;
const tabs = [...document.querySelectorAll<HTMLButtonElement>('[data-stage]')];
function showStage(index: number, focus = false) {
  activeStage = index;
  const data = stages[index];
  for (const [id, value] of Object.entries({'demo-label':data.label,'demo-heading':data.heading,'demo-copy':data.copy,'record-key':data.key,'record-value':data.value,'record-key-2':data.key2,'record-value-2':data.value2,'demo-note':data.note,'demo-counter':`0${index + 1} / 04`})) element(id).textContent = value;
  tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  element('demo-panel').setAttribute('aria-labelledby', `stage-${index}`);
  element('demo-next').innerHTML = index === stages.length - 1 ? 'Start again <span aria-hidden="true">↻</span>' : 'Next step <span aria-hidden="true">→</span>';
  animateStage();
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showStage(index));
  tab.addEventListener('keydown', event => {
    let next: number | undefined;
    if (event.key === 'ArrowRight') next = (index + 1) % stages.length;
    if (event.key === 'ArrowLeft') next = (index + stages.length - 1) % stages.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = stages.length - 1;
    if (next !== undefined) { event.preventDefault(); showStage(next, true); }
  });
});
element('demo-next').addEventListener('click', () => showStage((activeStage + 1) % stages.length));

const caseStudy = element<HTMLDialogElement>('case-study');
element<HTMLButtonElement>('case-open').addEventListener('click', () => {caseStudy.showModal(); document.body.classList.add('modal-open');});
element('case-close').addEventListener('click', () => caseStudy.close());
element('case-contact').addEventListener('click', () => caseStudy.close());
caseStudy.addEventListener('close', () => document.body.classList.remove('modal-open'));
caseStudy.addEventListener('click', event => {
  if (event.target !== caseStudy) return;
  const box = caseStudy.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) caseStudy.close();
});


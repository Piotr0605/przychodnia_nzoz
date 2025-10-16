// Rok w stopce
document.querySelectorAll('#year').forEach(n => n.textContent = new Date().getFullYear());

// Drawer
const drawer = document.getElementById('drawer');
const backdrop = document.getElementById('backdrop');
const openBtn = document.getElementById('openDrawer');
const closeBtn = document.getElementById('closeDrawer');

function openDrawer(){
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden','false');
  openBtn?.setAttribute('aria-expanded','true');
  backdrop.hidden = false;
}
function closeDrawer(){
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden','true');
  openBtn?.setAttribute('aria-expanded','false');
  backdrop.hidden = true;
}

openBtn?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', closeDrawer);
window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeDrawer(); });

// A11y toggles
document.getElementById('toggleHC')?.addEventListener('click', ()=>document.body.classList.toggle('high-contrast'));
document.getElementById('toggleFS')?.addEventListener('click', ()=>document.body.classList.toggle('big-font'));

// Tabs
const tablists = document.querySelectorAll('[data-tabs]');
tablists.forEach(wrapper=>{
  const tabs = wrapper.querySelectorAll('[role="tab"]');
  const panels = wrapper.querySelectorAll('.tab-panel');

  function activate(i){
    tabs.forEach((t,idx)=>{
      const selected = idx===i;
      t.setAttribute('aria-selected', String(selected));
      panels[idx].classList.toggle('is-active', selected);
      if(selected) panels[idx].removeAttribute('tabindex'); else panels[idx].setAttribute('tabindex','-1');
    });
  }
  tabs.forEach((tab, i)=>{
    tab.addEventListener('click', ()=>activate(i));
    tab.addEventListener('keydown', (e)=>{
      if(['ArrowRight','ArrowLeft'].includes(e.key)){
        e.preventDefault();
        const dir = e.key==='ArrowRight' ? 1 : -1;
        const next = (i + dir + tabs.length) % tabs.length;
        tabs[next].focus(); activate(next);
      }
    });
  });
  activate(0);
});
// --- Zamykanie panelu bocznego po kliknięciu linku ---
document.querySelectorAll('.drawer-nav a').forEach(link => {
  link.addEventListener('click', () => {
    const drawer = document.getElementById('drawer');
    const backdrop = document.getElementById('backdrop');

    drawer.classList.remove('open');
    backdrop.hidden = true;

    // Aktualizacja atrybutów dostępności
    document.getElementById('openDrawer').setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  });
});

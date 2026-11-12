import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight, CalendarDays, Check, CheckCircle2, ChevronRight,
  CircleDollarSign, Clock3, Compass, Luggage, MapPin, Palmtree,
  Plane, Sparkles, Users, Wallet, Waves, ClipboardCheck, Sun,
  Camera, Umbrella, Menu, MoreHorizontal, Moon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nossa viagem | Porto de Galinhas" },
      { name: "description", content: "Organize os detalhes da sua viagem em um só lugar." },
    ],
  }),
  component: Index,
});

const navigation = [
  { label: "Visão geral", icon: Compass, active: true },
  { label: "Financeiro", icon: Wallet },
  { label: "Roteiro", icon: CalendarDays },
  { label: "Checklist", icon: ClipboardCheck },
  { label: "Informações", icon: Luggage },
];

const pending = [
  { title: "Definir o transfer", detail: "Aeroporto do Recife → hospedagem", color: "coral", tag: "Prioridade" },
  { title: "Conferir a tábua de marés", detail: "Piscinas naturais · 15 de fevereiro", color: "blue", tag: "Passeio" },
  { title: "Preparar a mala da criança", detail: "Roupas, documentos e itens essenciais", color: "gold", tag: "Checklist" },
];

const itinerary = [
  { date: "14", month: "FEV", day: "Domingo", title: "Chegada ao paraíso", detail: "Desembarque, transfer e check-in", icon: Plane, tone: "coral" },
  { date: "15", month: "FEV", day: "Segunda", title: "Piscinas naturais", detail: "Passeio no melhor horário da maré", icon: Waves, tone: "blue" },
  { date: "16", month: "FEV", day: "Terça", title: "Dia em Muro Alto", detail: "Mar calmo e tempo para relaxar", icon: Umbrella, tone: "green" },
];

function Index() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div data-theme={darkMode ? "dark" : "light"} className={`min-h-screen transition-colors duration-300 ${darkMode ? "theme-dark bg-[#102329] text-[#e6f0eb]" : "bg-[#f5f3ed] text-[#203b3b]"}`}>
      <style>{`\n        .theme-dark main { background: #102329; }\n        .theme-dark main > section:not(.trip-hero), .theme-dark main > div > section { background-color: #1b3035 !important; border-color: #30474a !important; color: #e6f0eb !important; }\n        .theme-dark main section:not(.trip-hero) h3 { color: #edf5ef !important; }\n        .theme-dark main section:not(.trip-hero) p { color: #b6c9c1 !important; }\n        .theme-dark main section:not(.trip-hero) .bg-\\[\\#fcfbf8\\] { background: #223b3f !important; }\n        .theme-dark main section:not(.trip-hero) button { background: #28544d; color: #e9f4eb; }\n        .theme-dark main section:not(.trip-hero) [class*=border-] { border-color: #30474a; }\n        .theme-dark main footer { color: #8da69b; }\n        .theme-dark nav.fixed { background: rgba(20,42,47,.96); border-color: #30474a; }\n        .theme-dark nav.fixed a { color: #a9c2b8; }\n        .theme-dark nav.fixed a:first-child { color: #6fd0bd; }\n      `}</style>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[250px] flex-col bg-[#123f42] px-5 py-7 text-white lg:flex">
        <a href="/" className="mb-12 flex items-center gap-3 px-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5b76c] text-[#16484a] shadow-lg shadow-black/10"><Palmtree size={23} /></span>
          <span><span className="block text-[16px] font-bold tracking-tight">Nossa viagem</span><span className="mt-0.5 block text-[11px] text-[#a9c9c3]">Memórias começam aqui</span></span>
        </a>
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#79a49b]">Sua jornada</p>
        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            return <a key={item.label} href="#" className={`group flex items-center gap-3 rounded-2xl px-3.5 py-3.5 text-[13px] transition-all ${item.active ? "bg-[#f3b66f] font-bold text-[#174649] shadow-lg shadow-black/10" : "font-medium text-[#c2d9d2] hover:bg-white/10 hover:text-white"}`}><Icon size={18} strokeWidth={2.1} />{item.label}{item.active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#174649]" />}</a>;
          })}
        </nav>
        <div className="mt-auto overflow-hidden rounded-[22px] border border-white/10 bg-[#1b5354] p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5b76c] text-[#174649]"><Sparkles size={18} /></div>
          <p className="text-sm font-bold">Já dá para sentir o verão?</p>
          <p className="mt-1.5 text-xs leading-5 text-[#b4d0c7]">Tudo organizado por aqui para vocês só aproveitarem quando chegar a hora.</p>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#f5c58c]"><Sun size={13} /> Fevereiro, estamos chegando</div>
        </div>
      </aside>

      <main className="mx-auto max-w-[1500px] px-4 pb-28 pt-5 sm:px-7 lg:ml-[250px] lg:px-10 lg:pb-12 lg:pt-8">
        <header className="mb-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5b76c] text-[#174649]"><Palmtree size={21} /></span>
            <span className="text-sm font-bold">Nossa viagem</span>
          </div>
          <div className="hidden lg:block"><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8a9b91]">Quinta-feira, 12 de novembro</p><h1 className="mt-1 text-[27px] font-extrabold tracking-tight text-[#183f40]">Oi! Que bom ter você por aqui <span className="text-[#e99b55]">✦</span></h1></div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden rounded-full border border-[#e5dfd2] bg-white/80 px-3 py-2 text-xs font-semibold text-[#71847a] sm:inline-flex sm:items-center sm:gap-2"><span className="h-2 w-2 rounded-full bg-[#62a77b]" /> Planejamento em andamento</span>
            <button type="button" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? "Ativar tema claro" : "Ativar tema escuro"} aria-pressed={darkMode} className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition hover:-translate-y-0.5 hover:shadow-md ${darkMode ? "border-[#466267] bg-[#1b3035] text-[#f6cc8e]" : "border-[#e8e1d5] bg-white text-[#49635b]"}`}>{darkMode ? <Sun size={17} /> : <Moon size={17} />}<span className="hidden sm:inline">{darkMode ? "Modo claro" : "Modo escuro"}</span></button>
            <button aria-label="Mais opções" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8e1d5] bg-white text-[#49635b] transition hover:-translate-y-0.5 hover:shadow-md"><MoreHorizontal size={20} /></button>
          </div>
        </header>

        <section className="trip-hero relative mb-6 min-h-[300px] overflow-hidden rounded-[30px] bg-[#087f83] text-white shadow-[0_18px_45px_-28px_rgba(9,94,91,.65)] sm:min-h-[320px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(255,220,151,.42),transparent_25%),linear-gradient(112deg,#075c62_0%,#078b8b_52%,#54b6a2_100%)]" />
          <div className="absolute -right-10 -top-28 h-[370px] w-[370px] rounded-full border border-white/15" />
          <div className="absolute right-8 top-[-78px] h-[280px] w-[280px] rounded-full border border-white/15" />
          <div className="absolute bottom-[-130px] right-[18%] h-[260px] w-[520px] rotate-[-12deg] rounded-[50%] bg-[#f5bd75]/20 blur-[1px]" />
          <div className="absolute bottom-[-150px] right-[-3%] h-[230px] w-[480px] rotate-[9deg] rounded-[50%] bg-[#f8d69c]/25" />
          <div className="absolute right-[17%] top-10 hidden h-20 w-20 rounded-full bg-[#ffd88f] shadow-[0_0_65px_22px_rgba(255,216,143,.18)] sm:block" />
          <div className="relative z-10 flex min-h-[300px] flex-col justify-between p-6 sm:min-h-[320px] sm:p-9 lg:flex-row lg:items-end lg:p-10">
            <div className="max-w-[620px]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.14em] text-[#e1f5e9] backdrop-blur-sm"><MapPin size={13} /> Pernambuco · Brasil</div>
              <p className="mb-1 text-sm font-medium text-[#c6eee1]">O destino da vez é...</p>
              <h2 className="text-[36px] font-black leading-[1.02] tracking-[-.04em] sm:text-[52px]">Porto de<br className="sm:hidden" /> Galinhas<span className="text-[#ffd18b]">.</span></h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#d9f1e8] sm:text-[15px]">Dias de sol, mar quentinho e histórias boas para guardar.</p>
              <div className="mt-6 flex flex-wrap gap-2.5 text-xs font-semibold">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-3.5 py-2.5 backdrop-blur"><CalendarDays size={15} />14–19 fev 2027</span>
                <span className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-3.5 py-2.5 backdrop-blur"><Users size={15} />4 viajantes</span>
              </div>
            </div>
            <div className="mt-7 flex items-center gap-4 self-start rounded-2xl border border-white/20 bg-[#064f55]/35 px-4 py-3 backdrop-blur-md lg:mb-1 lg:mt-0">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffd18b] text-[#14575a]"><Sun size={23} /></div>
              <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#bfe7db]">Faltam só</p><p className="text-[25px] font-black leading-none">94 <span className="text-xs font-semibold">dias</span></p></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15"><div className="h-full w-[38%] rounded-r-full bg-[#ffd18b]" /></div>
        </section>

        <section className="mb-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
          <SummaryCard icon={CircleDollarSign} label="Orçamento previsto" value="R$ 5.500" note="Planejamento inicial" tone="gold" />
          <SummaryCard icon={CheckCircle2} label="Reservas principais" value="2 de 3" note="Voos e hospedagem pagos" tone="green" />
          <SummaryCard icon={Users} label="Quem vai viajar" value="4 pessoas" note="3 adultos + 1 criança" tone="coral" />
          <SummaryCard icon={Clock3} label="Tempo de viagem" value="6 dias" note="5 noites para aproveitar" tone="blue" />
        </section>

        <div className="mb-7 grid grid-cols-1 gap-5 2xl:grid-cols-[1.08fr_.92fr]">
          <section className="rounded-[26px] border border-[#eae4d8] bg-white p-5 shadow-[0_8px_30px_-24px_rgba(37,62,50,.3)] sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div><div className="mb-1 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#d28a4e]"><span className="h-1.5 w-1.5 rounded-full bg-[#e99b55]" /> Para resolver</div><h3 className="text-xl font-extrabold tracking-tight text-[#1d4140]">Deixe tudo redondinho</h3><p className="mt-1 text-xs text-[#87958a]">O que falta para viajar sem preocupação</p></div>
              <span className="rounded-xl bg-[#fff0df] px-3 py-2 text-xs font-extrabold text-[#b96f36]">03 abertas</span>
            </div>
            <div className="space-y-2.5">
              {pending.map((item) => <div key={item.title} className="group flex items-center gap-3 rounded-2xl border border-[#f0eee8] bg-[#fcfbf8] p-3 transition hover:border-[#d7e6dc] hover:bg-[#f8fbf7]">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color === "coral" ? "bg-[#fff0e8] text-[#d87954]" : item.color === "blue" ? "bg-[#e8f5f5] text-[#278d91]" : "bg-[#fff5dc] text-[#c18b35]"}`}><ClipboardCheck size={18} /></span>
                <div className="min-w-0 flex-1"><p className="truncate text-[13px] font-bold text-[#284744]">{item.title}</p><p className="mt-1 truncate text-[11px] text-[#89968d]">{item.detail}</p></div>
                <span className="hidden rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#9b8c76] sm:inline">{item.tag}</span>
                <ChevronRight size={17} className="shrink-0 text-[#b0b9ae] transition group-hover:translate-x-0.5 group-hover:text-[#328b79]" />
              </div>)}
            </div>
            <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#eaf4ed] px-4 py-2.5 text-xs font-extrabold text-[#28745e] transition hover:bg-[#dceee2]">Abrir checklist <ArrowUpRight size={15} /></button>
          </section>

          <section className="overflow-hidden rounded-[26px] border border-[#eae4d8] bg-white p-5 shadow-[0_8px_30px_-24px_rgba(37,62,50,.3)] sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div><div className="mb-1 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#29939a]"><span className="h-1.5 w-1.5 rounded-full bg-[#36a8a5]" /> Um gostinho do que vem aí</div><h3 className="text-xl font-extrabold tracking-tight text-[#1d4140]">Primeiros dias</h3><p className="mt-1 text-xs text-[#87958a]">Roteiro inicial da viagem</p></div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f5f2] text-[#258b86]"><CalendarDays size={19} /></span>
            </div>
            <div className="space-y-0">
              {itinerary.map((item, index) => {
                const Icon = item.icon;
                return <div key={item.date} className="flex gap-3">
                  <div className="flex w-[48px] shrink-0 flex-col items-center"><div className={`flex h-[48px] w-[48px] flex-col items-center justify-center rounded-[15px] ${item.tone === "coral" ? "bg-[#fff0e8] text-[#d87954]" : item.tone === "blue" ? "bg-[#e7f5f5] text-[#278d91]" : "bg-[#edf5e9] text-[#60915e]"}`}><span className="text-[17px] font-black leading-none">{item.date}</span><span className="mt-0.5 text-[8px] font-extrabold tracking-widest">{item.month}</span></div>{index < itinerary.length - 1 && <span className="my-1 h-7 w-px border-l border-dashed border-[#d6ded5]" />}</div>
                  <div className="min-w-0 flex-1 pb-4 pt-0.5"><p className="text-[9px] font-extrabold uppercase tracking-[.14em] text-[#9aa59b]">{item.day}</p><p className="mt-1 text-[13px] font-extrabold text-[#284744]">{item.title}</p><p className="mt-1 text-[11px] text-[#89968d]">{item.detail}</p></div>
                  <span className="mt-2 text-[#7d9d8d]"><Icon size={17} /></span>
                </div>;
              })}
            </div>
            <div className="mt-1 flex items-start gap-2 rounded-xl bg-[#f2f8f5] px-3.5 py-3 text-[10px] leading-4 text-[#6d877a]"><Sparkles size={14} className="mt-0.5 shrink-0 text-[#32958a]" />Sugestões flexíveis: vamos ajustar os passeios conforme a maré, o clima e o ritmo da família.</div>
          </section>
        </div>

        <section className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr]">
          <div className="flex items-center gap-4 rounded-[22px] bg-[#f4dfc4] p-5 text-[#714e31]">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff2df] text-[#c17e3d]"><Camera size={22} /></span>
            <div><p className="text-sm font-extrabold">Colecione momentos</p><p className="mt-1 text-[11px] leading-4 text-[#8b6949]">Um espaço para guardar ideias, lugares e lembranças da viagem.</p></div>
            <ArrowUpRight size={18} className="ml-auto shrink-0 text-[#b17a48]" />
          </div>
          <div className="flex items-center gap-4 rounded-[22px] bg-[#dceee7] p-5 text-[#285e50]">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0faf4] text-[#348a72]"><Luggage size={22} /></span>
            <div><p className="text-sm font-extrabold">Tudo no seu tempo</p><p className="mt-1 text-[11px] leading-4 text-[#5e8274]">Voos e hospedagem já estão pagos. Agora é organizar os detalhes.</p></div>
            <Check size={18} className="ml-auto shrink-0 text-[#348a72]" />
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] font-medium text-[#9aa399]"><span>Feito para planejar com calma e viajar com alegria ☀</span><span>Valores e roteiro são referências editáveis</span></footer>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-[#e6e1d7] bg-[#fffefa]/95 px-1 py-2 backdrop-blur-xl lg:hidden">
        {navigation.map((item) => { const Icon = item.icon; return <a key={item.label} href="#" className={`flex flex-col items-center gap-1 py-1 text-[9px] ${item.active ? "font-extrabold text-[#16847e]" : "font-semibold text-[#8b9990]"}`}><Icon size={19} strokeWidth={item.active ? 2.5 : 1.8} />{item.label}</a>; })}
      </nav>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, note, tone }: { icon: typeof Wallet; label: string; value: string; note: string; tone: "gold" | "green" | "coral" | "blue" }) {
  const tones = {
    gold: "bg-[#fff2dc] text-[#bd8438]",
    green: "bg-[#e4f2e7] text-[#468b63]",
    coral: "bg-[#ffede5] text-[#d77956]",
    blue: "bg-[#e5f3f4] text-[#328e94]",
  };
  return <div className="group rounded-[22px] border border-[#eae4d8] bg-white p-4 shadow-[0_8px_26px_-25px_rgba(37,62,50,.35)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_15px_30px_-22px_rgba(37,62,50,.35)] sm:p-5">
    <div className="mb-3 flex items-center justify-between gap-2"><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#89968d]">{label}</p><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}><Icon size={18} /></span></div>
    <p className="text-[22px] font-black tracking-tight text-[#234442] sm:text-[25px]">{value}</p><p className="mt-1 text-[10px] font-medium text-[#9aa49b]">{note}</p>
  </div>;
}

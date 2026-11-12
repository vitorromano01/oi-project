import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, CalendarDays, CheckCircle2, CircleDollarSign, Clock3,
  MapPin, Plane, Plus, Users, Wallet, Waves, ClipboardList, Info,
  LayoutDashboard, Menu, MoreHorizontal, ChevronRight,
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
  { label: "Visão geral", icon: LayoutDashboard, active: true },
  { label: "Financeiro", icon: Wallet },
  { label: "Roteiro", icon: CalendarDays },
  { label: "Checklist", icon: ClipboardList },
  { label: "Informações", icon: Info },
];

const pending = [
  { title: "Definir transfer do aeroporto", detail: "Recife → Porto de Galinhas", tag: "Prioridade alta" },
  { title: "Conferir tábua de marés", detail: "Piscinas naturais · 15/02", tag: "Antes da viagem" },
  { title: "Organizar itens da criança", detail: "Documentos e mala", tag: "Checklist" },
];

const itinerary = [
  { date: "14 FEV", day: "Domingo", title: "Chegada e acomodação", detail: "Aeroporto do Recife · Check-in", icon: Plane },
  { date: "15 FEV", day: "Segunda", title: "Piscinas naturais", detail: "Passeio conforme a maré", icon: Waves },
  { date: "16 FEV", day: "Terça", title: "Praia de Muro Alto", detail: "Dia de praia em família", icon: MapPin },
];

function Index() {
  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#202923]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-[#e8ece7] bg-white px-5 py-7 lg:flex">
        <a href="/" className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e6f0e8] text-[#34734b]"><Waves size={21} /></div>
          <div><p className="text-[15px] font-semibold tracking-tight">Nossa viagem</p><p className="text-xs text-[#879189]">Planeje com leveza</p></div>
        </a>
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.16em] text-[#9aa39c]">Menu principal</p>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return <a key={item.label} href="#" className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${item.active ? "bg-[#edf4ee] font-semibold text-[#34734b]" : "text-[#69756d] hover:bg-[#f5f7f4]"}`}><Icon size={18} />{item.label}</a>;
          })}
        </nav>
        <div className="mt-auto rounded-2xl bg-[#f5f7f3] p-4">
          <div className="mb-2 flex items-center gap-2 text-[#34734b]"><Info size={16} /><span className="text-xs font-semibold">Dica de planejamento</span></div>
          <p className="text-xs leading-5 text-[#748078]">Deixe reservas e documentos importantes reunidos na área de informações.</p>
        </div>
      </aside>

      <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-6 sm:px-8 lg:ml-64 lg:px-10 lg:pb-10 lg:pt-10">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-sm text-[#849087]">Seu espaço de planejamento</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-[30px]">Visão geral</h1>
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-[#e5eae4] bg-white px-3 py-2.5 text-sm font-medium text-[#536057] shadow-sm transition hover:bg-[#f8faf7]"><MoreHorizontal size={18} /><span className="hidden sm:inline">Opções da viagem</span></button>
        </header>

        <section className="relative mb-7 overflow-hidden rounded-[26px] bg-[#244f3b] p-6 text-white sm:p-8">
          <div className="absolute -right-12 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-2 -top-14 h-56 w-56 rounded-full border border-white/10" />
          <div className="relative max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-[#e0eee3]"><MapPin size={13} /> Pernambuco, Brasil</div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Porto de Galinhas</h2>
            <p className="mt-2 text-sm text-[#d0e0d4] sm:text-base">Uma viagem para aproveitar cada momento juntos.</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#e2eee4]">
              <span className="inline-flex items-center gap-2"><CalendarDays size={16} />14 – 19 de fevereiro de 2027</span>
              <span className="inline-flex items-center gap-2"><Users size={16} />3 adultos e 1 criança</span>
            </div>
          </div>
          <div className="relative mt-7 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#dcebdd] px-3 py-1.5 text-xs font-semibold text-[#28583d]">Viagem planejada</span>
            <span className="text-xs text-[#c3d7c8]">6 dias · 5 noites</span>
          </div>
        </section>

        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard icon={CircleDollarSign} label="Orçamento previsto" value="R$ 5.500" note="Valor de referência" />
          <SummaryCard icon={CheckCircle2} label="Reservas principais" value="2 de 3" note="Voos e hospedagem pagos" />
          <SummaryCard icon={Users} label="Viajantes" value="4 pessoas" note="3 adultos · 1 criança" />
          <SummaryCard icon={Clock3} label="Duração" value="6 dias" note="5 noites de viagem" />
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_.95fr]">
          <section className="rounded-[22px] border border-[#e8ece7] bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div><h3 className="font-semibold">Pendências importantes</h3><p className="mt-1 text-xs text-[#8a958d]">Pequenos passos para deixar tudo pronto</p></div>
              <span className="rounded-full bg-[#fff3df] px-2.5 py-1 text-xs font-semibold text-[#9a6b25]">3 abertas</span>
            </div>
            <div className="space-y-3">
              {pending.map((item) => <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-[#fafbf9] p-3.5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#73917b]"><ClipboardList size={17} /></span>
                <div className="min-w-0 flex-1"><p className="text-sm font-medium">{item.title}</p><p className="mt-1 text-xs text-[#8a958d]">{item.detail}</p><span className="mt-2 inline-block text-[10px] font-medium text-[#a17b42]">{item.tag}</span></div>
                <ChevronRight className="mt-2 shrink-0 text-[#aab3ac]" size={17} />
              </div>)}
            </div>
            <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#34734b] hover:text-[#244f3b]">Ver checklist completo <ArrowRight size={16} /></button>
          </section>

          <section className="rounded-[22px] border border-[#e8ece7] bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div><h3 className="font-semibold">Prévia do roteiro</h3><p className="mt-1 text-xs text-[#8a958d]">Os primeiros dias da viagem</p></div>
              <button className="text-sm font-semibold text-[#34734b]">Ver roteiro</button>
            </div>
            <div className="space-y-0">
              {itinerary.map((item, index) => {
                const Icon = item.icon;
                return <div key={item.date} className="flex gap-3">
                  <div className="flex w-12 shrink-0 flex-col items-center"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ee] text-[#34734b]"><Icon size={18} /></span>{index < itinerary.length - 1 && <span className="my-1 h-9 w-px bg-[#e5ebe5]" />}</div>
                  <div className="min-w-0 flex-1 pb-5"><p className="text-[10px] font-semibold tracking-wide text-[#829087]">{item.date} · {item.day}</p><p className="mt-1 text-sm font-semibold">{item.title}</p><p className="mt-1 text-xs text-[#8a958d]">{item.detail}</p></div>
                </div>;
              })}
            </div>
            <div className="rounded-xl bg-[#f5f8f4] px-3.5 py-3 text-xs leading-5 text-[#748078]">Os passeios são sugestões iniciais e podem ser ajustados conforme clima, maré e disposição do grupo.</div>
          </section>
        </div>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 text-xs text-[#9aa39c]"><span>Nossa viagem · Seu planejamento em um só lugar</span><span>Informações ilustrativas e editáveis</span></footer>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-[#e7ece6] bg-white/95 px-1 py-2 backdrop-blur lg:hidden">
        {navigation.map((item) => { const Icon = item.icon; return <a key={item.label} href="#" className={`flex flex-col items-center gap-1 py-1 text-[10px] ${item.active ? "font-semibold text-[#34734b]" : "text-[#8a958d]"}`}><Icon size={19} />{item.label}</a>; })}
      </nav>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, note }: { icon: typeof Wallet; label: string; value: string; note: string }) {
  return <div className="rounded-[20px] border border-[#e8ece7] bg-white p-5">
    <div className="mb-4 flex items-center justify-between"><p className="text-xs font-medium text-[#849087]">{label}</p><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0f5f0] text-[#568064]"><Icon size={18} /></span></div>
    <p className="text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-[#929c94]">{note}</p>
  </div>;
}

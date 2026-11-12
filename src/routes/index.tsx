import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight, CalendarDays, Check, CheckCircle2, ChevronLeft, ChevronRight,
  CircleDollarSign, Clock3, Compass, Luggage, MapPin, Palmtree,
  Plane, Sparkles, Users, Wallet, Waves, ClipboardCheck, Sun,
  Camera, Umbrella, Menu, MoreHorizontal, Moon, PiggyBank, Bookmark, Utensils, MapPinned, Compass as CompassIcon, Coffee, Heart, Plus,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nossa viagem | Porto de Galinhas" },
      { name: "description", content: "Organize os detalhes da sua viagem em um só lugar." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { aba?: "restaurantes" } =>
    search["aba"] === "restaurantes" ? { aba: "restaurantes" } : {},
  component: Index,
});

const navigation = [
  { label: "Visão geral", icon: Compass, active: true },
  { label: "Financeiro", icon: Wallet },
  { label: "Roteiro", icon: CalendarDays },
  { label: "Checklist", icon: ClipboardCheck },
  { label: "Informações", icon: Luggage },
  { label: "Dicas", icon: Bookmark },
];

const pending = [
  { title: "Definir o aluguel do carro", detail: "Retirada no aeroporto do Recife", color: "coral", tag: "Prioridade" },
  { title: "Conferir a tábua de marés", detail: "Piscinas naturais · 15 de fevereiro", color: "blue", tag: "Passeio" },
  { title: "Preparar a mala da criança", detail: "Roupas, documentos e itens essenciais", color: "gold", tag: "Checklist" },
];

const itinerary = [
  { date: "14", month: "FEV", day: "Domingo", title: "Chegada ao paraíso", detail: "Retirada do carro alugado e check-in", icon: Plane, tone: "coral" },
  { date: "15", month: "FEV", day: "Segunda", title: "Piscinas naturais", detail: "Passeio no melhor horário da maré", icon: Waves, tone: "blue" },
  { date: "16", month: "FEV", day: "Terça", title: "Dia em Muro Alto", detail: "Mar calmo e tempo para relaxar", icon: Umbrella, tone: "green" },
];

const checklistGroups = [{"title":"Roupas — adultos","icon":"👕","items":[["adult-swim","Roupas de banho (maiô, biquíni ou sunga)"],["adult-beach","Saídas de praia e roupas leves para usar na praia"],["adult-day","Camisetas, regatas e blusas leves para o dia a dia"],["adult-shorts","Shorts, bermudas, vestidos e roupas confortáveis"],["adult-night","Roupas para jantar e passeios à noite"],["adult-underwear","Roupas íntimas e meias"],["adult-sleep","Pijamas e roupa confortável para dormir"],["adult-shoes","Chinelos, sandálias e um calçado confortável"],["adult-sport","Roupa confortável para caminhada ou passeio"],["adult-extra","Uma troca extra e uma peça leve de frio"]]},{"title":"Roupas — criança (3 anos)","icon":"🧒","items":[["child-swim","Maiôs/sungas e roupas de banho extras"],["child-uv","Camisetas com proteção UV e roupa com proteção solar"],["child-beach","Roupas leves para praia e piscina"],["child-day","Conjuntos e trocas para todos os dias (levar extras)"],["child-night","Uma ou duas opções para sair à noite"],["child-underwear","Cuecas/calcinhas e meias em quantidade extra"],["child-sleep","Pijamas"],["child-shoes","Chinelos, sandálias e calçado confortável"],["child-hat","Chapéu ou boné com proteção para o sol"],["child-towel","Toalha ou roupão infantil"]]},{"title":"Praia e piscina","icon":"🏖️","items":[["beach-towels","Toalhas de praia"],["beach-bag","Bolsa ou mochila de praia"],["beach-sunscreen","Protetor solar adequado para adultos"],["beach-kid-sunscreen","Protetor solar infantil adequado à idade"],["beach-after","Pós-sol ou hidratante"],["beach-hats","Bonés, chapéus e óculos de sol"],["beach-shade","Canga ou esteira"],["beach-water","Garrafas de água reutilizáveis"],["beach-toys","Brinquedos de praia para a criança"],["beach-wet","Sacola para roupas molhadas e saco impermeável para eletrônicos"]]},{"title":"Higiene e cuidados pessoais","icon":"🧴","items":[["care-tooth","Escovas, creme dental e fio dental"],["care-bath","Shampoo, condicionador e sabonete"],["care-deo","Desodorante e itens de cuidados pessoais"],["care-hair","Pente/escova e acessórios de cabelo"],["care-skin","Hidratante e protetor labial"],["care-repel","Repelente adequado para adultos e criança"],["care-wipes","Lenços umedecidos e lenços de papel"],["care-diaper","Fraldas ou itens de desfralde, se ainda utilizar"],["care-bag","Necessaire e organizadores de mala"]]},{"title":"Saúde e conforto da criança","icon":"🩹","items":[["kid-meds","Medicamentos de uso habitual e receitas, se houver"],["kid-thermo","Termômetro"],["kid-firstaid","Itens básicos de primeiros socorros"],["kid-comfort","Objeto de conforto para dormir (naninha ou brinquedo)"],["kid-snacks","Copos, talheres infantis e lanchinhos para o trajeto"],["kid-car-seat","Confirmar cadeirinha infantil adequada no carro alugado"]]},{"title":"Documentos, eletrônicos e viagem","icon":"🎒","items":[["trip-docs","Documentos de identificação de todos"],["trip-child-docs","Documentos da criança e autorização, se necessária"],["trip-bookings","Comprovantes de voos e hospedagem"],["trip-car","Reserva do carro, CNH do condutor e cartão exigido pela locadora"],["trip-chargers","Celulares e carregadores"],["trip-power","Power bank e adaptadores, se necessário"],["trip-headphones","Fones de ouvido e entretenimento para o trajeto"],["trip-bags","Malas, mochilas e etiquetas de identificação"],["trip-glasses","Óculos de grau/lentes e estojo, se utilizarem"]]}] as const;


function Index() {
  const { aba } = Route.useSearch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState(aba ? "Dicas" : "Visão geral");
  const [travelMoneyGoal, setTravelMoneyGoal] = useState(5500);
  const [savedMoney, setSavedMoney] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const checklistTotal = checklistGroups.reduce((total, group) => total + group.items.length, 0);
  const checklistDone = Object.values(checkedItems).filter(Boolean).length;
  const checklistProgress = checklistTotal ? Math.round((checklistDone / checklistTotal) * 100) : 0;
  const remainingMoney = Math.max(0, travelMoneyGoal - savedMoney);
  const savingsProgress = travelMoneyGoal > 0 ? Math.min(100, (savedMoney / travelMoneyGoal) * 100) : 0;
  const money = (value:number) => value.toLocaleString("pt-BR", {style:"currency",currency:"BRL"});
  const goToSection = (label: string) => {
    setActiveSection(label);
    if (aba) void navigate({ to: "/", search: {}, replace: true });
  };
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
            return <a key={item.label} href="#" onClick={(event) => {event.preventDefault();goToSection(item.label);}} aria-current={activeSection===item.label?"page":undefined} className={`group flex items-center gap-3 rounded-2xl px-3.5 py-3.5 text-[13px] transition-all ${activeSection===item.label ? "bg-[#f3b66f] font-bold text-[#174649] shadow-lg shadow-black/10" : "font-medium text-[#c2d9d2] hover:bg-white/10 hover:text-white"}`}><Icon size={18} strokeWidth={2.1} />{item.label}{activeSection===item.label && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#174649]" />}</a>;
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
          <div className="hidden lg:block"><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8a9b91]">Nossa viagem · Porto de Galinhas</p><h1 className="mt-1 text-[27px] font-extrabold tracking-tight text-[#183f40]">{activeSection==="Visão geral"?<>Oi! Que bom ter você por aqui <span className="text-[#e99b55]">✦</span></>:activeSection}</h1></div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden rounded-full border border-[#e5dfd2] bg-white/80 px-3 py-2 text-xs font-semibold text-[#71847a] sm:inline-flex sm:items-center sm:gap-2"><span className="h-2 w-2 rounded-full bg-[#62a77b]" /> Planejamento em andamento</span>
            <button type="button" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? "Ativar tema claro" : "Ativar tema escuro"} aria-pressed={darkMode} className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition hover:-translate-y-0.5 hover:shadow-md ${darkMode ? "border-[#466267] bg-[#1b3035] text-[#f6cc8e]" : "border-[#e8e1d5] bg-white text-[#49635b]"}`}>{darkMode ? <Sun size={17} /> : <Moon size={17} />}<span className="hidden sm:inline">{darkMode ? "Modo claro" : "Modo escuro"}</span></button>
            <button aria-label="Mais opções" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8e1d5] bg-white text-[#49635b] transition hover:-translate-y-0.5 hover:shadow-md"><MoreHorizontal size={20} /></button>
          </div>
        </header>


        {activeSection === "Financeiro" ? (
          <div className="space-y-6">
            <section className="rounded-[28px] bg-gradient-to-br from-[#075c62] via-[#078b8b] to-[#54b6a2] p-6 text-white shadow-lg sm:p-8">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div><span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em]"><Wallet size={13}/> Cofrinho da viagem</span><h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Vamos juntar para viajar!</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#d9f1e8]">Acompanhe quanto vocês querem levar, quanto já guardaram e quanto falta juntar.</p></div>
                <div className="min-w-[210px] rounded-2xl border border-white/20 bg-[#064f55]/35 p-4"><label htmlFor="travel-money-goal" className="text-[10px] font-bold uppercase tracking-wider text-[#c6eee1]">Meta de dinheiro para levar</label><div className="mt-1 flex items-center gap-2"><span className="text-lg font-bold">R$</span><input id="travel-money-goal" type="number" min="0" step="50" value={travelMoneyGoal} onChange={(e)=>setTravelMoneyGoal(Math.max(0,Number(e.target.value)))} className="w-full min-w-0 border-b border-white/40 bg-transparent py-1 text-2xl font-black text-white outline-none focus:border-[#ffd18b]"/></div></div>
              </div>
            </section>
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-[22px] border border-[#eae4d8] bg-white p-5"><p className="text-[10px] font-extrabold uppercase tracking-wider text-[#89968d]">Meta para levar</p><p className="mt-2 text-2xl font-black text-[#234442]">{money(travelMoneyGoal)}</p><p className="mt-1 text-[11px] text-[#9aa49b]">Objetivo total da viagem</p></div>
              <div className="rounded-[22px] border border-[#dcebe0] bg-[#f3faf4] p-5"><p className="text-[10px] font-extrabold uppercase tracking-wider text-[#609477]">Valor já guardado</p><div className="mt-2 flex items-center gap-1"><span className="text-sm font-bold text-[#347a58]">R$</span><input aria-label="Valor já guardado" type="number" min="0" step="10" value={savedMoney} onChange={(e)=>setSavedMoney(Math.max(0,Number(e.target.value)))} className="w-full min-w-0 border-b border-[#b9d8c1] bg-transparent text-2xl font-black text-[#347a58] outline-none focus:border-[#347a58]"/></div><p className="mt-1 text-[11px] text-[#7e9c89]">Atualize conforme forem juntando</p></div>
              <div className="rounded-[22px] border border-[#f0e4d8] bg-[#fff8f0] p-5"><p className="text-[10px] font-extrabold uppercase tracking-wider text-[#b78354]">Valor restante</p><p className="mt-2 text-2xl font-black text-[#a96c3b]">{money(remainingMoney)}</p><p className="mt-1 text-[11px] text-[#a88d73]">{savedMoney>=travelMoneyGoal?"Meta alcançada!":"Quanto falta guardar"}</p></div>
            </section>
            <section className="rounded-[26px] border border-[#eae4d8] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-wider text-[#29939a]">Progresso da economia</p><h3 className="mt-1 text-xl font-extrabold text-[#1d4140]">A viagem está cada vez mais perto</h3></div><span className="rounded-xl bg-[#e6f5f2] px-3 py-2 text-sm font-black text-[#258b86]">{Math.round(savingsProgress)}%</span></div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#edf2eb]"><div className="h-full rounded-full bg-gradient-to-r from-[#16847e] to-[#70b99b] transition-all duration-300" style={{width:`${savingsProgress}%`}}/></div>
              <div className="mt-3 flex justify-between gap-3 text-[11px] font-semibold text-[#89968d]"><span>{money(savedMoney)} guardados</span><span>{money(travelMoneyGoal)} de meta</span></div>
            </section>
            <section className="rounded-[26px] border border-[#dcebe0] bg-[#f5faf4] p-5 sm:p-6"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e1f1e5] text-[#43865c]"><PiggyBank size={20}/></span><div><h3 className="text-sm font-extrabold text-[#31564b]">Um passo de cada vez</h3><p className="mt-1 text-xs leading-5 text-[#718779]">Defina a meta de quanto pretendem levar e atualize o valor guardado sempre que separarem dinheiro para a viagem. O valor restante e o progresso são calculados automaticamente.</p></div></div></section>
            <p className="px-1 text-[10px] leading-5 text-[#9aa399]">Os valores são editáveis nesta tela, mas ainda ficam apenas nesta sessão do navegador. A gravação permanente e a sincronização serão implementadas na etapa de persistência.</p>
          </div>

        ) : activeSection === "Dicas" ? (
          aba === "restaurantes" ? (
            <div className="space-y-6">
              <div className="px-1">
                <Link to="/" search={{}} className="inline-flex items-center gap-1.5 rounded-xl border border-[#e5dfd2] bg-white px-3 py-2 text-xs font-bold text-[#49635b] transition hover:-translate-y-0.5 hover:shadow-md"><ChevronLeft size={15} /> Voltar para Dicas</Link>
              </div>
              <RestaurantsPanel />
            </div>
          ) : (
          <div className="space-y-6">
            <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#075c62] via-[#078b8b] to-[#54b6a2] p-6 text-white shadow-lg sm:p-8">
              <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border border-white/15" />
              <div className="absolute -bottom-24 right-[18%] h-56 w-56 rounded-full bg-[#f5bd75]/15 blur-sm" />
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em]"><Bookmark size={13}/> Cantinhos para descobrir</span>
                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Boas dicas fazem a viagem.</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#d9f1e8]">Guarde aqui restaurantes, praias, passeios e lugares especiais que vocês não querem deixar de conhecer em Porto de Galinhas.</p>
              </div>
              <span className="absolute bottom-6 right-7 hidden rotate-[-10deg] text-7xl opacity-20 sm:block">✦</span>
            </section>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {title:"Restaurantes",detail:"Onde comer bem, preços e pratos favoritos",icon:Utensils,tone:"coral",count:"Ideias para salvar"},
                {title:"Praias e piscinas",detail:"Praias, piscinas naturais e melhores horários",icon:Waves,tone:"blue",count:"Lugares para conhecer"},
                {title:"Passeios",detail:"Experiências, buggy, jangada e aventuras",icon:MapPinned,tone:"green",count:"Experiências"},
                {title:"Cafés e lojinhas",detail:"Cafés, sobremesas, feirinhas e compras",icon:Coffee,tone:"gold",count:"Achadinhos"},
              ].map((category) => {
                const Icon = category.icon;
                const cardClass = "rounded-[23px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md";
                const cardBody = (
                  <>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${category.tone==="coral"?"bg-[#ffede5] text-[#d77956]":category.tone==="blue"?"bg-[#e5f3f4] text-[#328e94]":category.tone==="green"?"bg-[#e4f2e7] text-[#468b63]":"bg-[#fff2dc] text-[#bd8438]"}`}><Icon size={20}/></div>
                  <h3 className="mt-4 text-base font-extrabold text-[#234442]">{category.title}</h3>
                  <p className="mt-1 min-h-10 text-xs leading-5 text-[#89968d]">{category.detail}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#f0eee8] pt-3"><span className="text-[10px] font-bold text-[#9aa49b]">{category.count}</span><span className="text-[#32958a]"><ArrowUpRight size={16}/></span></div>
                  </>
                );
                if (category.title === "Restaurantes") {
                  return <Link key={category.title} to="/" search={{ aba: "restaurantes" }} className={cardClass}>{cardBody}</Link>;
                }
                return <section key={category.title} className={cardClass}>{cardBody}</section>;
              })}
            </div>

          </div>
          )
        ) : activeSection === "Checklist" ? (
          <div className="space-y-6">
            <section className="rounded-[28px] bg-gradient-to-br from-[#075c62] via-[#078b8b] to-[#54b6a2] p-6 text-white shadow-lg sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div><span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em]"><ClipboardCheck size={13}/> Preparativos da viagem</span><h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Tudo pronto para fazer as malas?</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#d9f1e8]">Confira roupas, itens de praia, cuidados da criança e documentos. Marque o que já compraram ou já têm.</p></div>
                <div className="rounded-2xl border border-white/20 bg-[#064f55]/35 p-4 sm:min-w-[190px]"><p className="text-[10px] font-bold uppercase tracking-wider text-[#c6eee1]">Preparativos resolvidos</p><p className="mt-1 text-3xl font-black">{checklistDone}<span className="text-base font-semibold text-[#c6eee1]"> / {checklistTotal}</span></p><p className="mt-1 text-xs text-[#d9f1e8]">{checklistProgress}% concluído</p></div>
              </div>
              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-[#ffd18b] transition-all duration-300" style={{width:`${checklistProgress}%`}}/></div>
            </section>
            <div className="flex flex-wrap items-center justify-between gap-2 px-1"><div><h3 className="text-lg font-extrabold text-[#234442]">Lista de compras e organização</h3><p className="mt-1 text-xs text-[#89968d]">Totalmente marcável — desmarque se precisar voltar a comprar ou separar.</p></div><span className="rounded-full bg-[#e6f5f2] px-3 py-1.5 text-xs font-bold text-[#258b86]">{checklistTotal - checklistDone} pendentes</span></div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {checklistGroups.map((group) => {
                const done = group.items.filter(([id]) => checkedItems[id]).length;
                return <section key={group.title} className="rounded-[24px] border border-[#eae4d8] bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f5f2] text-xl">{group.icon}</span><div><h3 className="text-sm font-extrabold text-[#234442]">{group.title}</h3><p className="mt-1 text-[10px] text-[#89968d]">{done} de {group.items.length} resolvidos</p></div></div><span className="rounded-lg bg-[#f2f7f2] px-2.5 py-1.5 text-[10px] font-extrabold text-[#43865c]">{Math.round(done / group.items.length * 100)}%</span></div>
                  <div className="space-y-1.5">
                    {group.items.map(([id, label]) => <label key={id} className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 transition ${checkedItems[id] ? "border-[#dcebe0] bg-[#f3faf4]" : "border-[#f0eee8] bg-[#fcfbf8] hover:border-[#d7e6dc]"}`}>
                      <input type="checkbox" checked={!!checkedItems[id]} onChange={(event)=>setCheckedItems((current)=>({...current,[id]:event.target.checked}))} className="mt-0.5 h-4 w-4 shrink-0 accent-[#16847e]" />
                      <span className={`text-xs leading-5 ${checkedItems[id] ? "font-medium text-[#789084] line-through" : "font-semibold text-[#36534b]"}`}>{label}</span>
                      {checkedItems[id] && <Check size={15} className="ml-auto mt-0.5 shrink-0 text-[#43865c]"/>}
                    </label>)}
                  </div>
                </section>;
              })}
            </div>
            <p className="px-1 text-[10px] leading-5 text-[#9aa399]">Dica: a lista é uma base completa para 3 adultos e uma criança de 3 anos. Ajustem as quantidades conforme a duração, o que já têm em casa e as regras da companhia aérea. Por enquanto, as marcações ficam nesta sessão do navegador; a sincronização será feita na etapa de persistência.</p>
          </div>
        ) : activeSection === "Visão geral" ? (
          <>
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
          </>
        ) : (
          <section className="rounded-[26px] border border-[#eae4d8] bg-white p-8 text-center shadow-sm"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6f5f2] text-[#258b86]"><Compass size={22}/></span><h2 className="mt-4 text-xl font-extrabold text-[#1d4140]">{activeSection}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#87958a]">Esta área será construída nas próximas etapas do projeto. O módulo Financeiro já está disponível para experimentar.</p><button type="button" onClick={()=>setActiveSection("Visão geral")} className="mt-5 rounded-xl bg-[#167d70] px-4 py-2.5 text-xs font-extrabold text-white">Voltar à visão geral</button></section>
        )}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t border-[#e6e1d7] bg-[#fffefa]/95 px-1 py-2 backdrop-blur-xl lg:hidden">
        {navigation.map((item) => { const Icon = item.icon; return <a key={item.label} href="#" onClick={(event)=>{event.preventDefault();goToSection(item.label);}} aria-current={activeSection===item.label?"page":undefined} className={`flex flex-col items-center gap-1 py-1 text-[9px] ${activeSection===item.label?"font-extrabold text-[#16847e]":"font-semibold text-[#8b9990]"}`}><Icon size={19} strokeWidth={activeSection===item.label?2.5:1.8}/>{item.label}</a>; })}
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


function RestaurantsPanel() {
  return (
    <>
            <section className="rounded-[26px] border border-[#eae4d8] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div><div className="flex items-center gap-2 text-[#32958a]"><Utensils size={17}/><span className="text-[10px] font-extrabold uppercase tracking-[.16em]">Lista de restaurantes</span></div><h3 className="mt-2 text-xl font-extrabold text-[#1d4140]">15 lugares para conhecer</h3><p className="mt-1 text-xs leading-5 text-[#87958a]">Opções reunidas para vocês escolherem onde comer durante a viagem.</p></div>
                <span className="w-fit rounded-full bg-[#e6f5f2] px-3 py-1.5 text-xs font-bold text-[#258b86]">15 sugestões salvas</span>
              </div>
            </section>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <article key="0" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 1</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Minha Praia</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,9/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Frutos do mar e cozinha brasileira contemporânea, com drinks e ambiente temático descontraído.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Rua dos Navegantes</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Jantar a dois</span>
              </article>
              <article key="1" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 2</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Barraca</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,9/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Cozinha brasileira, frutos do mar e pratos regionais com apresentação especial.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Rua Esperança</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Ambiente charmoso</span>
              </article>
              <article key="2" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 3</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Domingos Restaurante</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,3/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Opção sofisticada com frutos do mar, massas e ambiente romântico.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Rua Beijupirá</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Noite especial</span>
              </article>
              <article key="3" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 4</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Beijupirá</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,5/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Gastronomia regional criativa, peixes, camarões e combinações com frutas tropicais.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Rua Beijupirá</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Experiência gastronômica</span>
              </article>
              <article key="4" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 5</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Varanda's Restaurante</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,9/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Camarões, pratos bem servidos e localização próxima ao mar.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Rua das Piscinas Naturais</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Vista para o mar</span>
              </article>
              <article key="5" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 6</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Barcaxeira</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,4/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Famoso pela macaxeira gratinada e escondidinhos, com porções generosas.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Porto de Galinhas</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Comida regional</span>
              </article>
              <article key="6" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 7</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Império do Camarão</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,9/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Especializado em camarão, com rodízio e diversas preparações.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Recife (confirmar deslocamento)</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Fora de Porto de Galinhas</span>
              </article>
              <article key="7" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 8</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Toca das Galinhas</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,9/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Comida nordestina, peixes e pratos tradicionais.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Ipojuca</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Culinária regional</span>
              </article>
              <article key="8" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 9</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Farofa Fina</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,5/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Culinária nordestina, ambiente temático e possibilidade de música ao vivo.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Porto de Galinhas</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Música ao vivo</span>
              </article>
              <article key="9" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 10</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Peixe na Telha</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,2/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Frutos do mar e culinária brasileira perto das piscinas naturais.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Porto de Galinhas</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Perto das piscinas naturais</span>
              </article>
              <article key="10" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 11</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">La Tratoria</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,5/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Cozinha italiana, massas artesanais e molhos tradicionais.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Porto de Galinhas</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Alternativa aos frutos do mar</span>
              </article>
              <article key="11" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 12</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">De Boa Pizzas Artesanais</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,8/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Pizza artesanal, ingredientes caprichados e ambiente descontraído.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Porto de Galinhas</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Pizza</span>
              </article>
              <article key="12" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 13</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Caldinho do Nenen</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,5/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Caldinho, frutos do mar, petiscos e pratos brasileiros.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Porto de Galinhas</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Petiscos</span>
              </article>
              <article key="13" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 14</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">Muro Alto Bistrô</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,5/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Proposta contemporânea com peixes e pratos elaborados.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Muro Alto</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Bistrô</span>
              </article>
              <article key="14" className="rounded-[22px] border border-[#eae4d8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#32958a]">Restaurante 15</span><h3 className="mt-1 text-base font-extrabold text-[#234442]">COTI Restaurante</h3></div>
                  <span className="shrink-0 rounded-xl bg-[#fff4df] px-2.5 py-1.5 text-xs font-extrabold text-[#a8742d]">★ 4,2/5</span>
                </div>
                <p className="mt-3 min-h-[60px] text-xs leading-5 text-[#788b80]">Petiscos, camarões, pratos brasileiros e drinks.</p>
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0eee8] pt-3 text-[11px] text-[#71847a]"><MapPin size={13} className="shrink-0 text-[#32958a]"/>Porto de Galinhas</div>
                <span className="mt-3 inline-flex rounded-full bg-[#edf7f2] px-2.5 py-1 text-[10px] font-bold text-[#43816e]">Descontraído</span>
              </article>
            </div>
            <p className="px-1 text-[10px] leading-5 text-[#9aa399]">As avaliações, descrições e endereços foram registrados conforme as informações enviadas e podem mudar. Confirme localização, funcionamento, preços e avaliações atualizadas antes de ir. O Império do Camarão foi indicado em Recife, então vale conferir se faz sentido incluir no roteiro.</p>
    </>
  );
}

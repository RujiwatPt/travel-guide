import { editableFigmaScreens, type EditableFigmaScreen } from '../figmaEditableData'
import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'

function EditablePhone({ screen }: { screen: EditableFigmaScreen }) {
  return (
    <article className="w-full max-w-[375px]">
      <div className="mb-3 flex items-center justify-between px-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#68808b]">
            Editable React/CSS
          </p>
          <h2 className="mt-1 text-sm font-black text-[#061c22]">{screen.name}</h2>
        </div>
        <span className="rounded-full bg-white/70 px-3 py-1 text-[10px] font-black text-[#68808b] shadow-sm">
          {screen.id}
        </span>
      </div>
      <EditableFigmaScreenRenderer screen={screen} />
    </article>
  )
}

export default function NineMobileScreens() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#d7efff_0%,#fff7dd_46%,#ffd85b_100%)] px-5 py-8 text-[#061c22]">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#49636d]">
              Figma layers converted to code · node 4001:3003
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] md:text-6xl">
              Exactly 9 editable screens
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#49636d]">
              Text, cards, colors, spacing, and image layers are now editable React/CSS instead of one flat screenshot per screen.
            </p>
          </div>
          <div className="w-fit rounded-full bg-[#061c22] px-5 py-3 text-sm font-black text-white shadow-xl">
            {editableFigmaScreens.length} screens total
          </div>
        </header>

        <section className="grid justify-items-center gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {editableFigmaScreens.map((screen) => (
            <EditablePhone key={screen.id} screen={screen} />
          ))}
        </section>
      </div>
    </main>
  )
}

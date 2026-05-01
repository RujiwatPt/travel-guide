type NavKey = 'home' | 'explore' | 'plan' | 'journal' | 'profile'

type PhoneShellProps = {
  title: string
  eyebrow?: string
  active?: NavKey
  children: React.ReactNode
}

const heroImages = {
  fuji: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?auto=format&w=900&q=80',
  tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&w=900&q=80',
  kyoto: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&w=900&q=80',
  ramen: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&w=900&q=80',
  temple: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&w=900&q=80',
  journal: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&w=900&q=80',
}

const navItems: { key: NavKey; icon: string; label: string }[] = [
  { key: 'home', icon: '⌂', label: 'Home' },
  { key: 'explore', icon: '◇', label: 'Explore' },
  { key: 'plan', icon: '▣', label: 'Plan' },
  { key: 'journal', icon: '✎', label: 'Journal' },
  { key: 'profile', icon: '☻', label: 'Profile' },
]

const places = [
  { name: 'Mount Fuji', tag: 'Iconic view', image: heroImages.fuji, color: '#d7efff' },
  { name: 'Kyomizudera', tag: 'Temple walk', image: heroImages.kyoto, color: '#ffe4b6' },
  { name: 'Cherry Streets', tag: 'Photo route', image: heroImages.tokyo, color: '#ffdbe7' },
]

function PhoneShell({ title, eyebrow, active = 'home', children }: PhoneShellProps) {
  return (
    <article className="relative h-[690px] w-[320px] shrink-0 overflow-hidden rounded-[38px] border border-white/70 bg-[#f7fbff] shadow-[0_28px_80px_rgba(32,75,111,0.22)] ring-1 ring-black/5">
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-4 text-[10px] font-extrabold text-[#092530]">
        <span>9:56</span>
        <span className="tracking-[2px]">⌁ ▰</span>
      </div>

      <div className="absolute inset-x-4 top-12 z-20 flex items-center justify-between">
        <button className="grid h-9 w-9 place-items-center rounded-full bg-white/70 text-lg shadow-sm backdrop-blur">‹</button>
        <div className="text-center">
          {eyebrow && <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#6a7f8a]">{eyebrow}</div>}
          <h2 className="text-sm font-extrabold text-[#092530]">{title}</h2>
        </div>
        <button className="grid h-9 w-9 place-items-center rounded-full bg-white/70 text-lg shadow-sm backdrop-blur">⋯</button>
      </div>

      <div className="h-full overflow-y-auto px-5 pb-24 pt-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>

      <nav className="absolute inset-x-8 bottom-5 z-30 flex h-14 items-center justify-around rounded-full bg-white/88 px-2 shadow-[0_18px_40px_rgba(25,73,120,0.16)] backdrop-blur-xl">
        {navItems.map((item) => {
          const selected = active === item.key
          return (
            <button
              key={item.key}
              className={
                'grid h-10 w-10 place-items-center rounded-full text-[15px] transition ' +
                (selected ? 'bg-[#081f29] text-white shadow-lg' : 'text-[#91a0a9]')
              }
              aria-label={item.label}
            >
              {item.icon}
            </button>
          )
        })}
      </nav>
    </article>
  )
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[26px] bg-white/78 p-4 shadow-[0_16px_45px_rgba(25,73,120,0.12)] ring-1 ring-white/70 backdrop-blur ${className}`}>{children}</div>
}

function ImageCard({ image, title, subtitle, tall = false }: { image: string; title: string; subtitle: string; tall?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[24px] ${tall ? 'h-48' : 'h-36'} bg-slate-200 shadow-lg`}>
      <img src={image} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061c22]/75 via-transparent to-white/10" />
      <button className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/32 text-white backdrop-blur">♡</button>
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <h3 className="text-lg font-extrabold leading-none">{title}</h3>
        <p className="mt-1 text-[11px] font-semibold text-white/80">{subtitle}</p>
      </div>
    </div>
  )
}

function WeatherChip({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/78 p-3 text-center shadow-sm ring-1 ring-black/5">
      <div className="text-xl">{icon}</div>
      <div className="mt-1 text-[10px] font-bold text-[#789]">{label}</div>
      <div className="text-xs font-extrabold text-[#092530]">{value}</div>
    </div>
  )
}

function Screen01Welcome() {
  return (
    <PhoneShell title="AI Travel" eyebrow="Welcome" active="home">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,#c8ecff_0,transparent_34%),linear-gradient(150deg,#a6d8f7_0%,#fff4d8_54%,#ffd968_100%)]" />
      <div className="relative z-10 flex min-h-[520px] flex-col justify-end pb-8">
        <div className="mb-8 h-20 w-20 rounded-[28px] bg-[#061c22] p-4 shadow-2xl">
          <div className="grid h-full w-full place-items-center rounded-2xl bg-[#ffc20d] text-3xl">✈</div>
        </div>
        <h1 className="text-[38px] font-black leading-[0.95] tracking-[-0.06em] text-[#061c22]">Find magic<br />wherever<br />you land.</h1>
        <p className="mt-4 max-w-[230px] text-sm font-semibold leading-6 text-[#35515b]">Ask AI for local routes, hidden gems, food stops, and ready-to-go day plans.</p>
        <button className="mt-8 h-14 rounded-2xl bg-[#061c22] text-sm font-extrabold text-white shadow-xl">Start Exploring</button>
      </div>
    </PhoneShell>
  )
}

function Screen02Explore() {
  return (
    <PhoneShell title="Explore" eyebrow="Booking hub" active="explore">
      <div className="mb-4 flex gap-2">
        {['All', 'Hotel', 'Ryokan', 'Airbnb'].map((chip, i) => (
          <span key={chip} className={`rounded-full px-3 py-2 text-[11px] font-extrabold ${i === 0 ? 'bg-[#061c22] text-white' : 'bg-white text-[#71838d]'}`}>{chip}</span>
        ))}
      </div>
      <ImageCard image={heroImages.kyoto} title="Kyoto Zen" subtitle="4.9 · $58 / night" tall />
      <div className="mt-5 flex items-center justify-between">
        <h3 className="text-sm font-black">Local Events</h3>
        <button className="text-[11px] font-extrabold text-[#1e8df0]">See All</button>
      </div>
      <div className="mt-3 space-y-3">
        {[['🍜', 'Ramen Night', 'May 20 · 19:00 PM'], ['🏮', 'Kanda Matsuri', 'May 21 · Tokyo'], ['🎐', 'Summer Lights', 'May 22 · Shibuya']].map((row) => (
          <GlassCard key={row[1]} className="!rounded-2xl !p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff0c7] text-xl">{row[0]}</div>
              <div className="flex-1">
                <div className="text-sm font-black">{row[1]}</div>
                <div className="text-[11px] font-semibold text-[#789]">{row[2]}</div>
              </div>
              <button className="rounded-full bg-[#ffd84d] px-3 py-1 text-[10px] font-black">Join</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </PhoneShell>
  )
}

function Screen03SearchAi() {
  return (
    <PhoneShell title="Ask AI" eyebrow="Smart guide" active="home">
      <div className="rounded-[30px] bg-gradient-to-br from-[#c7ecff] via-[#fff6df] to-[#ffd85b] p-5 shadow-xl">
        <div className="text-[11px] font-extrabold text-[#46616b]">Find the base camp near</div>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.05em]">Mount Fuji</h1>
        <div className="mt-5 rounded-2xl bg-white/80 p-3 text-xs font-bold text-[#71838d] shadow-inner">🔎 Food, quiet hotels, photo spots...</div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <h3 className="text-sm font-black">Must-See Today</h3>
        <button className="text-[11px] font-extrabold text-[#1e8df0]">See All</button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <ImageCard image={heroImages.tokyo} title="Cherry Streets" subtitle="2.5 km" />
        <ImageCard image={heroImages.fuji} title="Mount Fuji" subtitle="Base route" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <h3 className="text-sm font-black">Hidden-Gems Nearby</h3>
        <button className="text-[11px] font-extrabold text-[#1e8df0]">See All</button>
      </div>
      <GlassCard className="mt-3 !rounded-2xl !p-3">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#ebf7ff] text-2xl">♨</div>
          <div>
            <div className="text-sm font-black">Lake Kawaguchi Onsen</div>
            <div className="text-[11px] font-bold text-[#789]">Quiet bath · Fuji view · 17 min</div>
          </div>
        </div>
      </GlassCard>
    </PhoneShell>
  )
}

function Screen04Destination() {
  return (
    <PhoneShell title="Mount Fuji" eyebrow="Destination" active="explore">
      <ImageCard image={heroImages.fuji} title="Mount Fuji" subtitle="Yamanashi · Japan" tall />
      <div className="mt-4 grid grid-cols-3 gap-2">
        <WeatherChip icon="☀" label="Weather" value="18°C" />
        <WeatherChip icon="🥾" label="Trail" value="Easy" />
        <WeatherChip icon="⏱" label="Time" value="4h" />
      </div>
      <GlassCard className="mt-4">
        <h3 className="text-base font-black">Why go now?</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#586e78]">Clear morning visibility, low wind, and the lakeside buses still have open seats after 10:30.</p>
      </GlassCard>
      <button className="mt-4 h-13 w-full rounded-2xl bg-[#061c22] py-4 text-sm font-black text-white shadow-xl">Generate Fuji Day Plan</button>
    </PhoneShell>
  )
}

function Screen05PlanTrip() {
  return (
    <PhoneShell title="Plan A Trip" eyebrow="AI planner" active="plan">
      <GlassCard className="bg-gradient-to-br from-white to-[#fff1be]">
        <div className="text-[11px] font-black uppercase tracking-[0.18em] text-[#7c8b92]">Destination</div>
        <div className="mt-2 rounded-2xl bg-white p-3 text-sm font-black shadow-inner">🗻 Mount Fuji, Japan</div>
      </GlassCard>
      <div className="mt-4 grid grid-cols-7 gap-1">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
          <div key={`${day}-${i}`} className={`grid h-10 place-items-center rounded-2xl text-xs font-black ${i === 4 ? 'bg-[#061c22] text-white' : 'bg-white text-[#789]'}`}>{day}</div>
        ))}
      </div>
      <GlassCard className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black">Date & Budget</span>
          <span className="text-[11px] font-black text-[#1e8df0]">Edit</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {['1 day', '$120', 'Solo'].map((item) => <span key={item} className="rounded-2xl bg-[#eef7ff] px-3 py-3 text-center text-xs font-black">{item}</span>)}
        </div>
      </GlassCard>
      <GlassCard className="mt-4">
        <textarea className="h-28 w-full resize-none bg-transparent text-sm font-semibold leading-6 outline-none placeholder:text-[#90a0a7]" placeholder="Tell AI what you like: ramen, temples, easy hikes, photography..." defaultValue="I want a calm Fuji day with ramen, lake views, and one hidden local stop." />
      </GlassCard>
      <button className="mt-4 h-14 w-full rounded-2xl bg-[#ffc20d] text-sm font-black text-[#061c22] shadow-xl">Create My Route</button>
    </PhoneShell>
  )
}

function Screen06Itinerary() {
  return (
    <PhoneShell title="Tokyo!" eyebrow="Ready to explore" active="plan">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-br from-[#bce8ff] via-[#fff4dd] to-[#ffd968]" />
      <div className="relative z-10">
        <div className="rounded-[30px] bg-white/68 p-4 shadow-xl backdrop-blur">
          <div className="text-xs font-bold text-[#789]">AI made this for you</div>
          <h1 className="mt-1 text-3xl font-black tracking-[-0.05em]">Tokyo calm day</h1>
          <div className="mt-4 rounded-2xl bg-white px-3 py-3 text-xs font-bold text-[#789]">🔎 Find places, foods, trips...</div>
        </div>
        <h3 className="mb-3 mt-5 text-sm font-black">All insights Today</h3>
        <div className="grid grid-cols-3 gap-2">
          <WeatherChip icon="🌶" label="Food" value="Ramen" />
          <WeatherChip icon="☂" label="Weather" value="Cloudy" />
          <WeatherChip icon="🚕" label="Transit" value="Easy" />
        </div>
        <h3 className="mb-3 mt-5 text-sm font-black">Locale by AI</h3>
        <div className="grid grid-cols-2 gap-3">
          {places.slice(0, 2).map((place) => (
            <div key={place.name} className="rounded-[24px] p-3 shadow-lg" style={{ background: place.color }}>
              <img src={place.image} alt="" className="h-24 w-full rounded-2xl object-cover" />
              <div className="mt-2 text-sm font-black">{place.name}</div>
              <div className="text-[11px] font-bold text-[#6f828b]">{place.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </PhoneShell>
  )
}

function Screen07HiddenGems() {
  return (
    <PhoneShell title="Hidden Gems" eyebrow="Near you" active="explore">
      <div className="space-y-4">
        {[
          ['Kissa Morning', 'Tiny retro café under the station tracks', '☕', '#fff1c6'],
          ['Yanaka Alley', 'Old Tokyo cats, snacks, quiet temples', '🐈', '#e4f5ff'],
          ['Garden Bookshop', 'English maps and local zines', '📚', '#ffe1ea'],
          ['After-Dark Onsen', 'Tattoo-friendly bath open until midnight', '♨', '#e7e2ff'],
        ].map(([name, text, icon, color], index) => (
          <GlassCard key={name} className="!rounded-[24px] !p-3">
            <div className="flex gap-3">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: color }}>{icon}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black">{name}</h3>
                  <span className="rounded-full bg-[#061c22] px-2 py-1 text-[10px] font-black text-white">0.{index + 7} km</span>
                </div>
                <p className="mt-1 text-xs font-semibold leading-5 text-[#71838d]">{text}</p>
                <div className="mt-2 flex gap-1">
                  {['local', 'quiet', 'AI pick'].map((tag) => <span key={tag} className="rounded-full bg-[#f1f6fa] px-2 py-1 text-[10px] font-black text-[#789]">{tag}</span>)}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </PhoneShell>
  )
}

function Screen08Journal() {
  return (
    <PhoneShell title="Trip Journal" eyebrow="Memory log" active="journal">
      <div className="mb-4 flex gap-2 rounded-full bg-white p-1 shadow-sm">
        <button className="flex-1 rounded-full bg-[#061c22] py-2 text-xs font-black text-white">Timeline</button>
        <button className="flex-1 rounded-full py-2 text-xs font-black text-[#789]">Storymode</button>
      </div>
      <ImageCard image={heroImages.journal} title="Fuji morning" subtitle="Saved today · 42 photos" tall />
      <div className="mt-4 space-y-3">
        {[
          ['08:20', 'AI found the clearest lake viewpoint before crowds.'],
          ['11:40', 'Ramen stop added after the weather changed.'],
          ['16:15', 'Golden-hour postcard generated from your route.'],
        ].map(([time, note]) => (
          <GlassCard key={time} className="!rounded-2xl !p-3">
            <div className="flex gap-3">
              <div className="text-xs font-black text-[#1e8df0]">{time}</div>
              <p className="text-xs font-semibold leading-5 text-[#586e78]">{note}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </PhoneShell>
  )
}

function Screen09Profile() {
  return (
    <PhoneShell title="Profile" eyebrow="Traveler" active="profile">
      <div className="text-center">
        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=300&q=80" alt="Traveler" className="mx-auto h-24 w-24 rounded-[32px] object-cover shadow-xl" />
        <h1 className="mt-3 text-xl font-black">J. Snow</h1>
        <p className="text-xs font-bold text-[#789]">AI trip lover · Tokyo location</p>
        <div className="mt-3 flex justify-center gap-2">
          <span className="rounded-full bg-[#ffc20d] px-3 py-1 text-[10px] font-black">Gold</span>
          <span className="rounded-full bg-[#dff2ff] px-3 py-1 text-[10px] font-black text-[#1e8df0]">Explorer</span>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        {['30\nCities', '93\nPlans', '69\nClips'].map((stat) => {
          const [num, label] = stat.split('\n')
          return <GlassCard key={label} className="!rounded-2xl !p-3"><div className="text-lg font-black">{num}</div><div className="text-[10px] font-bold text-[#789]">{label}</div></GlassCard>
        })}
      </div>
      <h3 className="mb-3 mt-5 text-sm font-black">Your Travel Profile</h3>
      <div className="space-y-3">
        {[
          ['🧭', 'Travel Persona Manager', 'Foodie, Normal Pace'],
          ['🧳', 'Saved Places', '16 destinations tracked'],
          ['🌙', 'Saved Trips', 'Upcoming: Tokyo'],
        ].map(([icon, name, text]) => (
          <GlassCard key={name} className="!rounded-2xl !p-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">{icon}</span>
              <div className="flex-1"><div className="text-xs font-black">{name}</div><div className="text-[10px] font-bold text-[#789]">{text}</div></div>
              <span className="text-[#9aa7ad]">›</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </PhoneShell>
  )
}

export default function NineMobileScreens() {
  const screens = [
    <Screen01Welcome key="welcome" />,
    <Screen02Explore key="explore" />,
    <Screen03SearchAi key="search-ai" />,
    <Screen04Destination key="destination" />,
    <Screen05PlanTrip key="plan-trip" />,
    <Screen06Itinerary key="itinerary" />,
    <Screen07HiddenGems key="hidden-gems" />,
    <Screen08Journal key="journal" />,
    <Screen09Profile key="profile" />,
  ]

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#d2edff_0%,#fff7de_45%,#ffd965_100%)] px-6 py-10 text-[#061c22]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#45636f]">AI Travel Guide Mobile App</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] md:text-6xl">Exactly 9 mobile screens</h1>
          </div>
          <div className="rounded-full bg-[#061c22] px-5 py-3 text-sm font-black text-white shadow-xl">9 screens total</div>
        </div>

        <section className="grid justify-items-center gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {screens.map((screen, index) => (
            <div key={index}>
              <div className="mb-3 text-center text-xs font-black uppercase tracking-[0.2em] text-[#45636f]">Screen {index + 1} of 9</div>
              {screen}
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

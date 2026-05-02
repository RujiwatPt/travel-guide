import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronRight, LoaderCircle, Map as MapIcon, MessageCircle, Sparkles } from 'lucide-react'
import BottomSheet, { type SheetState } from '../components/BottomSheet'
import ChatbotBar from '../components/ChatbotBar'
import ChatResultCard from '../components/ChatResultCard'
import EntryCard from '../components/EntryCard'
import KitBottomNav2 from '../components/KitBottomNav2'
import MapView from '../components/MapView'
import PlanMyDaySheet, { type PlanMyDaySelections } from '../components/PlanMyDaySheet'
import PlanResult from '../components/PlanResult'
import ThemeStrip from '../components/ThemeStrip'
import { NKP } from '../data/seed'
import { themesForCity } from '../data/themes'
import { distanceKm } from '../lib/distance'
import { CHIPS, applyFilters } from '../lib/filters'
import {
  mockIntentClassifierProvider,
  rankEntriesForIntentWithHints,
  shouldUsePlanMode,
} from '../lib/intentSearch'
import { searchIntentHits } from '../lib/api'
import { getPlan, type Plan } from '../lib/plan'
import { useAppStore } from '../store/useAppStore'
import type { Entry } from '../types'

type RankedSearchResult = {
  entry: Entry
  score: number
  matchedReasons: string[]
}

type ActiveSearch = {
  query: string
  results: RankedSearchResult[]
}

type ViewMode = 'chat' | 'map'

type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  text: string
  results?: RankedSearchResult[]
  plan?: Plan
}

const INITIAL_CHAT_MESSAGE: ChatMessage = {
  id: 'assistant-intro',
  role: 'assistant',
  text: 'Ask me about blessings, food, nature, photo spots, or trip planning in Nakhon Phanom.',
}

const INITIAL_PLAN_SELECTIONS: PlanMyDaySelections = {
  duration: 'Half-Day',
  vibe: 'Spiritual',
  pace: 'Balanced',
}

function buildPlanPrompt(selections: PlanMyDaySelections): string {
  const durationText: Record<PlanMyDaySelections['duration'], string> = {
    '1 Hour': 'one hour',
    'Half-Day': 'a half-day',
    'Full-Day': 'a full-day',
  }
  const vibeText: Record<PlanMyDaySelections['vibe'], string> = {
    Spiritual: 'spiritual blessings, temple stops, and a stupa visit',
    Food: 'local food and market snacks',
    Nature: 'nature, riverside air, and scenic stops',
    Photo: 'photo spots, viewpoints, and golden-hour scenes',
    Family: 'family-friendly stops with easy pacing',
    'Hidden Gem': 'hidden gems and quieter local places',
  }
  const paceText: Record<PlanMyDaySelections['pace'], string> = {
    Relaxed: 'relaxed',
    Balanced: 'balanced',
    Packed: 'packed',
  }

  return `Plan ${durationText[selections.duration]} in Nakhon Phanom with a ${paceText[selections.pace]} pace focused on ${vibeText[selections.vibe]}.`
}

function buildSearchReply(query: string, results: RankedSearchResult[]): string {
  if (results.length === 0) {
    return `I could not find a strong match for "${query}", but you can still explore the map and nearby picks.`
  }

  const [first, second] = results
  if (!second) {
    return `I found one strong match for "${query}". ${first.entry.name_en} looks like the best place to start.`
  }

  return `I found ${results.length} matches for "${query}". Start with ${first.entry.name_en}, then keep ${second.entry.name_en} as a strong backup.`
}

function buildPlanReply(plan: Plan): string {
  return `I mapped out ${plan.stops.length} stops over ${plan.total_duration_min} minutes. Here is a concierge-style route you can follow.`
}

function ChatBubble({
  role,
  children,
}: {
  role: ChatMessage['role']
  children: ReactNode
}) {
  const user = role === 'user'

  return (
    <div className={`flex ${user ? 'justify-end' : 'justify-start'}`}>
      <div
        className={
          user
            ? 'max-w-[82%] rounded-[22px] rounded-br-md bg-ink px-4 py-3 text-sm font-semibold text-white shadow-kit-card'
            : 'max-w-[88%] rounded-[22px] rounded-bl-md border border-ink/5 bg-white px-4 py-3 text-sm text-ink shadow-kit-card'
        }
      >
        {children}
      </div>
    </div>
  )
}

function ChatPlanCard({ plan, onOpenEntry }: { plan: Plan; onOpenEntry: (entryId: string) => void }) {
  return (
    <div className="rounded-[24px] border border-ink/8 bg-white p-4 shadow-kit-card">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="kit-eyebrow mb-2">Your plan</p>
          <h3 className="text-lg font-black tracking-[-0.04em] text-ink">
            {plan.start_time} to {plan.end_time}
          </h3>
          <p className="mt-1 text-sm text-muted">{plan.rationale_en}</p>
        </div>
        <div className="rounded-kit-pill bg-blue-strong/10 px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-blue-strong">
          {plan.stops.length} stops
        </div>
      </div>

      <div className="space-y-2.5">
        {plan.stops.map((stop) => (
          <button
            key={stop.position}
            type="button"
            onClick={() => onOpenEntry(stop.entry_id)}
            className="flex w-full items-start gap-3 rounded-kit-photo bg-panel px-3 py-3 text-left transition hover:bg-kit-cream-2"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-kit-pill bg-white text-sm font-extrabold text-blue-strong shadow-kit-pill">
              {stop.position}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-kit-eyebrow">
                <span>{stop.arrival_time}</span>
                <span className="text-ink/20">/</span>
                <span>{stop.duration_min} min</span>
              </div>
              <h4 className="truncate text-[14px] font-extrabold tracking-tight text-ink">
                {stop.entry_summary.name_en}
              </h4>
              <p className="mt-1 line-clamp-2 text-[12px] text-muted">{stop.why_en}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function MapPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const entries = useAppStore((s) => s.entries)
  const [viewMode, setViewMode] = useState<ViewMode>('chat')
  const [sheetState, setSheetState] = useState<SheetState>('peek')
  const [selectedChipIds, setSelectedChipIds] = useState<string[]>([])
  const [activeThemeId, setActiveThemeId] = useState<string | null>(null)
  const [activeSearch, setActiveSearch] = useState<ActiveSearch | null>(null)
  const [activeStatusFilters, setActiveStatusFilters] = useState<Array<'open_now' | 'closing_soon' | 'closed' | 'unknown'>>([])
  const [chatbotLoading, setChatbotLoading] = useState(false)
  const [activePlan, setActivePlan] = useState<Plan | null>(null)
  const [routeRevealedSegments, setRouteRevealedSegments] = useState(0)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([INITIAL_CHAT_MESSAGE])
  const [chatDraft, setChatDraft] = useState('')
  const [chatThinking, setChatThinking] = useState(false)
  const [planSheetOpen, setPlanSheetOpen] = useState(false)
  const [planSelections, setPlanSelections] = useState(INITIAL_PLAN_SELECTIONS)
  const chatScrollRef = useRef<HTMLDivElement | null>(null)

  const themes = useMemo(() => themesForCity('nkp'), [])
  const activeTheme = useMemo(
    () => themes.find((theme) => theme.id === activeThemeId) ?? null,
    [themes, activeThemeId],
  )

  const filteredEntries = useMemo(() => {
    const candidates = activeTheme
      ? entries.filter((entry) => activeTheme.entry_ids.includes(entry.id))
      : entries
    return applyFilters(candidates, selectedChipIds, new Date())
  }, [entries, selectedChipIds, activeTheme])

  useEffect(() => {
    if (!chatScrollRef.current) return
    chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [chatMessages, chatThinking])

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages((prev) => [...prev, message])
  }

  const handleCardTap = (id: string) => {
    navigate(`/entry/${id}`)
  }

  const prepareFreshResults = () => {
    setActivePlan(null)
    setRouteRevealedSegments(0)
    setSelectedChipIds([])
    setActiveThemeId(null)
    setActiveSearch(null)
  }

  const resolveSearchResults = async (query: string): Promise<ActiveSearch> => {
    const hits = await searchIntentHits('nkp', query, 12, activeStatusFilters).catch(() => [])
    const byId = new Map(entries.map((entry) => [entry.id, entry]))
    let rankedResults = hits
      .map((hit) => {
        const entry = byId.get(hit.entryId)
        if (!entry) return null
        const matchedReasons = [hit.matchedIntent, hit.category].filter(
          (value): value is string => Boolean(value),
        )
        if (hit.retrievalGrade) matchedReasons.push(`grade:${hit.retrievalGrade}`)
        return {
          entry,
          score: Math.round(hit.score * 100),
          matchedReasons,
        }
      })
      .filter((result): result is RankedSearchResult => result !== null)

    if (rankedResults.length === 0) {
      rankedResults = await rankEntriesForIntentWithHints(
        query,
        entries,
        mockIntentClassifierProvider,
      )
    }

    const nextSearch = { query, results: rankedResults }
    setActiveSearch(nextSearch)
    setSheetState('full')
    return nextSearch
  }

  const runConciergeQuery = async (
    query: string,
    options?: { appendToChat?: boolean; forcePlan?: boolean; switchToMap?: boolean },
  ) => {
    const normalized = query.trim()
    if (!normalized) return

    prepareFreshResults()

    if (options?.switchToMap) {
      setViewMode('map')
    }

    if (options?.appendToChat) {
      addChatMessage({
        id: `user-${Date.now()}`,
        role: 'user',
        text: normalized,
      })
      setChatThinking(true)
    }

    setChatbotLoading(true)

    try {
      if (options?.forcePlan || shouldUsePlanMode(normalized)) {
        const plan = await getPlan(normalized, 'nkp')
        setActivePlan(plan)
        setSheetState('full')

        if (options?.appendToChat) {
          addChatMessage({
            id: `assistant-plan-${Date.now()}`,
            role: 'assistant',
            text: buildPlanReply(plan),
            plan,
          })
        }
      } else {
        const search = await resolveSearchResults(normalized)
        if (options?.appendToChat) {
          addChatMessage({
            id: `assistant-search-${Date.now()}`,
            role: 'assistant',
            text: buildSearchReply(normalized, search.results),
            results: search.results.slice(0, 3),
          })
        }
      }
    } catch {
      if (options?.appendToChat) {
        addChatMessage({
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          text: 'I hit a temporary snag, but you can still try again or switch to the map to explore.',
        })
      }
    } finally {
      setChatThinking(false)
      setChatbotLoading(false)
    }
  }

  const handleMapSubmit = async (query: string) => {
    await runConciergeQuery(query, { appendToChat: true, switchToMap: true })
  }

  const handleChatSubmit = async (query: string) => {
    setChatDraft('')
    await runConciergeQuery(query, { appendToChat: true })
  }

  const handlePlanMyDay = async () => {
    setPlanSheetOpen(false)
    await runConciergeQuery(buildPlanPrompt(planSelections), { appendToChat: true, forcePlan: true })
  }

  const handleClearResults = () => {
    setActiveSearch(null)
    setActivePlan(null)
    setSelectedChipIds([])
    setActiveThemeId(null)
    setRouteRevealedSegments(0)
    setActiveStatusFilters([])
    setSheetState('peek')
  }

  const toggleChip = (id: string) => {
    setActiveSearch(null)
    setSelectedChipIds((prev) => {
      const next = prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
      if (prev.length === 0 && next.length > 0 && sheetState === 'peek') {
        setSheetState('half')
      }
      return next
    })
  }

  const handleThemeTap = (themeId: string) => {
    setActiveSearch(null)
    setActiveThemeId((prev) => (prev === themeId ? null : themeId))
    setSelectedChipIds([])
    if (sheetState === 'peek') setSheetState('half')
  }

  const toggleStatusFilter = (status: 'open_now' | 'closing_soon' | 'closed' | 'unknown') => {
    setActiveStatusFilters((prev) => {
      const next = prev.includes(status) ? prev.filter((value) => value !== status) : [...prev, status]
      if (activeSearch?.query) {
        void searchIntentHits('nkp', activeSearch.query, 12, next).then((hits) => {
          const byId = new Map(entries.map((entry) => [entry.id, entry]))
          const rankedResults = hits
            .map((hit) => {
              const entry = byId.get(hit.entryId)
              if (!entry) return null
              const matchedReasons = [hit.matchedIntent, hit.category].filter(
                (value): value is string => Boolean(value),
              )
              if (hit.retrievalGrade) matchedReasons.push(`grade:${hit.retrievalGrade}`)
              return { entry, score: Math.round(hit.score * 100), matchedReasons }
            })
            .filter((result): result is RankedSearchResult => result !== null)
          setActiveSearch({ query: activeSearch.query, results: rankedResults })
        })
      }
      return next
    })
  }

  const consumedQueryRef = useRef<string | null>(null)
  useEffect(() => {
    const query = searchParams.get('q')
    if (!query) return
    if (consumedQueryRef.current === query) return
    consumedQueryRef.current = query
    void runConciergeQuery(query, { switchToMap: true })
    setSearchParams({}, { replace: true })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  useEffect(() => {
    if (!activePlan) return
    const totalSegments = activePlan.route_geometry.coordinates.length - 1
    setRouteRevealedSegments(0)
    const startDelay = 600
    const segmentInterval = 250
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < totalSegments; i++) {
      timers.push(
        setTimeout(() => setRouteRevealedSegments(i + 1), startDelay + i * segmentInterval),
      )
    }
    return () => timers.forEach(clearTimeout)
  }, [activePlan])

  const searchEntries = activeSearch?.results.map((result) => result.entry) ?? []
  const mapEntries = activePlan ? entries : activeSearch ? searchEntries : filteredEntries

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#f9fbfe]">
      <div className="absolute left-4 right-4 top-4 z-kit-overlay">
        <div
          role="tablist"
          aria-label="App mode"
          className="flex rounded-kit-pill border border-ink/5 bg-white/95 p-1 shadow-kit-pill backdrop-blur"
        >
          {[
            { id: 'chat' as const, label: 'Chat', icon: MessageCircle },
            { id: 'map' as const, label: 'Map', icon: MapIcon },
          ].map((tab) => {
            const active = viewMode === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setViewMode(tab.id)}
                className={
                  'flex flex-1 items-center justify-center gap-2 rounded-kit-pill px-4 py-2.5 text-sm font-extrabold transition ' +
                  (active ? 'bg-kit-gold-1 text-ink' : 'text-ink/65 hover:bg-panel')
                }
              >
                <Icon size={16} aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {viewMode === 'map' ? (
        <>
          <ChatbotBar
            className="absolute left-4 right-4 top-20 z-kit-overlay"
            onSubmit={handleMapSubmit}
            loading={chatbotLoading}
            initialQuery={activeSearch?.query ?? activePlan?.query}
            onClear={handleClearResults}
            hasPlan={!!activePlan || !!activeSearch}
          />

          <MapView
            city={NKP}
            entries={mapEntries}
            onPinTap={(entry) => handleCardTap(entry.id)}
            activePlan={activePlan}
            routeRevealedSegments={routeRevealedSegments}
          />

          <BottomSheet state={sheetState} onStateChange={setSheetState}>
            {activePlan ? (
              <PlanResult plan={activePlan} onClear={handleClearResults} />
            ) : activeSearch ? (
              <div>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                      Search results
                    </p>
                    <h2 className="text-lg font-bold leading-tight text-ink">{activeSearch.query}</h2>
                    <p className="mt-0.5 text-[12px] text-muted">
                      {activeSearch.results.length} ranked result
                      {activeSearch.results.length === 1 ? '' : 's'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearResults}
                    className="text-[12px] font-semibold text-blue-strong hover:text-ink"
                  >
                    Clear
                  </button>
                </div>

                <div className="mb-2 flex gap-2 overflow-x-auto pb-2">
                  {[
                    { id: 'open_now', label: 'Open now' },
                    { id: 'closing_soon', label: 'Closing soon' },
                    { id: 'closed', label: 'Closed' },
                    { id: 'unknown', label: 'Uncertain' },
                  ].map((statusOption) => {
                    const active = activeStatusFilters.includes(
                      statusOption.id as 'open_now' | 'closing_soon' | 'closed' | 'unknown',
                    )
                    return (
                      <button
                        key={statusOption.id}
                        type="button"
                        onClick={() =>
                          toggleStatusFilter(
                            statusOption.id as 'open_now' | 'closing_soon' | 'closed' | 'unknown',
                          )
                        }
                        className={'kit-chip ' + (active ? 'kit-chip-active' : 'kit-chip-inactive')}
                      >
                        {statusOption.label}
                      </button>
                    )
                  })}
                </div>

                {activeSearch.results.length === 0 && (
                  <div className="rounded-kit-photo border border-dashed border-ink/10 bg-panel px-4 py-6 text-sm text-muted">
                    No ranked matches yet. Try a different phrasing or switch back to Chat for another follow-up.
                  </div>
                )}

                {activeSearch.results.map((result, index) => (
                  <div key={result.entry.id} className="mb-3">
                    <div className="mb-1 flex items-center gap-2 text-[11px] text-muted">
                      <span className="font-bold text-blue-strong">#{index + 1}</span>
                      <span>{result.score} pts</span>
                      {result.matchedReasons.length > 0 && (
                        <span className="truncate">{result.matchedReasons.join(' / ')}</span>
                      )}
                    </div>
                    <EntryCard
                      entry={result.entry}
                      distanceKm={distanceKm(
                        { lat: NKP.default_lat, lng: NKP.default_lng },
                        { lat: result.entry.lat, lng: result.entry.lng },
                      )}
                      onTap={(entry) => handleCardTap(entry.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <ThemeStrip
                  themes={themes}
                  activeThemeId={activeThemeId}
                  onThemeTap={handleThemeTap}
                />

                <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-3">
                  {CHIPS.map((chip) => {
                    const active = selectedChipIds.includes(chip.id)
                    return (
                      <button
                        key={chip.id}
                        onClick={() => toggleChip(chip.id)}
                        className={'kit-chip ' + (active ? 'kit-chip-active' : 'kit-chip-inactive')}
                      >
                        {chip.label}
                      </button>
                    )
                  })}
                </div>

                {activeTheme && (
                  <div
                    className="mb-3 flex items-center gap-2.5 rounded-kit-photo border-2 p-3 text-[12px]"
                    style={{
                      background: `linear-gradient(135deg, ${activeTheme.accent_color}25, ${activeTheme.accent_color}08)`,
                      borderColor: `${activeTheme.accent_color}50`,
                    }}
                  >
                    <span className="text-lg">{activeTheme.emoji}</span>
                    <span className="flex-1 font-semibold text-ink/85">
                      Showing <span className="font-extrabold">{activeTheme.name_en}</span>
                    </span>
                    <button
                      onClick={() => setActiveThemeId(null)}
                      className="grid h-7 w-7 place-items-center rounded-kit-pill text-base leading-none text-muted transition hover:bg-ink/5 hover:text-ink"
                      aria-label="Clear theme"
                    >
                      x
                    </button>
                  </div>
                )}

                <div>
                  {filteredEntries.length === 0 && (
                    <div className="py-8 text-center text-sm text-muted">
                      No matches. Try removing a filter.
                    </div>
                  )}
                  {filteredEntries.map((entry) => (
                    <EntryCard
                      key={entry.id}
                      entry={entry}
                      distanceKm={distanceKm(
                        { lat: NKP.default_lat, lng: NKP.default_lng },
                        { lat: entry.lat, lng: entry.lng },
                      )}
                      onTap={(nextEntry) => handleCardTap(nextEntry.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </BottomSheet>
        </>
      ) : (
        <div className="flex h-full flex-col pt-20">
          <div className="px-4 pb-4 pt-3">
            <p className="kit-eyebrow mb-2">Nakhon Phanom</p>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-[28px] font-black tracking-[-0.06em] text-ink">Concierge</h1>
                <p className="mt-1 max-w-[24rem] text-sm text-muted">
                  Ask for blessings, local food, quiet nature, photo spots, or let me build a day route for you.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPlanSheetOpen(true)}
                className="shrink-0 rounded-kit-pill bg-kit-gold-1 px-4 py-3 text-sm font-extrabold text-ink shadow-kit-pill transition hover:brightness-[0.98]"
              >
                Plan my day
              </button>
            </div>
          </div>

          <div ref={chatScrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 pb-32">
            {chatMessages.map((message) => (
              <div key={message.id} className="space-y-2">
                <ChatBubble role={message.role}>
                  <p className="leading-relaxed">{message.text}</p>
                </ChatBubble>

                {message.role === 'assistant' && message.results && message.results.length > 0 && (
                  <div className="space-y-2 pl-1 pr-7">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-kit-eyebrow">
                      Top matches
                    </p>
                    {message.results.map((result) => (
                      <ChatResultCard
                        key={`${message.id}-${result.entry.id}`}
                        entry={result.entry}
                        score={result.score}
                        matchedReasons={result.matchedReasons}
                        onTap={(entry) => handleCardTap(entry.id)}
                      />
                    ))}
                  </div>
                )}

                {message.role === 'assistant' && message.plan && (
                  <div className="pl-1 pr-7">
                    <ChatPlanCard plan={message.plan} onOpenEntry={handleCardTap} />
                  </div>
                )}
              </div>
            ))}

            {chatThinking && (
              <ChatBubble role="assistant">
                <div className="flex items-center gap-2 text-sm font-medium text-muted">
                  <LoaderCircle size={16} className="animate-spin text-blue-strong" aria-hidden="true" />
                  Thinking...
                </div>
              </ChatBubble>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-16 px-4">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (!chatbotLoading && chatDraft.trim()) {
                  void handleChatSubmit(chatDraft)
                }
              }}
              className="rounded-[28px] border border-ink/5 bg-white p-3 shadow-kit-pill"
            >
              <label htmlFor="chat-follow-up" className="sr-only">
                Follow up
              </label>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="shrink-0 text-blue-strong" aria-hidden="true" />
                <input
                  id="chat-follow-up"
                  type="text"
                  autoComplete="off"
                  value={chatDraft}
                  onChange={(event) => setChatDraft(event.target.value)}
                  placeholder="Follow up..."
                  disabled={chatbotLoading}
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-muted disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={chatbotLoading || chatDraft.trim().length === 0}
                  className="grid h-11 w-11 place-items-center rounded-kit-pill bg-ink text-white transition hover:bg-ink/90 disabled:opacity-40"
                  aria-label="Send chat message"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>

          <PlanMyDaySheet
            open={planSheetOpen}
            selections={planSelections}
            onChange={setPlanSelections}
            onClose={() => setPlanSheetOpen(false)}
            onSubmit={() => {
              void handlePlanMyDay()
            }}
            loading={chatbotLoading}
          />
        </div>
      )}

      <KitBottomNav2 active="grid" />
    </div>
  )
}

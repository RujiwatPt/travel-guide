import KitBottomNav2 from '../components/KitBottomNav2'
import KitNotificationRow from '../components/KitNotificationRow'
import KitPageHeader from '../components/KitPageHeader'
import { NKP_PHOTOS } from '../data/nkpPhotos'

type SectionDef = { title: string; rows: RowDef[] }
type RowDef = {
  icon?: string
  photo?: string
  tone?: 'blue' | 'amber' | 'green' | 'rose' | 'violet' | 'sky'
  title: string
  body: string
  time: string
}

const SECTIONS: SectionDef[] = [
  {
    title: 'Owner Updates',
    rows: [
      {
        icon: '🍜', tone: 'amber',
        title: 'Pho Sawan — open now ✓',
        body: 'Khun Somchai updated 2h ago.',
        time: '2m',
      },
      {
        icon: '🤖', tone: 'violet',
        title: 'AI created your half-day Sunday plan',
        body: 'Walk-friendly, sunset-timed, Phra That Phanom included.',
        time: '15m',
      },
      {
        photo: NKP_PHOTOS.phraThatPhanom,
        title: 'Phra That Phanom Pilgrimage',
        body: 'Sunday morning · your birthday-day stupa.',
        time: '3h',
      },
    ],
  },
  {
    title: 'AI Tips for NKP',
    rows: [
      {
        icon: '🌃', tone: 'blue',
        title: 'Walk to Indochina Market tonight',
        body: 'Friday — live music after 19:00.',
        time: '3h',
      },
      {
        icon: '🌅', tone: 'rose',
        title: 'Sunset at Naga Statue at 18:18 today',
        body: 'Best Mekong photo spot in NKP.',
        time: '6h',
      },
    ],
  },
  {
    title: 'Weather & Safety',
    rows: [
      {
        icon: '🌧', tone: 'amber',
        title: 'Light rain forecast 16:00–19:00',
        body: 'Indoor museums recommended.',
        time: '1d',
      },
    ],
  },
  {
    title: 'Theme Alerts',
    rows: [
      {
        icon: '🛕', tone: 'sky',
        title: 'Birthday-Stupa Theme refreshed',
        body: '8 stupas now mapped — your Sunday is Phra That Phanom.',
        time: '2d',
      },
    ],
  },
]

export default function NotificationsPage() {
  return (
    <div className="min-h-[100dvh] bg-white relative pb-28">
      <KitPageHeader title="Notifications" onMenu={() => {}} />

      {SECTIONS.map((section) => (
        <section key={section.title} className="mt-2">
          <h2 className="px-5 pt-4 pb-2 text-[16px] font-extrabold text-ink tracking-tight">
            {section.title}
          </h2>
          <div>
            {section.rows.map((row, i) => (
              <KitNotificationRow
                key={`${section.title}-${i}`}
                icon={row.icon}
                photo={row.photo}
                tone={row.tone}
                title={row.title}
                body={row.body}
                time={row.time}
              />
            ))}
          </div>
        </section>
      ))}

      <KitBottomNav2 active="grid" />
    </div>
  )
}

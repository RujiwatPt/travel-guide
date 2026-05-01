type Props = {
  title: string
  subtitle?: string
}

export default function KitSectionTitle({ title, subtitle }: Props) {
  return (
    <div className="px-5 pt-2 pb-3">
      <h2 className="text-[22px] font-extrabold text-ink tracking-tight leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-[13px] text-ink/55 font-medium mt-1 leading-snug">{subtitle}</p>
      )}
    </div>
  )
}

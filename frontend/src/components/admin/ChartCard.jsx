export default function ChartCard({ title, children, actions }) {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="font-bold">{title}</h3>
        {actions}
      </div>
      <div className="h-64 w-full">{children}</div>
    </div>
  )
}

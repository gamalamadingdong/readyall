type DepthStatus = 'live' | 'draft' | 'planned';

type DocsSection = {
  href: string;
  label: string;
  depth: string;
  status: DepthStatus;
};

const sections: DocsSection[] = [
  { href: '/rwn', label: 'RWN reference', depth: 'Depth 5/5', status: 'live' },
  { href: '/training-physiology', label: 'Training & Physiology', depth: 'Depth 3/5', status: 'draft' },
];

const statusClassMap: Record<DepthStatus, string> = {
  live: 'text-emerald-700 dark:text-emerald-400',
  draft: 'text-amber-700 dark:text-amber-400',
  planned: 'text-neutral-600 dark:text-neutral-400',
};

const statusLabelMap: Record<DepthStatus, string> = {
  live: 'Live',
  draft: 'Draft depth',
  planned: 'Planned',
};

export function DocsDepthDashboard({
  title = 'Documentation Progress',
  description = 'We are building one section at a time. RWN is complete; Training & Physiology is the active expansion track.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="tb-soft-card rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900/60">
            <tr>
              <th className="px-4 py-3 font-medium">Section</th>
              <th className="px-4 py-3 font-medium">Depth</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr key={section.label} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-3">
                  <a href={section.href} className="font-medium hover:underline">
                    {section.label}
                  </a>
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{section.depth}</td>
                <td className={`px-4 py-3 ${statusClassMap[section.status]}`}>{statusLabelMap[section.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

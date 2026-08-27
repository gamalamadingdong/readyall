'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/types/supabase';

type CommunityItemRow = {
  id: string;
  user_id: string;
  product_area: string;
  item_type: string;
  title: string;
  details: string;
  status: string;
  moderation_note: string | null;
  created_at: string;
  moderated_at: string | null;
};

type ProfileRow = {
  user_id: string;
  display_name: string;
  roles: string[] | null;
};

type QueueStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'implemented';

const STATUS_OPTIONS: QueueStatus[] = ['pending', 'in_review', 'approved', 'rejected', 'implemented'];

export function ModeratorQueue() {
  const [loading, setLoading] = useState(true);
  const [isModerator, setIsModerator] = useState(false);
  const [moderatorUserId, setModeratorUserId] = useState<string | null>(null);
  const [items, setItems] = useState<CommunityItemRow[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [statusDrafts, setStatusDrafts] = useState<Record<string, QueueStatus>>({});
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  const pendingCount = useMemo(() => items.filter((item) => item.status === 'pending').length, [items]);

  const loadQueue = async () => {
    setLoading(true);
    setMessage(null);

    const { data: authData } = await supabase.auth.getUser();
    const userId = authData.user?.id ?? null;
    setModeratorUserId(userId);

    if (!userId) {
      setIsModerator(false);
      setItems([]);
      setLoading(false);
      return;
    }

    const { data: profileRow, error: profileError } = await supabase
      .from('user_profiles')
      .select('user_id, display_name, roles')
      .eq('user_id', userId)
      .maybeSingle<ProfileRow>();

    if (profileError) {
      setIsModerator(false);
      setItems([]);
      setMessage('Unable to verify moderator permissions.');
      setLoading(false);
      return;
    }

    const roles = profileRow?.roles ?? [];
    const hasModeratorRole = roles.includes('content_moderator') || roles.includes('admin');

    setIsModerator(hasModeratorRole);

    if (!hasModeratorRole) {
      setItems([]);
      setLoading(false);
      return;
    }

    const { data: itemRows, error: itemError } = await supabase
      .from('community_items')
      .select('id, user_id, product_area, item_type, title, details, status, moderation_note, created_at, moderated_at')
      .order('created_at', { ascending: false })
      .limit(100);

    if (itemError) {
      setItems([]);
      setMessage('Unable to load moderation queue right now.');
      setLoading(false);
      return;
    }

    const queueItems = (itemRows ?? []) as CommunityItemRow[];
    setItems(queueItems);

    const nextStatusDrafts: Record<string, QueueStatus> = {};
    const nextNoteDrafts: Record<string, string> = {};

    for (const item of queueItems) {
      nextStatusDrafts[item.id] = (STATUS_OPTIONS.includes(item.status as QueueStatus)
        ? (item.status as QueueStatus)
        : 'pending');
      nextNoteDrafts[item.id] = item.moderation_note ?? '';
    }

    setStatusDrafts(nextStatusDrafts);
    setNoteDrafts(nextNoteDrafts);
    setLoading(false);
  };

  useEffect(() => {
    // Defer to a microtask so the initial synchronous setState in loadQueue
    // (setLoading/setMessage) does not run during the effect's synchronous phase,
    // which react-hooks/set-state-in-effect (correctly) flags as cascading renders.
    void Promise.resolve().then(loadQueue);
  }, []);

  const handleSave = async (itemId: string) => {
    if (!moderatorUserId) return;

    const nextStatus = statusDrafts[itemId];
    const nextNote = noteDrafts[itemId] ?? '';

    setSavingId(itemId);
    setMessage(null);

    const { error } = await supabase
      .from('community_items')
      .update({
        status: nextStatus,
        moderation_note: nextNote.trim() ? nextNote.trim() : null,
        moderated_by: moderatorUserId,
        moderated_at: new Date().toISOString(),
      })
      .eq('id', itemId);

    if (error) {
      setMessage('Unable to save moderation update.');
      setSavingId(null);
      return;
    }

    await loadQueue();
    setSavingId(null);
    setMessage('Moderation update saved.');
  };

  if (loading) {
    return <p className="mt-4 text-sm text-neutral-500">Loading moderation queue…</p>;
  }

  if (!moderatorUserId) {
    return (
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        Sign in with a moderator account to review community submissions.
      </p>
    );
  }

  if (!isModerator) {
    return (
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        Your account does not currently have the content moderator role.
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Pending submissions: <span className="font-semibold text-neutral-900 dark:text-neutral-100">{pendingCount}</span>
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-neutral-500">No community submissions found.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{item.title}</p>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-neutral-300 px-2 py-0.5 text-[10px] uppercase tracking-wide dark:border-neutral-700">
                    {item.product_area.replace('_', ' ')}
                  </span>
                  <span className="rounded-full border border-neutral-300 px-2 py-0.5 text-[10px] uppercase tracking-wide dark:border-neutral-700">
                    {item.item_type}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{item.details}</p>

              <div className="mt-3 grid gap-3 md:grid-cols-[180px_1fr_auto] md:items-end">
                <label className="grid gap-1 text-xs">
                  <span className="font-medium uppercase tracking-wide text-neutral-500">Status</span>
                  <select
                    value={statusDrafts[item.id] ?? 'pending'}
                    onChange={(event) =>
                      setStatusDrafts((current) => ({
                        ...current,
                        [item.id]: event.target.value as QueueStatus,
                      }))
                    }
                    className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-1 text-xs">
                  <span className="font-medium uppercase tracking-wide text-neutral-500">Moderator note</span>
                  <input
                    value={noteDrafts[item.id] ?? ''}
                    onChange={(event) =>
                      setNoteDrafts((current) => ({
                        ...current,
                        [item.id]: event.target.value,
                      }))
                    }
                    className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                    placeholder="Optional rationale for status decision"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => void handleSave(item.id)}
                  disabled={savingId === item.id}
                  className="h-10 rounded-md border border-neutral-300 px-4 text-sm font-medium hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-900"
                >
                  {savingId === item.id ? 'Saving…' : 'Save'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {message ? <p className="text-sm text-neutral-600 dark:text-neutral-400">{message}</p> : null}
    </div>
  );
}

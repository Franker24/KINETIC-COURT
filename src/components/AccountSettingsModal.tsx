import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bell, Mail, Save, ShieldCheck, UserRound, X } from 'lucide-react';

export interface AccountProfile {
  fullName: string;
  email: string;
  favoriteTeam: string;
  notifyDrops: boolean;
  notifyRestocks: boolean;
  avatarImage: string | null;
}

interface AccountSettingsModalProps {
  isOpen: boolean;
  profile: AccountProfile;
  onClose: () => void;
  onSave: (profile: AccountProfile) => void;
}

export function AccountSettingsModal({
  isOpen,
  profile,
  onClose,
  onSave,
}: AccountSettingsModalProps) {
  const [draft, setDraft] = useState(profile);

  useEffect(() => {
    setDraft(profile);
  }, [profile, isOpen]);

  function handleAvatarUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDraft((current) => ({
        ...current,
        avatarImage: typeof reader.result === 'string' ? reader.result : null,
      }));
    };
    reader.readAsDataURL(file);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[83] bg-black/75 px-4 py-8 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="mx-auto w-full max-w-4xl rounded-[2.5rem] border border-white/10 bg-[#101010] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] lg:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff9069]">
                  Account settings
                </p>
                <h2 className="mt-2 font-headline text-4xl font-black italic uppercase tracking-tight text-white">
                  Personalize your profile
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-6">
                <div className="rounded-[2rem] border border-white/10 bg-[#151515] p-6">
                  <div className="flex items-center gap-3 text-[#ff9069]">
                    <UserRound size={18} />
                    <p className="text-xs font-bold uppercase tracking-[0.24em]">
                      Identity
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-[#101010] p-4">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#262626] text-[#ff9069]">
                      {draft.avatarImage ? (
                        <img
                          src={draft.avatarImage}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound size={32} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-headline text-xl font-black italic text-white">
                        Profile photo
                      </p>
                      <p className="mt-1 text-sm text-white/45">
                        Upload an image to use as your avatar across the app.
                      </p>
                      <label className="mt-4 inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 font-headline text-lg font-black italic tracking-tight text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]">
                        Upload photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarUpload}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <input
                      value={draft.fullName}
                      onChange={(event) =>
                        setDraft((current) => ({ ...current, fullName: event.target.value }))
                      }
                      placeholder="Full name"
                      className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-4 text-white outline-none placeholder:text-white/25 md:col-span-2"
                    />
                    <input
                      value={draft.email}
                      onChange={(event) =>
                        setDraft((current) => ({ ...current, email: event.target.value }))
                      }
                      placeholder="Email"
                      className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-4 text-white outline-none placeholder:text-white/25"
                    />
                    <input
                      value={draft.favoriteTeam}
                      onChange={(event) =>
                        setDraft((current) => ({ ...current, favoriteTeam: event.target.value }))
                      }
                      placeholder="Favorite team"
                      className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-4 text-white outline-none placeholder:text-white/25"
                    />
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#151515] p-6">
                  <div className="flex items-center gap-3 text-[#ff9069]">
                    <Bell size={18} />
                    <p className="text-xs font-bold uppercase tracking-[0.24em]">
                      Notifications
                    </p>
                  </div>
                  <div className="mt-5 space-y-4">
                    <button
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          notifyDrops: !current.notifyDrops,
                        }))
                      }
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 transition-colors ${
                        draft.notifyDrops
                          ? 'border-[#ff9069]/40 bg-[#ff9069]/10 text-white'
                          : 'border-white/10 bg-[#101010] text-white/65'
                      }`}
                    >
                      <span className="text-left">
                        <span className="block font-headline text-xl font-black italic text-white">
                          Drop alerts
                        </span>
                        <span className="text-sm text-white/45">
                          Get early access notifications for launches.
                        </span>
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em]">
                        {draft.notifyDrops ? 'On' : 'Off'}
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          notifyRestocks: !current.notifyRestocks,
                        }))
                      }
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 transition-colors ${
                        draft.notifyRestocks
                          ? 'border-[#ff9069]/40 bg-[#ff9069]/10 text-white'
                          : 'border-white/10 bg-[#101010] text-white/65'
                      }`}
                    >
                      <span className="text-left">
                        <span className="block font-headline text-xl font-black italic text-white">
                          Restock alerts
                        </span>
                        <span className="text-sm text-white/45">
                          Be notified when your sizes come back.
                        </span>
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em]">
                        {draft.notifyRestocks ? 'On' : 'Off'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <aside className="rounded-[2rem] border border-white/10 bg-[#151515] p-6">
                <div className="flex items-center gap-3 text-[#ff9069]">
                  <ShieldCheck size={18} />
                  <p className="text-xs font-bold uppercase tracking-[0.24em]">Preview</p>
                </div>
                <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-[#101010] p-5">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#262626] text-[#ff9069]">
                    {draft.avatarImage ? (
                      <img
                        src={draft.avatarImage}
                        alt="Account avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound size={32} />
                    )}
                  </div>
                  <p className="font-headline text-3xl font-black italic text-white">
                    {draft.fullName || 'Unnamed player'}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-white/50">
                    <Mail size={16} />
                    <span className="text-sm">{draft.email || 'No email set'}</span>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#ff9069]">
                    Favorite team
                  </p>
                  <p className="mt-2 font-headline text-2xl font-black italic text-white">
                    {draft.favoriteTeam || 'No team selected'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSave(draft);
                    onClose();
                  }}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#ff9069] py-4 font-headline text-lg font-black italic tracking-tight text-black transition-colors hover:bg-[#fe5e1e]"
                >
                  <Save size={18} />
                  Save account
                </button>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

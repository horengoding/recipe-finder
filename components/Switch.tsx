'use client';

type SwitchProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
};

export default function Switch({ checked, onChange, label, disabled = false }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`clay-well clay-xs relative h-9 w-16 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? 'bg-royal' : ''
      }`}
    >
      <span
        className={`clay-sm clay-xs absolute top-1 h-7 w-7 rounded-full transition-all ${
          checked ? 'left-8' : 'left-1'
        }`}
      />
    </button>
  );
}

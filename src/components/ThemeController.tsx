'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { Checkbox, Label } from 'radix-ui';
import { useEffect, useState } from 'react';

export default function ThemeController() {
  const [isDark, setIsDark] = useState(
    typeof window !== 'undefined' && localStorage.getItem('isdark') !== null,
  );

  useEffect(() => {
    if (isDark) {
      localStorage.setItem('isdark', 'true');
    } else {
      localStorage.removeItem('isdark');
    }
  }, [isDark]);

  return (
    <Label.Root className="swap swap-rotate fixed bottom-0 right-0 m-4 rounded-full p-2 shadow">
      <Checkbox.Root asChild>
        <input
          type="checkbox"
          className="theme-controller"
          value="dark"
          checked={isDark}
          onChange={() => setIsDark((prevIsDark) => !prevIsDark)}
        />
      </Checkbox.Root>
      <SunIcon className="swap-off size-8 fill-current md:size-10" />
      <MoonIcon className="swap-on size-8 fill-current md:size-10" />
    </Label.Root>
  );
}

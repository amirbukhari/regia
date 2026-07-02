'use client';

import { useEffect } from 'react';

/**
 * Loads the mockup's scripts (converted to ES modules by scripts/sync-legacy.mjs)
 * after the shell has mounted, in the same order as the original <script> tags.
 * All interactivity — nav building, routing, drawers, charts, theming — is the
 * mockup's own code operating on the React-rendered shell.
 */
export default function Boot() {
  useEffect(() => {
    import('../src/legacy/boot.js');
  }, []);
  return null;
}

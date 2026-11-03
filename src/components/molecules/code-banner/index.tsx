import { useEffect, useState } from 'react';

import useReducedMotion from '@hooks/useReducedMotion.ts';

type Kind = 'kw' | 'type' | 'str' | 'op' | 'plain';

/** Syntax palette, borrowed from a classic dark editor theme: pink keywords, cyan types, amber strings. */
const COLORS: Record<Kind, string> = {
  kw: 'text-[#f0185c]',
  type: 'text-[#17b6e8]',
  str: 'text-[#fbbf24]',
  op: 'text-[#f0185c]',
  plain: 'text-stone-100',
};

const CODE = `function ProfileBanner(user) {
  const identity = "Frontend Developer";
  const stack = ["React", "TypeScript"];
  return (
    <ProfileCover user={user}>
      <Role title={identity} />
      <TechStack items={stack} />
    </ProfileCover>
  );
}`;

type Char = { ch: string; kind: Kind };

/** Paints the kind of every character with a few regex passes (later passes win), so no highlighter library is needed. */
const highlight = (code: string): Char[] => {
  const kinds: Kind[] = Array.from({ length: code.length }, () => 'plain');

  const paint = (pattern: RegExp, kind: Kind, group = 0) => {
    for (const match of code.matchAll(pattern)) {
      const text = match[group];
      const start = (match.index ?? 0) + match[0].indexOf(text);
      for (let i = start; i < start + text.length; i++) kinds[i] = kind;
    }
  };

  paint(/=>?/g, 'op');
  paint(/\b(function|const|return)\b/g, 'kw');
  paint(/<\/?([A-Za-z]\w*)/g, 'type', 1);
  paint(/function ([A-Za-z]\w*)/g, 'type', 1);
  paint(/"[^"]*"/g, 'str');

  return Array.from(code, (ch, i) => ({ ch, kind: kinds[i] }));
};

const CHARS = highlight(CODE);

/** Small "typos": after typing `prefix`, the caret writes `wrong`, pauses, erases it and carries on. */
const TYPOS: [prefix: string, wrong: string][] = [
  ['function Prof', 'lie'],
  ['const identity = "Frontend Dev', 'lopor'],
  ['const stack = ["React", "TypeSc', 'ipt'],
  ['<Role ti', 'lte'],
];

const TYPO_AT = new Map(TYPOS.map(([prefix, wrong]) => [CODE.indexOf(prefix) + prefix.length, wrong]));

/** Types the snippet one character at a time, making (and fixing) a few mistakes on the way. */
const useTypewriter = () => {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState<Char[]>(reduced ? CHARS : []);
  const [typing, setTyping] = useState(!reduced);

  useEffect(() => {
    if (reduced) {
      setShown(CHARS);
      setTyping(false);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const sleep = (ms: number) => new Promise<void>((resolve) => (timer = setTimeout(resolve, ms)));

    (async () => {
      const out: Char[] = [];
      const render = () => setShown([...out]);

      setTyping(true);
      await sleep(700);

      for (let i = 0; i < CHARS.length; i++) {
        const wrong = TYPO_AT.get(i);

        if (wrong) {
          for (const ch of wrong) {
            out.push({ ch, kind: 'plain' });
            render();
            await sleep(70 + Math.random() * 60);
          }
          await sleep(520);
          for (let n = 0; n < wrong.length; n++) {
            out.pop();
            render();
            await sleep(65);
          }
          await sleep(300);
        }

        out.push(CHARS[i]);
        render();
        await sleep(CHARS[i].ch === '\n' ? 170 : 20 + Math.random() * 40);
        if (cancelled) return;
      }

      setTyping(false);
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduced]);

  return { shown, typing };
};

/** Groups consecutive characters of the same kind into one span. */
const runs = (chars: Char[]) =>
  chars.reduce<{ kind: Kind; text: string }[]>((acc, { ch, kind }) => {
    const last = acc[acc.length - 1];
    if (last && last.kind === kind) last.text += ch;
    else acc.push({ kind, text: ch });
    return acc;
  }, []);

/** Decorative profile banner: a React snippet that types itself on a near-black editor background. */
export const CodeBanner = () => {
  const { shown, typing } = useTypewriter();

  return (
    <div aria-hidden className="relative flex w-full items-center overflow-hidden bg-[#0a0a0a] px-8 py-6 pl-36 sm:justify-center sm:px-10 sm:py-8">
      <div className="relative font-mono text-[8px] leading-[1.6] sm:text-[11px] sm:leading-[1.65]">
        {/* The full text, invisible, reserves the final size so nothing shifts while typing. */}
        <pre className="invisible whitespace-pre">{CODE}</pre>

        <pre className="absolute inset-0 whitespace-pre">
          {runs(shown).map(({ kind, text }, index) => (
            <span key={index} className={COLORS[kind]}>
              {text}
            </span>
          ))}
          <span className={`ml-px inline-block h-[1.1em] w-[0.5em] translate-y-[0.15em] bg-stone-100/80 ${typing ? '' : 'animate-pulse'}`} />
        </pre>
      </div>
    </div>
  );
};

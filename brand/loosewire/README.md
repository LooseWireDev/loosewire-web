# Loose Wire — Brand Assets

The canonical Loose Wire mark and every export of it. **The two spec HTML files
are the source of truth** — everything else here is derived from them.

## Source of truth

| File | What it defines |
|------|-----------------|
| `final-mark-spec.html` | The bare W-wave mark: geometry, weights, opacities, colors, wordmark lockups |
| `avatars-spec.html` | 512×512 avatar variants A (paper), B (near-black), C (ink on white) |

Open either in a browser to view. The same three paths also live in
`src/components/loosewire/Logo.astro` — if the mark ever changes, change it
everywhere (spec, component, favicon, these assets).

## The mark, in numbers

- Three staggered W-wave paths in viewBox `0 0 180 100`, ~18px horizontal offset
- Ghost 30% / mid 60% / solid 100% opacity; 3.5pt strokes (4pt solid); round caps
- Color light: Ink `#1c1a14` · dark: Linen `#e8e3d6` (avatars use `#f0f0f0` on `#0f0f0f`)
- Wordmark horizontal: Courier Prime Bold `loosewire`, letter-spacing −0.02em
- Wordmark stacked: DM Mono `LOOSEWIRE`, tracking +0.20em

## Files

```
svg/
  mark.svg                    # bare mark, ink on transparent (light backgrounds)
  mark-inverse.svg            # bare mark, linen on transparent (dark backgrounds)
  avatar-light.svg            # 512×512, variant A — Google/Apple, light platforms
  avatar-dark.svg             # 512×512, variant B — GitHub, Discord, dark platforms
  avatar-white.svg            # 512×512, variant C — stark, white UI chrome
png/
  mark-light.png              # 1800×1000, transparent
  mark-dark.png               # 1800×1000, transparent (linen)
  lockup-horizontal-*.png     # mark + "loosewire", 2000×480, transparent
  lockup-stacked-*.png        # mark + LOOSEWIRE, 1100×640, transparent
  avatar-*-1024.png           # avatar variants at 1024×1024
  banner-youtube-2560x1440.png  # channel art; content inside the 1546×423 safe area
render-src/
  *.html                      # templates the PNGs were rendered from
```

## Regenerating PNGs

Rendered with the Playwright-cached headless Chromium (needs network for Google Fonts):

```sh
HS=~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell
$HS --headless --disable-gpu --default-background-color=00000000 \
  --screenshot=out.png --window-size=2000,480 --hide-scrollbars \
  --virtual-time-budget=8000 "file://$PWD/render-src/lockup-horizontal-light.html"
```

(Drop `--default-background-color` for opaque renders like the banner.)

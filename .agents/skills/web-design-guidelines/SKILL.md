---
name: web-design-guidelines
description: Review the presentation UI for accessibility, motion, layout, and usability using Vercel Web Interface Guidelines. Use for UI audits and after substantial visual changes.
---

# Web design review

Project adapter for [Vercel's web-design-guidelines skill](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md).

1. Read the local snapshot in `references/command.md`. If current rules matter and network is available, compare with `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`.
2. Review the files the user named. If none were named, review `src/` and `index.html`. Inspect rendered slides when code alone cannot establish the result.
3. Report actionable findings with file and line, ordered by impact. Check keyboard use, reduced motion, readability, image descriptions, and overflow at 1920×1080.
4. Apply `DESIGN_SYSTEM.md` and clinical privacy rules from `AGENTS.md` throughout the review.

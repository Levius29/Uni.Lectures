# Materiale di terzi incluso

| Materiale | Origine | Revisione | Licenza |
| --- | --- | --- | --- |
| `design-taste-frontend`, `image-to-code` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | `ce26fc25c0e5e8cab638f883de62d9a86ee5e45b` | MIT, `taste-skill-LICENSE` |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `063bee94c3f4df8453406c830b0a7df0f2860278` | Adattamento locale della procedura; il repository upstream non contiene un file di licenza alla revisione indicata. |
| Regole Web Interface Guidelines | [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) | `e3d624baaf29dc1fc645aff3e38f03e564d2d6b1` | MIT, `web-interface-guidelines-LICENSE` |
| `playwright-cli` skill | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) | `74354ecc7a43da16d91a9bc54fa8db8283a3fcf5` | Apache-2.0, `playwright-cli-LICENSE` |
| `apple-design` | [dickwu/apple-design-skill](https://github.com/dickwu/apple-design-skill) | `39ea3fbab3011e0798c076dbeabf4917001499da` | Il repository upstream non contiene un file di licenza. I testi in `references/hig/` sono di Apple Inc., riprodotti dalle [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) con link alla fonte in ogni file. |
| `impeccable` (skill 4.4.0 e 4 agenti) | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8` | Apache-2.0, `impeccable-LICENSE`. Copiata dalle build già compilate del repository perché `npx impeccable install` falliva il download; hook non installati. |
| `slideshow`, `hyperframes-core`, `hyperframes-animation`, `hyperframes-cli` | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) (cartella `skills/`) | `34552a21d20e688cfa7a62925c53dee9a2634eff` (CLI 0.8.138) | Apache-2.0, `hyperframes-LICENSE`. Copiate senza modifiche; i rimandi a `../hyperframes/` (skill di instradamento non inclusa) restano senza destinazione. Il motore (`hyperframes`, `@hyperframes/player`, `@hyperframes/core`) arriva da npm. |
| Font Inter (variabile) | [@fontsource-variable/inter](https://fontsource.org/fonts/inter) via npm, incluso nella build e copiato accanto a ogni composizione HyperFrames | 5.3.0 | SIL OFL 1.1, nel pacchetto npm |
| 2 schede `DESIGN.md` | [VoltAgent/awesome-design-md](https://github.com/voltagent/awesome-design-md) | `f6961238d5cddcf8042a74a70fc400ec67181abb` | MIT, `awesome-design-md-LICENSE` |

Le dipendenze npm mantengono licenze e versioni in `package-lock.json`. Le copie delle skill sono in `.agents/skills/`; `.claude/skills/` contiene collegamenti simbolici agli stessi file, tranne `impeccable`, che upstream compila in versioni diverse per Claude e Codex.
La skill `playwright-cli` ha una nota iniziale adattata all'installazione locale del progetto.
`web-design-guidelines` usa una guida locale aggiornata alla revisione indicata; può confrontarla con la fonte quando è disponibile la rete.

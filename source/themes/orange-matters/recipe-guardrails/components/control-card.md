## Orange Matters guardrails

- Keep descriptions practical and short; never expose prompts, implementation notes, or agent explanations.
- Place short toggles, selects, segmented controls, and icon buttons in `controls`; use `children` for denser content.
- Use `footer` only when actions need separation from the control row.
- Do not nest another card inside a Control Card.
- On narrow screens, let header controls wrap below the title instead of forcing document overflow.

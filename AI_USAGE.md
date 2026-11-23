# AI Usage Disclosure

This document discloses the use of AI tools during the development of the **FocusBoard** task management dashboard application, in accordance with the assignment guidelines.

---

## 1. Tools Used

- **Antigravity (Google DeepMind)** powered by Gemini 3.8
- **Browser Automation Assistant** for verifying live DOM rendering, responsiveness, and interaction testing

---

## 2. Representative Prompts

The following prompts illustrate key areas where AI assistance was utilized:

1. **Design Analysis & Token Extraction**:
   > *"Inspect the Figma design frames for FocusBoard (`Desktop dashboard · 1440 × 1000`, `Mobile dashboard · 390 × 1128`, `New task form · 760 × 822`, and `Focus Notes carousel slides 1-3`). Extract exact color codes, typography, layout hierarchy, badge variants, and responsive behaviors."*

2. **Component Architecture & Clean Code**:
   > *"Structure the project using React.js + Vite with modular, single-responsibility components: `Sidebar`, `Header`, `FocusNotes`, `StatCard`, `SearchBar`, `FilterTabs`, `TaskList`, `TaskCard`, `TaskForm`, `DeleteModal`, and `MobileDock`."*

3. **State Management & Edge Cases**:
   > *"Implement custom `useLocalStorage` persistence hook that reads and writes state safely without overwriting user data on reload, and derive real-time statistics (total, in-progress, completed, completion rate) dynamically without hardcoding."*

4. **Responsive Layout & Accessibility Audit**:
   > *"Audit accessibility for WCAG 2.1 AA compliance: ensure semantic HTML elements, ARIA attributes (`role='tablist'`, `role='dialog'`, `aria-modal`), keyboard navigation (Escape to close modals, arrow keys for carousel), and responsive behavior across 390px, 768px, and 1440px."*

---

## 3. AI-Assisted Areas

- **Figma Design Inspection**: Extracted precise content and visual structure from the provided Figma file and screenshots.
- **Component Design & Modular Layout**: Scaffolded atomic components matching the specified file structure.
- **Dynamic Filter & Search Combination**: Crafted multi-criteria filter logic combining real-time keyword search, status tabs, and priority filters.
- **Accessibility & Form Validation**: Built accessible modals with autofocus, input validation, whitespace trimming, and keyboard traps.

---

## 4. Verified and Corrected Suggestion

During the calculation of dashboard statistics, the initial proposal for completion rate used `Math.round((completed / total) * 100)`. 

- **Issue Identified**: If a user deletes all tasks from the dashboard, `total` becomes `0`, resulting in `0 / 0 = NaN`. Displaying `NaN%` breaks the UI and fails the edge-case requirement.
- **Correction Applied**: Implemented explicit defensive checks:
  ```javascript
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  ```
- **Storage Protection Verified**: Verified that `useLocalStorage` initializes with sample tasks **only** when no previous data exists in `localStorage`. If the user intentionally removes all tasks or modifies existing tasks, refreshing the browser correctly retains the user's modifications rather than resetting back to the initial sample data.

# FocusBoard — Task Management Dashboard

FocusBoard is a responsive, single-user task management dashboard built with **React**, **Vite**, and **Tailwind CSS**, based strictly on the Figma design specifications.

---

## 🌟 Key Features

1. **Calculated Dashboard Statistics (Dynamic)**
   - **Total Tasks**: Dynamic count across all categories and statuses.
   - **In Progress**: Real-time count of active ongoing tasks.
   - **Completed**: Real-time count of completed tasks.
   - **Completion Rate**: Calculated dynamically via `Math.round((completed / total) * 100)` with safe zero-division handling.
   - All statistics update immediately upon task creation, editing, deletion, or status toggle without reloading.

2. **Focus Notes Carousel (3 Slides)**
   - Replicates all 3 Figma slides:
     - **Slide 1**: *Make today count.* (`01 / 03`)
     - **Slide 2**: *Small steps, big progress.* (`02 / 03`)
     - **Slide 3**: *Celebrate the wins.* (`03 / 03`)
   - Interactive Previous (`<`) and Next (`>`) circular navigation.
   - Active slide indicators (dash indicators) that allow direct slide jumping.
   - Floating task progress preview card with gradient background and subtle drop shadows.

3. **Complete Task CRUD Functionality**
   - **Create Task**: Accessible modal dialog (`TaskForm`) with required title validation, whitespace trimming, optional description, category selection, status, priority, and due date.
   - **Edit Task**: Reusable modal pre-populated with task data, modifying existing records while preserving unique IDs.
   - **Delete Task**: Accessible confirmation modal (`DeleteModal`) with destructive danger prompt preventing accidental loss.
   - **Status Toggle**: Quick one-click checkbox toggle or status dropdown directly on task cards.

4. **Multi-Filter & Real-Time Search**
   - **Case-Insensitive Search**: Instant title/description keyword matching as the user types.
   - **Status Tabs**: `All tasks`, `To do`, `In progress`, and `Completed` with dynamic counts.
   - **Priority Filter**: Dropdown filter for `All`, `High`, `Medium`, and `Low`.
   - **Unified Logic**: Search, status tabs, and priority filters work together seamlessly with an active filter reset button.

5. **Local Persistence (localStorage)**
   - Custom `useLocalStorage` hook persists all modifications under key `focusboard_tasks`.
   - Restores saved state on reload without overwriting user data with sample records.
   - Initial sample dataset seeds only on first-time launch.

6. **Responsive Design (390px, 768px, 1440px)**
   - **Desktop (1440px)**: Multi-column layout with left navigation sidebar, hero banner, 4-column metric cards, and task list.
   - **Tablet (768px)**: Reflowed 2-column statistics cards, responsive search and filter controls.
   - **Mobile (390px)**: Stacked cards, touch-optimized button targets, mobile menu drawer, and fixed bottom navigation dock.

7. **Accessibility (a11y)**
   - Semantic HTML elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<aside>`).
   - Accessible ARIA attributes (`role="tablist"`, `role="tab"`, `role="dialog"`, `aria-modal="true"`, `aria-selected`).
   - Keyboard accessible navigation (arrow keys for carousel, Escape to close modals, Tab focus rings).
   - High color contrast compliant with WCAG 2.1 AA.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Declarative component-based UI architecture |
| **Vite 6** | Ultra-fast development server and production bundler |
| **Tailwind CSS v4** | Utility-first CSS matching Figma spacing, colors, and responsive breakpoints |
| **Lucide React** | Clean, accessible vector icons |
| **Browser localStorage API** | Client-side state persistence across sessions |

---

## 📂 Project Structure

```text
focusboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Sidebar.jsx        # Left desktop navigation & mobile drawer
│   │   ├── Header.jsx         # Top bar with breadcrumb and user profile
│   │   ├── FocusNotes.jsx     # 3-slide hero carousel with controls
│   │   ├── StatCard.jsx       # Dynamic metric card with trend badge
│   │   ├── SearchBar.jsx      # Instant keyword search input
│   │   ├── FilterTabs.jsx     # Status tabs & priority dropdown
│   │   ├── TaskList.jsx       # Task list container & empty state
│   │   ├── TaskCard.jsx       # Individual task row with status controls
│   │   ├── TaskForm.jsx       # Reusable create/edit task modal
│   │   ├── DeleteModal.jsx    # Accessible deletion confirmation dialog
│   │   └── MobileDock.jsx     # Fixed bottom dock for mobile viewports
│   ├── data/
│   │   └── sampleTasks.js     # Initial sample task dataset & carousel data
│   ├── hooks/
│   │   └── useLocalStorage.js # Custom hook for safe localStorage sync
│   ├── App.jsx                # Single source of truth and state coordinator
│   ├── main.jsx               # React DOM entry point
│   └── index.css              # Global styles, fonts, and Tailwind directives
├── screenshots/
│   ├── desktop.png            # Desktop view at 1440px
│   └── mobile.png             # Mobile view at 390px
├── AI_USAGE.md                # Mandatory AI disclosure report
├── README.md                  # Project documentation
├── package.json               # Dependencies and scripts
└── vite.config.js             # Vite and Tailwind configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd focusboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

- **Development Mode**:
  ```bash
  npm run dev
  ```
  Open `http://localhost:5173` in your browser.

- **Production Build & Preview**:
  ```bash
  npm run build
  npm run preview
  ```

---

## 🧠 State Management Explanation

- **Single Source of Truth**: All task state is maintained in `App.jsx` using React's `useState` through the custom `useLocalStorage` hook.
- **Predictable Mutations**: All mutations (create, edit, delete, status toggle) use immutable functional state updates (`setTasks(prev => ...)`).
- **Derived Values**: Statistics and filtered lists are computed reactively using `useMemo`. When task data or filter criteria change, all metric counters, completion rates, and list views update synchronously without duplicate state synchronization bugs.
- **Carousel State**: Controlled within `FocusNotes.jsx` via active slide index with boundary protection and circular next/previous handlers.

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your `focusboard` repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **Deploy**.

### Deploy to Netlify
1. Sign in to [Netlify](https://www.netlify.com/) and click **Add new site > Import an existing project**.
2. Connect your GitHub repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy FocusBoard**.

---

## 📄 Submission Details

- **Candidate**: Abhisek Behera
- **Framework**: React.js + Vite
- **Hosting URL**: *(Ready for Vercel/Netlify deployment)*
- **GitHub Repository**: https://github.com/Abhisek1233/FocusBoard-Assignment

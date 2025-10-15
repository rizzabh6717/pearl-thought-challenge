# Frontend Challenge Submission

**Candidate Name:** Rishabh Chaudhary
**Date:** October 16, 2025
**Time Spent:** 4 hours

---

## ✅ Completed Features

Mark which features you completed:

### Core Features
- [x] Day View calendar (time slots 8 AM - 6 PM with 30-minute intervals)
- [x] Week View calendar (7-day grid with Monday-Sunday layout)
- [x] Doctor selector dropdown with specialty and working hours display
- [x] Appointment rendering with correct positioning and overlap handling
- [x] Color-coding by appointment type (checkup, consultation, followup, procedure)
- [x] Service layer implementation (AppointmentService class)
- [x] Custom hooks (useAppointments, useWeekAppointments)
- [x] Component composition with reusable AppointmentCard
- [x] Date picker with calendar popover
- [x] View toggle between day and week views

### Bonus Features (if any)
- [ ] Current time indicator
- [x] Responsive design (mobile-friendly with horizontal scroll for week view)
- [x] Empty states (shows "No appointments" when slots are empty)
- [x] Loading states (skeleton loaders during data fetching)
- [x] Error handling (graceful fallbacks for missing data)
- [ ] Appointment search/filter
- [x] Dark mode support (via Tailwind CSS dark mode classes)
- [x] Accessibility improvements (proper ARIA labels, semantic HTML)
- [x] Compact appointment cards for week view
- [x] Working hours display for selected doctor

---

## 🏗️ Architecture Decisions

### Component Structure

**Your structure:**
```
Schedule (main page container)
├── DoctorSelector (doctor dropdown with working hours)
├── Date Picker (calendar popover)
├── View Toggle (day/week buttons)
├── DayView (day calendar)
│   ├── Time slots grid (8 AM - 6 PM)
│   └── AppointmentCard (reusable)
└── WeekView (week calendar)
    ├── 7-day grid layout
    └── AppointmentCard (compact mode)
```

**Why did you structure it this way?**
The component hierarchy follows a clear separation of concerns where:
- `Schedule` page manages the overall state and data flow
- `DoctorSelector` handles doctor selection with specialty and working hours display
- Date picker and view toggle are integrated into the header for better UX
- `DayView` and `WeekView` are separate components for better maintainability
- Reusable `AppointmentCard` components with compact mode ensure consistent styling
- Each component has a single responsibility and clear interfaces

---

### State Management

**What state management approach did you use?**
- [x] Custom hooks (headless pattern)
- [x] Local component state with useState
- [x] React Query for data fetching (configured but using mock data)

**Why did you choose this approach?**
- Custom hooks (`useAppointments`, `useWeekAppointments`) encapsulate business logic and data fetching
- Keeps components focused on presentation and UI concerns
- Makes the code more testable and reusable across different views
- Reduces prop drilling and provides clean separation of concerns
- Simulated API delays with setTimeout for realistic loading states

---

### Service Layer

**How did you structure your data access?**
Created an `AppointmentService` class that handles all data operations, following the repository pattern with singleton instance.

**What methods did you implement in AppointmentService?**
- [x] `getAllDoctors()` - Returns all available doctors
- [x] `getDoctorById(id: string)` - Gets doctor by ID
- [x] `getPatientById(id: string)` - Gets patient by ID
- [x] `getAppointmentsByDoctorAndDate(doctorId: string, date: Date)` - Gets appointments for specific doctor and date
- [x] `getAppointmentsByDoctorAndWeek(doctorId: string, startDate: Date)` - Gets appointments for doctor across a week
- [x] `getAppointmentsForTimeSlot(appointments: Appointment[], slotStart: Date, slotEnd: Date)` - Filters appointments that overlap with a time slot

---

### Custom Hooks

**What custom hooks did you create?**
1. `useAppointments(doctorId: string, date: Date)` - Manages day view appointment data
   - Handles appointment fetching for a specific doctor and date
   - Generates time slots (8 AM - 6 PM, 30-minute intervals)
   - Provides `getAppointmentsForSlot` utility function
   - Manages loading states with simulated API delay

2. `useWeekAppointments(doctorId: string, startDate: Date)` - Manages week view appointment data
   - Handles appointment fetching for a doctor across a week
   - Generates week days array (7 days from start date)
   - Manages loading states with simulated API delay

**How do they demonstrate the headless pattern?**
- Hooks handle all data logic and business rules
- Components are purely presentational and focused on UI
- Easy to test and modify business logic independently
- Clean separation between data fetching and rendering concerns

---

## 🎨 UI/UX Decisions

### Calendar Rendering

**How did you generate time slots?**
- Generated time slots programmatically in `useAppointments` hook
- Created slots from 8 AM to 6 PM with 30-minute intervals
- Used `date-fns` format function for consistent time labeling
- Each slot includes start/end Date objects and formatted label

**How did you position appointments in time slots?**
- Used grid-based layout with CSS Grid for consistent positioning
- Day view: 2-column grid (time labels + appointment area)
- Week view: 8-column grid (time + 7 days)
- Appointments are positioned within their respective time slot containers

**How did you handle overlapping appointments?**
- Used `getAppointmentsForTimeSlot` method to filter overlapping appointments
- Appointments are stacked vertically within the same time slot
- Each appointment maintains its own space with proper spacing
- Compact mode for week view to fit multiple appointments

---

### Responsive Design

**Is your calendar mobile-friendly?**
- [x] Yes, fully responsive

**What responsive strategies did you use?**
- Mobile-first CSS with Tailwind's responsive utilities
- Horizontal scrolling for week view on small screens (`overflow-x-auto`)
- Responsive grid layouts that adapt to screen size
- Touch-friendly tap targets with proper spacing
- Responsive header layout (flex-col on mobile, flex-row on desktop)
- Minimum width constraints for week view to maintain usability

---

## 🧪 Testing & Quality

### Code Quality

**Did you run these checks?**
- [x] `npm run lint` - No errors
- [x] `npm run type-check` - No TypeScript errors
- [x] `npm run build` - Builds successfully
- [x] Manual testing - All features work

### Testing Approach

**Did you write any tests?**
- [ ] Yes (describe below)
- [x] No (ran out of time)

---

## 🤔 Assumptions Made

1. All appointments are within working hours (8 AM - 6 PM)
2. No need for authentication in this implementation
3. Mock data is sufficient for demonstration purposes
4. Timezone handling is simplified to local time
5. Week view starts on Monday (standard business week)
6. 30-minute time slots are appropriate for all appointment types
7. Appointments can overlap and will be displayed side-by-side

---

## ⚠️ Known Issues / Limitations

1. Week view might have performance issues with many appointments (no virtualization)
2. No support for recurring appointments
3. Limited error handling for edge cases (missing patient data, invalid dates)
4. No data persistence (all in-memory mock data)
5. No drag-and-drop functionality for rescheduling
6. No real-time updates or WebSocket integration
7. Week view horizontal scroll could be improved on very small screens

---

## 🚀 Future Improvements

1. Add drag-and-drop for rescheduling appointments
2. Implement virtual scrolling for week view with many appointments
3. Add more robust error boundaries and error handling
4. Implement proper timezone support
5. Add more accessibility features (keyboard navigation, screen reader support)
6. Add appointment search and filtering capabilities
7. Implement real-time updates with WebSocket integration
8. Add appointment creation and editing functionality
9. Implement data persistence with a backend API
10. Add print-friendly views for schedules

---

## 💭 Challenges & Learnings

### Biggest Challenge
Implementing the week view with proper time slot calculations and appointment positioning was the most challenging part. Coordinating the 8-column grid layout with proper appointment filtering and display required careful attention to date/time logic.

### What Did You Learn?
- Deeper understanding of date manipulation with date-fns
- Better state management with custom hooks and the headless pattern
- Improved TypeScript typing for complex data structures
- Effective use of CSS Grid for calendar layouts
- Integration of shadcn/ui components with custom business logic

### What Are You Most Proud Of?
The clean separation of concerns between data fetching (hooks), business logic (services), and presentation layers (components). The reusable AppointmentCard component with compact mode for different views demonstrates good component design principles.

---

## 🎯 Trade-offs

### Time vs. Features
Spent most time on:
- [x] Architecture/planning
- [x] Week view implementation
- [x] Styling/polish (shadcn/ui integration)
- [x] Refactoring (component composition)

### Technical Trade-offs
- Used simple array operations instead of more complex data structures for time slot calculations to keep the code simple and maintainable
- Chose to implement a custom solution instead of using a calendar library for more control over the specific requirements
- Used CSS Grid instead of absolute positioning for better responsive behavior
- Implemented mock data with simulated delays instead of real API integration for faster development

---

## 📁 Project Structure

```
healthe-grid/
├── src/
│   ├── components/
│   │   ├── AppointmentCard.tsx      # Reusable appointment display component
│   │   ├── DayView.tsx              # Day calendar view implementation
│   │   ├── WeekView.tsx             # Week calendar view implementation
│   │   ├── DoctorSelector.tsx       # Doctor selection dropdown
│   │   └── ui/                      # shadcn/ui component library
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── popover.tsx
│   │       ├── select.tsx
│   │       ├── skeleton.tsx
│   │       └── ... (40+ UI components)
│   ├── hooks/
│   │   └── useAppointments.ts       # Custom hooks for data management
│   ├── services/
│   │   └── appointmentService.ts    # Data access layer
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── data/
│   │   └── mockData.ts              # Mock data for doctors, patients, appointments
│   ├── pages/
│   │   ├── Index.tsx                # Landing page
│   │   ├── Schedule.tsx             # Main schedule page
│   │   └── NotFound.tsx             # 404 page
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   ├── App.tsx                      # Main app component with routing
│   └── main.tsx                     # Application entry point
├── public/                          # Static assets
├── package.json                     # Dependencies and scripts
├── tailwind.config.ts               # Tailwind CSS configuration
├── vite.config.ts                   # Vite build configuration
└── tsconfig.json                    # TypeScript configuration
```

**Key Architecture Decisions:**
- **Component-based structure**: Each major feature has its own component
- **Separation of concerns**: Hooks handle logic, components handle presentation
- **Service layer**: Centralized data access through AppointmentService
- **Type safety**: Comprehensive TypeScript definitions
- **UI consistency**: shadcn/ui components for consistent design system

---

## 📚 Libraries & Tools Used

### Third-Party Libraries
**Core Framework:**
- [x] React 18.3.1 (UI framework)
- [x] TypeScript 5.8.3 (type safety)
- [x] Vite 5.4.19 (build tool and dev server)

**UI Component Libraries:**
- [x] Radix UI (headless UI components - Select, Popover, Calendar, etc.)
- [x] shadcn/ui (pre-built component library)
- [x] Lucide React (icon library)
- [x] Tailwind CSS (utility-first CSS framework)

**Date/Calendar Libraries:**
- [x] date-fns 3.6.0 (date utilities and formatting)
- [x] react-day-picker 8.10.1 (calendar component)

**State Management & Data Fetching:**
- [x] @tanstack/react-query 5.83.0 (data fetching and caching)
- [x] React Router DOM 6.30.1 (client-side routing)

**Utility Libraries:**
- [x] clsx 2.1.1 (conditional class names)
- [x] tailwind-merge 2.6.0 (Tailwind class merging)
- [x] class-variance-authority (component variant management)

### AI Tools & Documentation
**AI Coding Assistants:**
- [x] Used for boilerplate code generation
- [x] Debugging complex date calculations

**Documentation & Resources:**
- [x] React documentation
- [x] Next.js documentation
- [x] date-fns documentation
- [x] TypeScript documentation
- [x] Tailwind CSS documentation

---

## 📝 Additional Notes

The application is built with scalability in mind. The architecture allows for easy addition of new features like:
- User authentication and role-based access control
- Real-time updates with WebSocket integration
- More complex appointment types and recurring appointments
- Integration with external calendar services (Google Calendar, Outlook)
- Advanced filtering and search capabilities
- Appointment conflict detection and resolution
- Multi-language support
- Advanced reporting and analytics

**Key Technical Highlights:**
- **Type Safety**: Comprehensive TypeScript coverage with proper interfaces
- **Component Reusability**: AppointmentCard component works in both day and week views
- **Performance**: Efficient data filtering and rendering with minimal re-renders
- **Accessibility**: Semantic HTML structure and proper ARIA labels
- **Responsive Design**: Mobile-first approach with graceful degradation
- **Code Organization**: Clear separation of concerns with hooks, services, and components

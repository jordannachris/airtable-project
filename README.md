# Timeline Component

A React TypeScript timeline component that visualizes items in a compact, space-efficient horizontal layout.

![timeline-working](https://github.com/user-attachments/assets/aac2d4bc-aab3-440a-aa38-96c284904b8f)

## Features

- **Compact Lane Assignment**: Items that don't overlap share lanes to maximize space efficiency
- **Zoom Functionality**: Zoom in/out to view different levels of detail
- **Inline Editing**: Click any timeline item to edit its name
- **Responsive Design**: Horizontal scrolling for large timelines
- **Color Coding**: Visual distinction between different items
- **Pure CSS Styling**: No external CSS frameworks required - works reliably on all systems

## Technologies Used

- **React 18** - Component framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Pure CSS** - Custom CSS styling for maximum compatibility
- **Lucide React** - Icon library for UI elements
- **Date utilities** - Custom date manipulation functions

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   npm install lucide-react
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Project Structure

```
src/
├── components/
│   ├── Timeline.tsx              # Main timeline component
│   ├── TimelineHeader.tsx        # Date header component
│   └── TimelineItemComponent.tsx # Individual timeline item
├── types/
│   └── timeline.ts               # TypeScript interfaces
├── utils/
│   └── assignLanes.js                # Lane assignment algorithm
├── data/
│   └── timelineItems.js              # Sample data
├── App.tsx                       # Main application
├── App.css                       # Application-specific styles
└── index.css                     # Global styles and timeline CSS
```

## Implementation Details

### What I Like About This Implementation

1. **Clean Architecture**: Separated concerns with dedicated components for different parts of the timeline
2. **Type Safety**: Full TypeScript implementation with proper interfaces
3. **Performance**: Efficient lane assignment algorithm and memoized calculations
4. **User Experience**: Intuitive zoom controls and inline editing
5. **Responsive**: Works well on different screen sizes with horizontal scrolling
6. **Cross-Platform Compatibility**: Pure CSS ensures consistent behavior across all operating systems
7. **No Build Dependencies**: No CSS preprocessing or framework configuration required

### What I Would Change If Doing It Again

1. **Drag and Drop**: Would implement drag-and-drop functionality for changing dates
2. **Virtual Scrolling**: For very large datasets, implement virtual scrolling
3. **Date Range Selection**: Add ability to filter timeline by date ranges
4. **Accessibility**: Add better keyboard navigation and screen reader support
5. **Animations**: Smooth transitions when items change positions

### Design Decisions

1. **Lane Assignment**: Used a greedy algorithm that assigns items to the first available lane, with a small buffer between items for readability
2. **Color Scheme**: Used a rotating set of colors to distinguish items visually
3. **Zoom Implementation**: Simple scaling factor that affects day width
4. **Date Handling**: Used native Date objects with custom utility functions rather than external libraries
5. **Layout**: Horizontal timeline with fixed lane heights for consistency
6. **Styling Approach**: Chose pure CSS over frameworks for maximum compatibility and minimal dependencies

### Inspiration

- Looked at Gantt charts and project management tools like Asana and Monday.com
- Considered Google Calendar's week view for lane-based layouts

### Testing Strategy (If I Had More Time)

1. **Unit Tests**: Test the lane assignment algorithm with various edge cases
2. **Component Tests**: Test React components with React Testing Library
3. **Integration Tests**: Test the full timeline with user interactions
4. **Visual Regression Tests**: Ensure UI consistency across changes
5. **Performance Tests**: Test with large datasets to ensure smooth performance

## Dependencies

### Required Dependencies

- `react` - Core React library
- `react-dom` - React DOM rendering
- `typescript` - TypeScript support
- `lucide-react` - Icons for zoom controls

### Development Dependencies

- `vite` - Build tool and development server
- `@vitejs/plugin-react` - React support for Vite
- TypeScript configuration files

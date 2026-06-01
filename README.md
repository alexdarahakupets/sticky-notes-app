# sticky-notes-app

Things implemented:
- Create a new note of the specified size at the specified position.
- Change note size by dragging.
- Move a note by dragging.
- Remove a note by dragging it over a predefined "trash" zone.
- Entering/editing note text.
- Moving notes to front (in case of overlapping notes).
- Saving notes to local storage (restoring them on page load).
- Different note colors.

The solution is pretty straightforward. As a source of truth we have a notes object in `/src/component/drag-area.tsx`, in the beginning it is either empty or fetched from localstorage. An object was chosen over an array, so the update and delete operations take O(1) time. Notes position/size updates get written into the note itself during the drag, after the manipulation is finished (onPointerUp) - the main notes object gets updated. The position is manipulated via the `transform` propery. In components, values that are used during render are stored in `useState`, if not - in `useRef`. Default values are moved out to `/constants`.
## Prerequisites

I've been using next verisons. You can either switch to them straightaway, or try them if it doesn't work with your current ones

```
node: v24.14.0
npm: 11.9.0
```

## Installation

Clone this repository, then install the dependencies and it should be good to go

```
git clone git@github.com:alexdarahakupets/sticky-notes-app.git
cd sticky-notes-app
npm install
```

## Usage

You can start the app locally by running `npm run dev` and navigating to http://localhost:5173/ . Hope you'll like it!

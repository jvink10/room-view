# Room View
Version 1.1.1

## Changelog
- Fixed photosphere visibility determination to not require default groups
- Fixed new photosphere initial groups
- Fixed list item changing colours
- Added GroupList component
- Added ability to create, delete, and name custom groups and sub groups
- Groups and sub groups now have ids
- Color visibility is determined in room settings
- Photosphere groups can be changed from photosphere list
- Removed default groups

# To Add:

## Features
- Add ability to change photosphere list order
- Make photosphere list items open with a transition
- Give indication of which list item refers to which photosphere
- Add a tutorial
- Add photosphere page
- Room settings (layers, map scale)
- Add loading indication
- Add accounts and database storage
- Add favicon
- Dynamically change title
- Make buttons and such prettier

## Fix
- Fix fullscreen mode for mobile
- Make photosphere list scrollable instead of page scrolling
- Room background height and width setting
- Room sizing on mobile with tabs

## Task
- newVariable = [...prevVariable] have new or updated. Choose one consistently

## Experiment
- Swap react-photo-sphere-viewer out with photo-sphere-viewer
- Add equirectangular tiles adapter to photospheres for faster load https://photo-sphere-viewer.js.org/guide/adapters/equirectangular-tiles.html#example
- Remove map and photospheres from home page for faster load
- Actual google maps implementation
- Consider placing nearly everything, including room and photosphere tabs into components

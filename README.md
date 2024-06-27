# Real-Time Animation Editor with Collaboration

## Technology Stack

- React
- Typescript
- Styled Components
- GraphQL
- Yjs
- Zustand

## Instructions

- Select any Lottie File / Upload your own file
- Update colour, frame rate, remove layers, update height and width
- There is a common scenario where if one user edits something on one screen, it causes the other screen's animation to stop playing (if it was playing)

## Conclusion

I would say that while I have attempted my best to make the user experience a smooth and enjoyable one, I will have to admit that there are several issues with the current implementation.

Things I liked about what I have done -

- Pretty good user interface (drop zone, grid of lottie GIFs, selection of layers and updating of colours, etc)
- Code organized as cleanly as possible
- Picked up Yjs

Things that can be improved -

- Integration between React, Zustand and Yjs
- Decoupling of the shared object across browsers
- Several things like assets/image rendering, replacing image are not done

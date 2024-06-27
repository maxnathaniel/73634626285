# Real-Time Animation Editor with Collaboration

## Technology Stack

- React
- Typescript
- Styled Components
- GraphQL
- Yjs
- Zustand (always wanted to try it out)

## Instructions

- Select any Lottie File / Upload your own file
- If 2 or more screens are open, I believe that the moment one user selects a Lottie file, the rest of the users will see the same file. While I understand that
  this is not necessarily representative of how the product behave, this will not stop you from testing out the live updates
- There is a scenario where the app can hit a runtime exception and this is largely due to my lack of experience of using CRDT libraries like Yjs. Because the different sessions
  use the same shared state, I can see how it adds to the complexity. I'm confident that with more time, this is something I can master and handle better

## Conclusion

I would say that while I have attempted my best to make the user experience a smooth and enjoyable one, I will have to admit that there are several issues with the current implementation.

Things I liked about what I have done -

- Pretty good user interface (drop zone, grid of lottie GIFs, selection of layers and updating of colours, etc)
- Code organized as cleanly as possible
- Picked up Yjs as best as I could

Things that can be improved -

- Integration between React, Zustand and Yjs
- Decoupling of the shared object across browsers
- Several things like assets/image rendering, replacing image are not done

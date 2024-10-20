# givet

Let form children own their state. On submit, bubble the data up the tree.

## Motivation

TL;DR: you shouldn't need state management library for your form components when the only time the data is needed at the root is when you're submitting it.

Normally, state sits at the top of the component tree. The recommendation is to keep state at the nearest common ancestor of all components that need it.

For form logic and state, this doesn't work well. You either end up with unclear data flow, or a big reducer. What's worse, the way you will want to manage state in the components may not match the format you'll want to send to the server. Finally, how do you test the smaller parts of the form? You can't without reproducing the entire state tree. We want to build composable components that can be tested independently. Form components shouldn't depend on the rest of the app.

When you think about it, you only need the full form data when you're submitting it. Why require state management at the root when you only need the data on submit? Instead, we let the child components manage their own state, and when the user triggers a form submission, we traverse the children, from the bottom up, collect the data, and submit it.

This is the opposite of how React states normally works. Normally, state is owned by a common parent and it's the children that trigger state updates. With forms, we do the opposite. The form submission happens at the common ancestor and the children are responsible for managing their internal state.

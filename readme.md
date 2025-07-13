
# TODO LIST

*COMPANY* : CODTECH IT SOLUTIONS

*NAME* : JAGRUTI POTHAL

*INTERN ID* : CT06DG1185

*DOMAIN* : SOFTWARE DEVELOPMENT 

*DURATION* : 4 WEEKS

*MENTOR* : NEELA SANTHOSH KUMAR

#  Modern ToDoMVC - Code Refactoring & Feature Enhancement

This project is a refactored and enhanced version of a minimalist JavaScript-based ToDo web application. As part of an internship task focused on **code refactoring**, **feature enhancement**, and **performance optimization**, I implemented several functional and visual upgrades to improve both the user experience and the code structure.

---

##  Objectives

The main goals of the task were:

- Refactor and clean up the existing codebase
- Improve functionality by adding advanced task management features
- Enhance the visual appearance for a modern, user-friendly interface
- Maintain performance and ensure cross-browser compatibility

---

##  Key Enhancements Made

###  1. **Priority Setting for Tasks**
I introduced a **priority dropdown selector** that allows users to assign a priority (High, Medium, Low) to each task during creation or after. This feature was implemented by:

- Extending the `TodoStore` class to store a `priority` value for each task
- Updating the `app.js` logic to render the priority selector with the correct value
- Ensuring that the priority is saved and updated in `localStorage` when modified

The priority selector visually highlights how important each task is, helping users manage workloads more effectively.

---

###  2. **Filter by Priority**
To allow better task organization, I implemented a **priority filter dropdown** in the footer. This lets users view tasks by their priority level (High, Medium, Low, or All). This feature was built by:

- Adding a new `<select>` element with id `priority-filter`
- Listening for `change` events in `app.js` to update the filter value
- Filtering the displayed task list dynamically based on both priority and completion status

This greatly improves usability for users dealing with large lists of tasks.

---

###  3. **Modify Task Title (In-Place Editing)**
I enabled **double-click editing** for any task, allowing users to change its title inline. The logic includes:

- Double-clicking a task label toggles it into "editing mode"
- Pressing Enter saves the new title
- Pressing Escape cancels editing
- On focus out, it renders the latest task list

This is handled cleanly using event delegation and maintains data integrity through `Todos.update()`.

---

###  4. **UI/UX Overhaul**
To create a more appealing and modern look, I revamped the CSS. Key improvements include:

- Applied a **soft blue color scheme** across the app for a calm and clean look
- Added **rounded corners**, **soft shadows**, and **font smoothing**
- Used the `Inter` font for a modern and readable text appearance
- Styled elements like filter buttons, task items, and dropdowns with hover effects and visual feedback
- Hiding the edit input field when not in use to avoid UI clutter

These changes make the app visually pleasing and intuitive for users on both desktop and mobile browsers.

---

##  Code Refactoring Summary

- Organized `app.js` logic by separating DOM operations (`App.$`) and event binding
- Refactored repetitive rendering code into reusable methods like `App.render()` and `App.createTodoItem()`
- Used ES6+ syntax and modular structure to enhance readability and maintainability
- Ensured clean separation of concerns across `app.js`, `store.js`, and `helpers.js`

---

## 📦 Folder Structure

- index.html
- css/index.css
- js/app.js
- js/store.js
- js/helpers.js


---

##  Lessons Learned

This internship task helped me strengthen my understanding of:
- Modular JavaScript application structure
- Event delegation and DOM manipulation
- Working with browser `localStorage`
- Responsive UI/UX design using CSS
- Clean code principles and maintainable architecture

---

## 🛠 Tech Stack

- HTML5
- CSS3 (custom styling, no frameworks)
- JavaScript (ES6+)
- LocalStorage API

---

##  Final Outcome

The final product is a fully functional, responsive, and user-friendly ToDo application with:
- Dynamic task creation and management
- Real-time priority filtering
- Intuitive editing and deletion
- Polished modern UI

This project reflects my ability to analyze legacy code, improve functionality, and deliver clean, maintainable, and performant front-end solutions.

## output 

<img width="1058" height="591" alt="image" src="https://github.com/user-attachments/assets/567365a6-db3e-43e4-85c9-0b0e52b34f3b" />


---


# TodoMVC App Written in Modern Vanilla JS

It seems straightforward to build reasonably complex things using only modern JavaScript these days! We can take advantage of most newer features without hacks or polyfills.

Here's my Vanilla JavaScript implementation:

- ~200 lines of code total (compared to the official vanilla JS TodoMVC from 6 years ago was 900+ LOC)
- No build tools
- JavaScript modules

<a href="https://1marc.github.io/modern-todomvc-vanillajs/" target="_new">View the working example on GitHub pages</a>

Criticism, PRs, and feedback are welcome!

## Project Blog Post:

[<img alt="Modern Vanilla JavaScript TodoMVC in 2022 Article" width="750" src="https://static.frontendmasters.com/assets/blog/2022/vanilla-javascript-todomvc.jpg" />](https://frontendmasters.com/blog/vanilla-javascript-todomvc/)

# Additional Examples

## Initial Code

The initial version came together in only 60 minutes, then ~30 min of refactoring: [see the commit here](https://github.com/1Marc/modern-todomvc-vanillajs/tree/fb3c61ed104c440f0c29e3a074b6777c791aa2f6)

How quick it was to get working was what initially got me pumped about all of the progress in the core JavaScript language.

## App Architecture

People were concerned about the scalability of apps like this since there are no components, and it's all one App. So I extracted the TodoList and App components and wired the components together on the app-architecture branch.

Branch: https://github.com/1Marc/modern-todomvc-vanillajs/tree/app-architecture

Note: I realize it is silly to say the word "scalable" in the context of a todo app, but this should be looked at as a blueprint for building something more extensive. I plan to make more ambitious examples in the future to show what's possible.

## More Granular & Performant DOM Updates for Large Lists

Since I'm rendering everything on every update of the model from scratch, this can cause performance issues on long lists.

Here's a branch sending specific events with context from the model so we can make DOM updates more selectively as we need them ([see code diff](https://github.com/1Marc/modern-todomvc-vanillajs/commit/fc89da1a6bd15489d5256575a4e193e11efd8d43)).

Branch: https://github.com/1Marc/modern-todomvc-vanillajs/tree/performant-rendering

## More Performant DOM Updates for Large Lists with lit-html (Plus animations!)

We can achieve the same performant DOM updates with far less code by adopting lit-html using the repeat directive ([see code diff](https://github.com/1Marc/modern-todomvc-vanillajs/commit/ef86a73166029991dc88c649f7ec4931a2a96c86)).

Branch: https://github.com/1Marc/modern-todomvc-vanillajs/tree/animation-lithtml

## TypeScript

Here's the code base with TypeScript: https://github.com/1Marc/modern-todomvc-vanillaj/tree/typescript

## TypeScript + ESLint

Here's the code base with TypeScript and linting with ESLint: https://github.com/1Marc/modern-todomvc-vanillajs/tree/typescript-eslint

# Example UI Components Using this Architecture

[Vanilla JavaScript View Switcher Based on Hash Change](https://codepen.io/1Marc/pen/poLmXZR)

<a href="https://codepen.io/1Marc/pen/poLmXZR"><img src="https://user-images.githubusercontent.com/19269/189225506-1c1838e1-5b2a-408b-802a-dfe71b2f703c.png" width="500" /></a>

[Vanilla JavaScript Countdown Clock](https://codepen.io/1Marc/pen/bGvPRdy)

<a href="https://codepen.io/1Marc/pen/bGvPRdy"><img src="https://user-images.githubusercontent.com/19269/189225317-bb2ce1fb-a734-4193-beb1-670b5d6fbb04.png" width="500" /></a>

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br />This <span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" rel="dct:type">work</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://sindresorhus.com" property="cc:attributionName" rel="cc:attributionURL">TasteJS</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/deed.en_US">Creative Commons Attribution 4.0 International License</a>.

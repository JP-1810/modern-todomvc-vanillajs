import { delegate, getURLHash, insertHTML, replaceHTML } from "./helpers.js";
import { TodoStore } from "./store.js";

const Todos = new TodoStore("todo-modern-vanillajs");

const App = {
	$: {
		input: document.querySelector('[data-todo="new"]'),
		toggleAll: document.querySelector('[data-todo="toggle-all"]'),
		clear: document.querySelector('[data-todo="clear-completed"]'),
		list: document.querySelector('[data-todo="list"]'),
		priorityFilter: document.getElementById("priority-filter"),
		showMain(show) {
			document.querySelector('[data-todo="main"]').hidden = !show;
		},
		showFooter(show) {
			document.querySelector('[data-todo="footer"]').hidden = !show;
		},
		showClear(show) {
			App.$.clear.hidden = !show;
		},
		setActiveFilter(filter) {
			document.querySelectorAll(`[data-todo="filters"] a`).forEach((el) => {
				if (el.matches(`[href="#/${filter}"]`)) {
					el.classList.add("selected");
				} else {
					el.classList.remove("selected");
				}
			});
		},
		displayCount(count) {
			replaceHTML(
				document.querySelector('[data-todo="count"]'),
				`
				<strong>${count}</strong>
				${count === 1 ? "item" : "items"} left
			`
			);
		},
	},
	priorityFilter: "all",
	init() {
		Todos.addEventListener("save", App.render);
		App.filter = getURLHash();
		window.addEventListener("hashchange", () => {
			App.filter = getURLHash();
			App.render();
		});
		App.$.input.addEventListener("keyup", (e) => {
			if (e.key === "Enter" && e.target.value.trim()) {
				Todos.add({ title: e.target.value.trim(), priority: "medium" });
				App.$.input.value = "";
			}
		});
		App.$.toggleAll.addEventListener("click", () => {
			Todos.toggleAll();
		});
		App.$.clear.addEventListener("click", () => {
			Todos.clearCompleted();
		});
		App.$.priorityFilter.addEventListener("change", (e) => {
			App.priorityFilter = e.target.value;
			App.render();
		});
		App.bindTodoEvents();
		App.render();
	},
	todoEvent(event, selector, handler) {
		delegate(App.$.list, selector, event, (e) => {
			let $el = e.target.closest("[data-id]");
			handler(Todos.get($el.dataset.id), $el, e);
		});
	},
	bindTodoEvents() {
		App.todoEvent("click", '[data-todo="destroy"]', (todo) => Todos.remove(todo));
		App.todoEvent("click", '[data-todo="toggle"]', (todo) => Todos.toggle(todo));
		App.todoEvent("dblclick", '[data-todo="label"]', (_, $li) => {
			$li.classList.add("editing");
			$li.querySelector('[data-todo="edit"]').focus();
		});
		App.todoEvent("keyup", '[data-todo="edit"]', (todo, $li, e) => {
			let $input = $li.querySelector('[data-todo="edit"]');
			if (e.key === "Enter" && $input.value.trim()) {
				$li.classList.remove("editing");
				Todos.update({ ...todo, title: $input.value.trim() });
			}
			if (e.key === "Escape") {
				document.activeElement.blur();
			}
		});
		App.todoEvent("focusout", '[data-todo="edit"]', (todo, $li) => {
			if ($li.classList.contains("editing")) {
				App.render();
			}
		});
		App.todoEvent("change", '[data-todo="priority"]', (todo, _, e) => {
			Todos.update({ ...todo, priority: e.target.value });
		});
	},
	createTodoItem(todo) {
		const li = document.createElement("li");
		li.dataset.id = todo.id;
		if (todo.completed) li.classList.add("completed");

		insertHTML(
			li,
			`
			<div class="view">
				<input data-todo="toggle" class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
				<label data-todo="label"></label>
				<div class="actions">
					<select data-todo="priority" class="priority-selector">
						<option value="high" ${todo.priority === "high" ? "selected" : ""}>High</option>
						<option value="medium" ${todo.priority === "medium" ? "selected" : ""}>Medium</option>
						<option value="low" ${todo.priority === "low" ? "selected" : ""}>Low</option>
					</select>
					<button class="destroy" data-todo="destroy"></button>
				</div>
			</div>
			<input class="edit" data-todo="edit">
			`
		);

		li.querySelector('[data-todo="label"]').textContent = todo.title;
		li.querySelector('[data-todo="edit"]').value = todo.title;
		return li;
	},
	saveFocus() {
		const $active = document.activeElement;
		const $parent = $active && $active.closest("[data-id]");

		App.focusedSelector = $parent
			? `[data-id="${$parent.dataset.id}"] ${$active.tagName.toLowerCase()}`
			: null;
	},
	restoreFocus() {
		if (!App.focusedSelector) return;

		const $el = App.$.list.querySelector(App.focusedSelector);
		if ($el) $el.focus();
	},
	render() {
		const count = Todos.all().length;
		App.$.setActiveFilter(App.filter);
		App.saveFocus();

		const filteredTodos = Todos.all(App.filter).filter(todo => {
			return App.priorityFilter === "all" || todo.priority === App.priorityFilter;
		});
		App.$.list.replaceChildren(...filteredTodos.map((todo) => App.createTodoItem(todo)));

		App.restoreFocus();
		App.$.showMain(count);
		App.$.showFooter(count);
		App.$.showClear(Todos.hasCompleted());
		App.$.toggleAll.checked = Todos.isAllCompleted();
		App.$.displayCount(Todos.all("active").length);
	},
};

App.init();

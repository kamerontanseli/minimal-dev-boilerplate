import html from 'choo/html';
import choo from 'choo';

const app = choo();
app.route('/', mainView);
app.route('/about', aboutView);
app.route('/contact', contactView);
app.route('*', notFoundView);
app.mount('#app');

function mainView(state, emit) {
	return html`
		<div id="app">
			<h2>Home</h2>
		</div>
	`;
}

function aboutView(state, emit) {
	return html`
		<div id="app">
			<h2>About</h2>
		</div>
	`;
}

function contactView(state, emit) {
	return html`
		<div id="app">
			<h2>Contact</h2>
		</div>
	`;
}

function notFoundView() {
	return html`
		<div id="app">
			<h2>404: Page not found</h2>
		</div>
	`;
}
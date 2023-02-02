import React from 'react'
import ReactDOM from 'react-dom/client'
import { getSnapshot, destroy, onSnapshot } from "mobx-state-tree"
import { connectReduxDevtools } from "mst-middlewares"

import './index.css'
import App from './App'
import TodoStore from "./models/todos"
import "todomvc-app-css/index.css"

const localStorageKey = "mst-todomvc-example"

const initialState = localStorage.getItem(localStorageKey)
    ? JSON.parse(localStorage.getItem(localStorageKey))
    : {
        todos: [
            {
                text: "learn Mobx",
                completed: false,
                id: 0
            },
            {
                text: "learn MST",
                completed: false,
                id: 1
            }
        ]
    }

let store
let snapshotListenerDestroyer

function createTodoStore(snapshot) {
    // clean up snapshot listener
    if (snapshotListenerDestroyer) snapshotListenerDestroyer()
    // kill old store to prevent accidental use and run clean up hooks
    if (store) destroy(store)

    // create new one
    window.store = store = TodoStore.create(snapshot)

    // connect devtools
    connectReduxDevtools(require("remotedev"), store)
    // connect local storage
    snapshotListenerDestroyer = onSnapshot(store, (snapshot) =>
        localStorage.setItem(localStorageKey, JSON.stringify(snapshot))
    )

    return store
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function renderApp(App, store) {
    // render(<App store={store} />, document.getElementById("root"))
    root.render(
        <React.StrictMode>
            <App store={store} />
        </React.StrictMode>
    );

}

// Initial render
renderApp(App, createTodoStore(initialState))

// Connect HMR
if (module.hot) {
// if (import.meta.webpackHot) {
    module.hot.accept(["./models/todos"], () => {
        // Store definition changed, recreate a new one from old state
        renderApp(App, createTodoStore(getSnapshot(store)))
    })

    module.hot.accept(["./App"], () => {
        // Component definition changed, re-render app
        renderApp(App, store)
    })
}
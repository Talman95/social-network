import React from 'react';
import {store} from "./redux/store";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

let renderTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App store={store}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
store.subscribe(() => {
    renderTree();
});
renderTree();
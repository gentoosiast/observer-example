import "./styles/style.css";
import { BaseComponent } from "./common/component";
import { Observer } from "./common/observer";
import { reverseString } from "./helpers/string";

const body = document.body;

const container = new BaseComponent({
  tagName: "div",
  classNames: ["container"],
  parentNode: body,
});

const h1 = new BaseComponent({
  tagName: "h1",
  classNames: ["heading"],
  textContent: "Observer example",
  parentNode: container,
});

const input = new BaseComponent<HTMLInputElement>({
  tagName: "input",
  classNames: ["input"],
  parentNode: container,
});

const textField1 = new BaseComponent({
  tagName: "p",
  classNames: ["text-field"],
  textContent: "text field 1",
  parentNode: container,
});

const textField2 = new BaseComponent({
  tagName: "p",
  classNames: ["text-field"],
  textContent: "text field 2",
  parentNode: container,
});

const inputObserver = new Observer<string>();

inputObserver.subscribe((value) => {
  textField1.getNode().textContent = `text field 1: ${value}`;
  textField2.getNode().textContent = `text field 2: ${reverseString(value)}`;
});

input.getNode().addEventListener("input", (event) => {
  if (event.target instanceof HTMLInputElement) {
    inputObserver.emit(event.target.value);
  }
});

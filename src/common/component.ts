interface BaseComponentProps {
  tagName: keyof HTMLElementTagNameMap;
  classNames: string[];
  textContent?: string;
  attributes?: Record<string, string>;
  parentNode?: HTMLElement | BaseComponent;
}

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  private node: T;

  constructor({
    tagName = "div",
    classNames = [],
    textContent = "",
    attributes = {},
    parentNode,
  }: BaseComponentProps) {
    this.node = document.createElement(tagName) as T;
    this.node.classList.add(...classNames);
    this.node.textContent = textContent;

    if (attributes) {
      this.setAttributes(attributes);
    }

    if (parentNode instanceof HTMLElement) {
      parentNode.append(this.node);
    }

    if (parentNode instanceof BaseComponent) {
      parentNode.getNode().append(this.node);
    }
  }

  public append(child: BaseComponent): void {
    this.node.append(child.getNode());
  }

  public appendChildren(children: BaseComponent[]): void {
    children.forEach((el) => {
      this.append(el);
    });
  }

  public getNode(): T {
    return this.node;
  }

  public addClass(className: string): void {
    this.node.classList.add(className);
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  public getAttribute(attrName: string): string | null {
    return this.node.getAttribute(attrName);
  }

  public setAttribute(attrName: string, attrValue: string): void {
    this.node.setAttribute(attrName, attrValue);
  }

  public setAttributes(attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([attrName, attrValue]) => {
      this.setAttribute(attrName, attrValue);
    });
  }

  public destroy(): void {
    this.node.remove();
  }
}

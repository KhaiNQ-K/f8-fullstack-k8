function createElement(type, props = {}, ...children) {
  return { type, props: { ...props, children } };
}
function render(vnode, parent) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    // Handle text nodes
    parent.appendChild(document.createTextNode(vnode));
    return;
  }
  if (!vnode) {
    return;
  }
  // If vnode.type is a class (Component), instantiate it
  if (typeof vnode.type === 'function') {
    const componentInstance = new vnode.type(vnode.props);
    const componentVNode = componentInstance.render();
    componentInstance._parent = parent; // Attach the parent for future re-renders
    render(componentVNode, parent);
    return;
  }

  // Create a DOM element from the vnode's type
  const el = document.createElement(vnode.type);

  // Set attributes/props on the element
  Object.keys(vnode.props)
    .filter((key) => key !== 'children')
    .forEach((name) => {
      const value = vnode.props[name];
      if (name.startsWith('on')) {
        // Handle event listeners (e.g., onClick)
        const eventType = name.toLowerCase().substring(2);
        el.addEventListener(eventType, value);
      } else if (name === 'className') {
        // Handle className prop
        el.className = value;
      } else {
        // Set attributes
        el.setAttribute(name, value);
      }
    });
  vnode.props.children.forEach((child) => render(child, el));

  // Recursively render children

  // Append the created element to the parent
  parent.appendChild(el);
}

class Component {
  constructor(props) {
    this.props = props || {};
    this.state = {};
    this._parent = null;
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this._reRender();
  }
  _reRender() {
    this._parent.innerHTML = '';
    render(this.render(), this._parent);
  }
  mount(parent) {
    this._parent = parent;
    this._reRender();
    if (typeof this.componentDidMount === 'function') {
      this.componentDidMount();
    }
  }
}
export { createElement, render, Component };

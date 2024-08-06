class App {
  constructor() {}

  static component(componentName, { data, template }) {
    customElements.define(
      componentName,
      class extends HTMLElement {
        constructor() {
          super();
          this.events = {
            click: 'click',
            dblClick: 'dblClick',
          };
          this.textNodes = {};
          this.attachShadow({ mode: 'open' });
          this.state = data();
          this.templateEl = document.createElement('template');
          this.renderDOM();
          this.attactEvents();
        }
        renderDOM() {
          this.templateEl.innerHTML = this.assignState(template);
          this.shadowRoot.appendChild(this.templateEl.content.cloneNode(true));
          this.getTextNodes();
        }
        assignState(template) {
          return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
            return `<span data-key="${key}">${this.state[key]}</span>`;
          });
        }
        getTextNodes() {
          this.shadowRoot.querySelectorAll('[data-key]').forEach((node) => {
            const key = node.getAttribute('data-key');
            this.textNodes[key] = node;
          });
        }
        attactEvents() {
          const elementList = this.shadowRoot.children;
          console.log(elementList);
          if (elementList.length) {
            Array.from(elementList).forEach(function (element) {
              const attributeList = element.attributes;
              for (let i = 0; i < attributeList.length; i++) {
                const attributeName = attributeList[i].name;
                const attributeValue = attributeList[i].value;
                if (attributeName.startsWith('v-on')) {
                  this.applyEvent(attributeName, attributeValue, element);
                }
              }
              if (element.children.length && element.length > 0) {
                this.attactEvents(element);
              }
            }, this);
          }
        }
        applyEvent(attributeName, attributeValue, element) {
          var eventName = attributeName.replace('v-on:', '');
          element.addEventListener(
            eventName,
            function (e) {
              Object.keys(this.state).forEach(function (key) {
                if (attributeValue.includes(key)) {
                  eval(`this.state.${attributeValue}`);
                  this.updateUI(key);
                }
              }, this);
            }.bind(this)
          );
        }
        updateUI(key) {
          this.textNodes[key].textContent = this.state[key];
        }
      }
    );
  }
}
App.component('hello-world', {
  data: () => ({
    title: 'Hello',
    count: 0,
  }),
  template: `<h1>{{title}}</h1>
    <button v-on:click="count++">+</button>
    <h1>{{count}}</h1>
    <button v-on:click="count--">-</button>
    `,
});

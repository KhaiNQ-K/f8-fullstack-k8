import Navigo from 'navigo';
import NotFound from '../layouts/NotFound';
class Router {
  constructor(routes, layout, root = '/') {
    this.router = new Navigo(root, { strategy: 'ALL' });
    this.routes = routes;
    this.layout = layout;
    this.init();
    window.navigate = this.router.navigate.bind(this);
  }

  init() {
    this.addRoutes();
    this.setNotFound(NotFound);
    this.router.resolve();
  }
  addRoutes() {
    this.routes.forEach(({ path, component, beforeEnter }) => {
      this.router.on(path, (params) => {
        // Check if a `beforeEnter` function exists and call it
        if (beforeEnter && typeof beforeEnter === 'function') {
          const proceed = beforeEnter(params);
          if (!proceed) {
            this.renderComponent(NotFound); // Render NotFound if check fails
            return;
          }
        }
        this.renderComponent(component, params);
      });
    });
  }
  renderComponent(Component, { queryString, url, hashString, data } = {}) {
    const appContainer = document.querySelector('#app');
    appContainer.innerHTML = '';
    if (Component.name === 'NotFound') {
      appContainer.innerHTML = Component();
      return;
    }
    // Render layout
    const layout = this.layout();
    const content = Component({
      params: { id: data?.id },
      has: hashString,
      queryString: queryString,
      url: url,
    });

    appContainer.innerHTML = layout;

    // Inject the content into the layout
    const contentContainer = appContainer.querySelector('#page-content');
    if (contentContainer) {
      contentContainer.innerHTML = '';
      contentContainer.appendChild(this.createDOMElement(content));
    }
  }
  setNotFound(Component) {
    this.router.notFound(() => {
      this.renderComponent(Component);
    });
  }
  navigate(path, options = {}) {
    this.router.navigate(path, options);
  }
  createDOMElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim(); // Trim to avoid unwanted whitespace
    return template.content;
  }
}

export default Router;

import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/img/logo.png';
import headerStyle from './css/Header.module.css';
const Header = () => {
  return `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand " href="/" data-navigo><img class="${headerStyle.logo}" src="${logo}"/></a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" aria-current="page" href="/"  data-navigo>Home</a>
          <a class="nav-link" href="/about"  data-navigo>About</a>
          <a class="nav-link" href="/product" data-navigo>Product</a>
        </div>
      </div>
    </div>
  </nav>`;
};
export default Header;

import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
const DefaultLayout = (content) => {
  return `
    <div data-bs-theme="dark"  >
      ${Header()}
      <main id="page-content">
        ${content}
      </main>
      ${Footer()}
    </div>
  `;
};
export default DefaultLayout;

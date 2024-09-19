import { Header, Footer } from '../components';
import PropTypes from 'prop-types';
function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <main className="mx-auto">{children}</main>
      <Footer />
    </>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;

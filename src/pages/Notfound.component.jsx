import invalid from "../asset/images/404-error.png";
function PageNotFound() {
  return (
    <div className="centered-container text-center">
      <img className="invalid" src={invalid} />
      <p className="error_page">Page not found</p>
    </div>
  );
}
export default PageNotFound;

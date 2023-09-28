import React, { useState, useEffect } from "react";
import trash from "../asset/images/trash-bin.png";
import buy from "../asset/images/checkout.png";
import { Card, Button, Modal } from "react-bootstrap";
import api from "../api/Axios/axios.component";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [loading, setLoading] = useState(true); // Loading indicator
  const itemsPerPage = 6;

  useEffect(() => {
    api
      .get("/products?sort=desc")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (productId) => {
    setDeleteProductId(productId);
    setDeleteModalShow(true);
  };

  const confirmDelete = () => {
    api
      .delete(`/products/${deleteProductId}`)
      .then((response) => {
        toast.info("کالای مورد نظر با موفقیت حذف شد");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== deleteProductId)
        );

        setDeleteModalShow(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("خطا در هنگام حذف کالا رخ داده است.");
        setDeleteModalShow(false);
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPreviousButton = () => {
    if (currentPage > 1) {
      return (
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"<"}
        </button>
      );
    } else {
      return null;
    }
  };

  const renderNextButton = () => {
    if (currentPage < totalPages) {
      return (
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">"}
        </button>
      );
    } else {
      return null;
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => {
            handlePageChange(i);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`pagination-num ${i === currentPage ? "active-page" : ""}`}
          type="button"
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div>
      {loading ? (
        <div className="list-loading">در حال بارگزاری...</div>
      ) : (
        <div className="product-list">
          {currentItems.map((product) => (
            <Card key={product.id} className="product-item">
              <Card.Img
                className="product-image"
                variant="top"
                src={product.image}
                alt={product.title}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="product-title">
                  {product.title}
                </Card.Title>
                <Link
                  to={`/product/${product.id}`}
                  className="product-button btn btn-warning mt-auto px-4 py-2"
                >
                  <img src={buy} alt="buy icon" />
                </Link>
                <Button
                  variant="danger"
                  className="product-button-delete btn px-2 py-2 mt-2"
                  onClick={() => handleDelete(product.id)}
                >
                  <img src={trash} alt="Trash Bin" />
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      <div className="pagination">
        {renderPreviousButton()}
        {renderPageNumbers()}
        {renderNextButton()}
      </div>
      <ToastContainer position={toast.POSITION.TOP_CENTER} />

      <Modal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>کالای انتخاب شده برای شما حذف خواهد شد</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={() => setDeleteModalShow(false)}
          >
            لغو
          </Button>
          <Button variant="success" onClick={confirmDelete}>
            تایید
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductList;

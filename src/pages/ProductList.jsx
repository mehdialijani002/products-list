import React, { useState, useEffect } from "react";
import trash from "../asset/images/trash-bin.png";
import buy from "../asset/images/checkout.png";
import { Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [changingPage, setChangingPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products?sort=desc")
      .then((response) => {
        setTimeout(() => {
          setProducts(response.data);
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  const handleDelete = (productId) => {
    Swal.fire({
      title: "حذف کالا",
      text: "کالای انتخاب شده برای شما حذف خواهد شد",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "حذف",
      cancelButtonText: "لغو",
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      preConfirm: () => {
        toast.info("کالای مورد نظر با موفقیت حذف شد");
        return axios
          .delete(`https://fakestoreapi.com/products/${productId}`)
          .then((response) => {
            setProducts((prevProducts) =>
              prevProducts.filter((product) => product.id !== productId)
            );
            Swal.fire("حذف شد!", "کالای مورد نظر حذف شد", "success");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("خطا!", "خطایی در هنگام حذف کالا رخ داده است.", "error");
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
  };
  const handlePageChange = (newPage) => {
    setChangingPage(true);
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setChangingPage(false);
    }, 50);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const renderPreviousButton = () => {
    if (currentPage > 1 && !changingPage) {
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
    if (currentPage < totalPages && !changingPage) {
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
          disabled={loadingPage || changingPage}
          type="button"
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
  return (
    <div>
      {loading ? (
        <div className="loading-spinner">
          <Spinner
            animation="grow"
            variant="warning"
            style={{ width: "6rem", height: "6rem" }}
          ></Spinner>
          <h5 className="mt-2 ">در حال بارگزاری</h5>
        </div>
      ) : (
        <div>
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
          <div className="pagination">
            {renderPreviousButton()}
            {renderPageNumbers()}
            {renderNextButton()}
          </div>
        </div>
      )}
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
    </div>
  );
}
export default ProductList;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAPI, setLoadingAPI] = useState(true);
  const [toastShown, setToastShown] = useState(false);

  const navigate = useNavigate();

  const handleConfirmation = () => {
    Swal.fire({
      title: "ثبت نهایی",
      text: "آیا از ثبت نهایی خرید مطمئن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/dashboard", { state: { product } });
      }
    });
  };

  useEffect(() => {
    setLoadingAPI(true);
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);

        if (!toastShown) {
          toast.success("خرید شما با موفقیت ثبت اولیه شد.");
          setToastShown(true);
        }

        setLoadingAPI(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setTimeout(() => {
          setLoadingAPI(false);
        });
      });
  }, [productId, toastShown]);

  if (loadingAPI) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner
          animation="border"
          variant="success"
          style={{ width: "4rem", height: "4rem" }}
        />
        <h5 className="mx-3">ممنون از انتخاب شما</h5>
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {product ? (
        <Card className="w-50 mx-auto text-center">
          <Card.Img
            className="product-image"
            variant="top"
            src={product.image}
            alt={product.title}
          />
          <Card.Body>
            <Card.Title className="product-title">{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: ${product.price}</Card.Text>
          </Card.Body>
          <Link
            to="#"
            className="product-button-confirm btn bg-success bg-gradient"
            onClick={handleConfirmation}
          >
            ثبت نهایی
          </Link>
        </Card>
      ) : (
        <div>No product found</div>
      )}
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
    </div>
  );
}

export default ProductDetail;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/Axios/axios.component";
import { Card, Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const confirmPurchase = () => {
    navigate("/dashboard", { state: { product } });
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    api
      .get(`/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setIsLoading(false);
        console.log("render");

        if (!toastShown) {
          toast.success("خرید شما با موفقیت ثبت اولیه شد.");
          setToastShown(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [productId, toastShown]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {isLoading ? (
        <div className="">در حال بارگزاری...</div>
      ) : product ? (
        <Card className="w-50 mx-auto text-center detail-card">
          <h1 className="mb-5 sabt-button">ثبت کالا</h1>
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
          <Button
            onClick={handleConfirmation}
            className="product-button-confirm btn-warning "
          >
            ثبت نهایی
          </Button>
        </Card>
      ) : (
        <div>متاسفانه اطلاعاتی وجود ندارد.</div>
      )}
      <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>آیا از ثبت نهایی خرید مطمئن هستید؟</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={() => setShowConfirmationModal(false)}
          >
            لغو
          </Button>
          <Button variant="success" onClick={confirmPurchase}>
            تایید
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default ProductDetail;

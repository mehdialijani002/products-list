import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function Dashboard() {
  const location = useLocation();
  const { product } = location.state || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="text-center">
      <h2 className="dashboard-header">فروشگاه آنلاین</h2>
      {loading ? (
        <div className="dashboard-empty">
          <h1 className="">به فروشگاه ما خوش امدید</h1>
          <p className="dashboard-p">
            <Spinner animation="grow" variant="success" />
            در حال بارگزاری...
            <Spinner animation="grow" variant="success" />
          </p>
        </div>
      ) : product ? (
        <Card className="final-card w-50 mx-auto mt-4">
          <Card.Body>
            <h4 className="text-danger">ممنون از خرید شما</h4>
            <Card.Img
              className="product-image"
              variant="top"
              src={product.image}
              alt={product.title}
            />

            <Card.Text className="mt-4 text-success">
              Title: {product.title}
            </Card.Text>
            <Card.Text>Description: {product.description}</Card.Text>
            <Card.Text>Price: ${product.price}</Card.Text>
            <Card.Text className="text-success">خریداری شده</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div className="dashboard-empty">
          <h1 className="">به فروشگاه ما خوش امدید</h1>
          <p className="dashboard-p">
            کالایی یافت نشد
            <Link
              to="/productlist"
              className="dashboard-p btn btn-success mx-3"
            >
              لیست کالاها
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

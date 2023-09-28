import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function Dashboard() {
  const location = useLocation();
  const { product } = location.state || {};

  return (
    <div className="text-center">
      <h2 className="dashboard-header">فروشگاه آنلاین</h2>
      {product ? (
        <Card className="final-card w-50 mx-auto mt-4">
          <Card.Body>
            <h4 className="text-danger">ممنون از خرید شما</h4>
            <Card.Img
              className="product-image"
              variant="top"
              src={product.image}
              alt={product.title}
            />

            <Card.Text className="mt-4">
              <strong>عنوان:</strong> {product.title}
            </Card.Text>
            <Card.Text>
              <strong>توضیحات:</strong> {product.description}
            </Card.Text>
            <Card.Text>
              <strong>قیمت:</strong> ${product.price}
            </Card.Text>
            <Card.Text className="text-success">
              ثبت کالا با موفقیت انجام شد.
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div className="dashboard-empty">
          <h1>به فروشگاه ما خوش آمدید</h1>

          <Link to="/productlist" className="btn btn-success mt-3">
            لیست کالاها
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

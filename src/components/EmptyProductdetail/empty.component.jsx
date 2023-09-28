import React from "react";
import { Link } from "react-router-dom";
function empty() {
  return (
    <div className="empty-container  mt-5">
      <h1 className="mb-5">کالای منتخب</h1>
      <h3>کالایی یافت نشد...</h3>
      <p className="mt-2">
        برای ثبت کالای خود ابتدا باید به بخش لیست کالا ها مراجعه کنید
      </p>
      <Link to="/productlist" className="btn btn-success mt-2">
        لیست کالاها
      </Link>
    </div>
  );
}

export default empty;

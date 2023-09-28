import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormInput() {
  const initialFormData = {
    name: "",
    lastName: "",
    nationalId: "",
    subject: "",
    phoneNumber: "",
  };

  const initialErrors = {};
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      const titles = response.data.map((product) => product.title);
      setSubjectOptions(titles);
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const validateForm = () => {
    const newErrors = {};

    for (const field in formData) {
      if (!formData[field].trim()) {
        newErrors[field] = "لطفا اطلاعات فرم را کامل کنید. ";
      } else if (field === "nationalId" && !/^\d{10}$/.test(formData[field])) {
        newErrors[field] = "کد ملی باید ۱۰ رقمی باشد";
      } else if (field === "phoneNumber" && !/^\d{11}$/.test(formData[field])) {
        newErrors[field] = "شماره تماس باید ۱۱ رقمی باشد";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      navigate("/dashboard");
      console.log(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const formFields = [
    { name: "name", label: "نام" },
    { name: "lastName", label: "نام خانوادگی" },
    { name: "nationalId", label: "کد ملی", type: "number" },
    { name: "subject", label: "موضوع" },
    { name: "phoneNumber", label: "شماره تماس", type: "number" },
  ];

  return (
    <Container className="form-container">
      <Form onSubmit={handleSubmit}>
        <h1 className="form-title"> فرم ثبت کالا </h1>
        {formFields.map((field, index) => (
          <Col md={8} key={index} className="mt-2">
            <FormGroup>
              <FormLabel>{field.label} :</FormLabel>
              {field.name === "subject" ? (
                <FormControl
                  as="select"
                  name={field.name}
                  id={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                >
                  <option value="">انتخاب کنید</option>
                  {subjectOptions.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </FormControl>
              ) : (
                <FormControl
                  type={field.type || "text"}
                  name={field.name}
                  id={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              )}
              {errors[field.name] && (
                <div className="text-danger">{errors[field.name]}</div>
              )}
            </FormGroup>
          </Col>
        ))}
        <Button className="w-25 py-2 mt-3" variant="warning" type="submit">
          تایید
        </Button>
      </Form>
    </Container>
  );
}

export default FormInput;

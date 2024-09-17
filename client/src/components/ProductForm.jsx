import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from  "react-router-dom"
import { toast } from 'react-toastify'
import axios from "axios"
import { StockContext } from "../context/StockContext"

export default function ProductForm() {

  const { id } = useParams()
  const navigate = useNavigate()
  const { categories, addProduct, updateProduct } = useContext(StockContext);


  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [isUpdate, setIsUpdate] = useState(false)


  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:5000/products/product/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
        .then(response => {
          const product = response.data;
          setName(product.name);
          setCategory(product.category_id);
          setQuantity(product.quantity);
          setPrice(product.price);
          setIsUpdate(true);
        })
        .catch(error => {
          if (error.code)
            toast.error("Error fetching product data");
        });
    }
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name === " "|| category === "" || quantity === "" || price === "") {
      toast.error("All fields are required!");
      return;
    }

    const product = { name, quantity, price, category};
    try {
      
      if (isUpdate) {
        await updateProduct(id, product);
        navigate('/user/products')
      } else {
        await addProduct(product);
      }
      
      setName("")
      setCategory("")
      setQuantity("")
      setPrice("")
      setIsUpdate(false)

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="row justify-content-center">
      <form onSubmit={handleSubmit} className="col-12 col-md-6 mt-5 text-white">
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input
            type="text"
            id="productName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="disabledSelect" className="form-label">Category</label>
          <select
            id="disabledSelect"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select a category</option>
            {
              categories.map((item) => (
                <option key={item.id} value={item.id} >
                  {item.name}
                </option>
              ))
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            min={0}
            step={1}
            placeholder="0"
            id="quantity"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Price</label>
          <input
            type="text"
            min={0.00}
            step={0.01}
            placeholder="0.00"
            id="productName"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      
        </form>
    </div>
  )
}

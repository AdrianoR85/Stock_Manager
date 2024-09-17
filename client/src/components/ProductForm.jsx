import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from  "react-router-dom"
import { toast } from 'react-toastify'
import axios from "axios"
// import axios from "axios"
import { StockContext } from "../context/StockContext"

export default function ProductForm() {

  const { id } = useParams()
  const navigate = useNavigate()
  const { categories, addProduct, updateProduct, products } = useContext(StockContext);


  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [isUpdate, setIsUpdate] = useState(false)


  useEffect(() => {
    if (id) {
      // Se estiver editando um produto, buscar os dados do produto
      const numID = parseInt(id.substring(1))
      axios.get(`http://127.0.0.1:5000/products/product/${id}`)
        .then(response => {
          const product = response.data;
          setName(product.name);
          setCategory(product.category_id); // Assumindo que você esteja passando category_id
          setQuantity(product.quantity);
          setPrice(product.price);
          setIsUpdate(true);
        })
        .catch(error => {
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
        toast.success("Product added successfully!");
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
    <form onSubmit={handleSubmit} className="d-grid mt-5 text-white justify-content-center">
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
  )
}

import { createContext, useState, useEffect } from "react"
import axios from "axios";
import { toast } from 'react-toastify';

export const StockContext = createContext({})

// eslint-disable-next-line react/prop-types
export function StockContextProvider({children}) {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/products');
      
      if (response.status === 200) {
        setProducts(response.data);
      }
    }
    catch (error) {

      toast.error(error.response?.data?.message || 'Error fetching products');
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/products/product/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      if (response.status === 200) {
        setProducts(response.data)
      }
    }
    catch (error) {
      if (error.response && error.response.data.error) {
        const errors = error.response.data.error;
        errors.forEach(error => toast.error(error.name_error));
      }
      toast.error(error.response.data.error)
    }
  }

  const getCategory = async() => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/category', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      if (response.status === 200) {
        setCategories(response.data)
      }
    }
    catch (error) {
      if (error.response.data.error) {
        toast.error('Failed to fetch category data')
      } else {
        toast.error('Failed to fetch category data')
      }
    }
  }

  const getData = async() => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/data", {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      if (response.status === 200) {
        setData(response.data)
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        const errors = error.response.data.error;
        errors.forEach(error => toast.error(error.name_error));
      }
      toast.error(error.response.data.error)
    }
  }

  useEffect(() => {
    getProducts()
    getCategory()
    getData()
  }, [])

  

  const addProduct = async (product) => {
   
    try {
      await axios.post('http://127.0.0.1:5000/products/register', product, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } 
      })
      toast.success('Product added successfully')
      getProducts()
      getData()
    }
    catch (error) {
      toast.error(error.response.data.error)
    }
  }

  const updateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://127.0.0.1:5000/products/product/${id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      toast.success('Product updated successfully');
      getProducts();
      getData()
    }
    catch (error) {
      if (error.response &&  error.response.data.error) {
        const errors = error.response.data.error;
        errors.forEach(error => toast.error(error.name_error));
      } 
    }
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/product/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      setProducts(products.filter(product => product.id !== id));
      getData()
      toast.success('Product deleted successfully');
    }
    catch (error) {
      console.error(error.response);
    }
  }

  return (
    <StockContext.Provider value={{
      products,
      categories,
      getProducts,
      getCategory,
      data,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById
    }}>
      { children }
    </StockContext.Provider>
  )
}


import { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";



export default function Products() {
  const { products, deleteProduct, getProducts } = useContext(StockContext)

  const handleDelete = async (id) => {
    // Exibe uma caixa de confirmação
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    
    if (confirmed) {
      try {
        await deleteProduct(id);
        getProducts(); 
      } catch (error) {
        toast.error('An error occurred while deleting the product');
      }
    }
  };

  return (
    <section className="table-responsive mt-5">
      <table className="table  table-striped table-hover">
        <thead className="table-dark ">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th scope="row">{product.name}</th>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>$ {product.price}</td>
              <td>
                <Link to={`update/${product.id}`} className="btn btn-sm btn-primary">Edit</Link>
                <button className="btn btn-sm btn-danger ml-2"
                onClick={() => handleDelete(product.id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

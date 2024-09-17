import { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import NumberFormatter from '../../components/NumberFormatter';



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
        if (error.response && error.response.data.error) {
          const errors = error.response.data.error;
          errors.forEach(error => toast.error(error.name_error));
        }
        toast.error(error.response.data.error)
      }
    }
  };

  return (
    <section className=" container col-12 mt-5">
      <div className="table-responsive" style={{maxHeight: '525px'}}>
        <table className="table table-striped table-hover w-100">
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
                <td>$ <NumberFormatter value={product.price} /> </td>
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
      </div>
    </section>
  );
}

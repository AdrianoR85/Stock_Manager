import { useContext } from "react";
import Card from "../components/Card";
import { StockContext } from "../context/StockContext";
import NumberFormatter from '../components/NumberFormatter';
export default function Home() {
  const { data } = useContext(StockContext);

  const totalProducts = data?.total_products_in_stock?.[0]?.quantity || 0;
  const totalDifferentProducts =
    data?.different_types_of_products?.[0]?.quantity || 0;
  const totalValue = data?.total_values_of_products_in_stocke?.[0]?.value || 0;
  const totalCategories = data?.total_category_in_stock?.[0]?.quantity || 0;
  const mostValuableProducts = data?.top_five_product || [];
  const mostValuableCategories = data?.top_five_category || [];

  return (
    <>
      <h1 className="text-blue-light ">Dashboard</h1>
      <section className="mt-5 gap-5 border-bottom">
        <div className="d-flex justify-content-between gap-4 flex-wrap w-100 mb-4">
          <Card title="Total Product" value={`${totalProducts} units`} />
          <Card title="Total Value ($)" value={`${totalValue}`} isDicimal={true} />
          <Card title="Total Category" value={`${totalCategories} types`} />
          <Card
            title="Total Different Products"
            value={`${totalDifferentProducts} types`}
          />
        </div>div
      </section>
      <section className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <h4 className="text-white mb-3">The 5 Most Valuable Products</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">$</th>
                  </tr>
                </thead>
                <tbody>
                  {mostValuableProducts.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.product}</td>
                      <td>{item.quantity}</td>
                      <td><NumberFormatter value={item.total_value} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="text-white mb-3">The 5 Most Valuable Categories</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">$</th>
                  </tr>
                </thead>
                <tbody>
                  {mostValuableCategories.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td><NumberFormatter value={item.total_value} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

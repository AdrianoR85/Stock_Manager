import Card from "../components/Card";
export default function Home() {
  return (
    <>
      <h1 className="text-blue-light ">Dashboard</h1>
      <section className="d-flex flex-wrap mt-5 gap-5 justify-content-center">
        <div className="d-flex gap-3 border-bottom pb-5 flex-wrap">
          <Card title="Total Product" text="200 unit" />
          <Card title="Total Value ($)" text="$10.000" />
          <Card title="Total Catagory" text="5 types" />
          <Card title="Total Value ($)" text="$10.000" />
        </div>
        <section className="container">
          <div className="row">
            <div className="col-6">
            <h4>The 5 Most Valuety Products</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-6">
            <h4>The 5 Most Valuety Products</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

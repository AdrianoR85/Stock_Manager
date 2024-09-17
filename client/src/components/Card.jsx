import NumberFormatter from '../components/NumberFormatter';
// eslint-disable-next-line react/prop-types
export default function Card({title, value, isDicimal=false}) {
  return (
    <div className="card p-0 " style={{width: "18rem"}}>
    <div className="">
      <h5 className="bg-dark text-white rounded-2 pl-3 p-2">{title}</h5>
      {
        isDicimal?
        <p className="card-text fs-2 text-center p-2"><NumberFormatter value={value}/></p>
        :
        <p className="card-text fs-2 text-center p-2"> {value} </p>
      }
    </div>
  </div>
  );
}

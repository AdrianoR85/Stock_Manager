
export default function Card({title, text}) {
  return (
    <div className="card p-0 " style={{width: "18rem"}}>
    <div className="">
      <h5 className="bg-dark text-blue-light rounded-2 pl-3 p-2">{title}</h5>
      <p className="card-text fs-2 text-center p-2">{text}</p>
    </div>
  </div>
  );
}

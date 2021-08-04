import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner";
var baseurl = process.env.REACT_APP_BASE_URL;
const heart = <FontAwesomeIcon icon={faHeart} />;

function Cakedetails(props) {
  const [loading, setLoading] = useState(true);

  let [cakedetail, setCakedetails] = useState({});
  let params = useParams();

  console.log("Params", params);
  useEffect(() => {
    let cakedetailsapi = baseurl + "cake/" + params.cakeid;
    axios({
      method: "get",
      url: cakedetailsapi,
    }).then(
      (response) => {
        if (response.data.data) {
          console.log("fffffffff");
          setCakedetails(response.data.data);
          setLoading(false);
        }
      },
      (error) => {
        console.log("error found", error);
        setLoading(false);
      }
    );
  }, [params.cakeid]);

  var addtocart = function (e) {
    setLoading(true);
    e.preventDefault();
    if (localStorage.token && props.user) {
      var token = localStorage.token;
      axios({
        method: "post",
        url: baseurl + "addcaketocart",
        data: {
          cakeid: cakedetail.cakeid,
          name: cakedetail.name,
          image: cakedetail.image,
          price: cakedetail.price,
          weight: cakedetail.weight,
        },
        headers: {
          authtoken: token,
        },
      }).then(
        (response) => {
          props.dispatch({
            type: "ADD_CART_DATA",
            payload: response.data.data,
          });
          setLoading(false);
          props.history.push("/cart");
          alert("Added to your cart");
        },
        (error) => {}
      );
    } else {
      alert("Please Login to proceed");
      setLoading(false);
    }
  };

  return (
    <main className="Site-content Site-content--full">
      {loading ? (
        <Spinner />
      ) : (
        <div
          className="cakedetails"
          style={{ marginTop: "20px", paddingLeft: "30px" }}
        >
          <div className="row">
            <div className="col-md-4">
              <img
                src={cakedetail?.image}
                className="cakeDetailImg card-img-top"
                alt="..."
              />
            </div>
            <div className="col-md-6 ml-3">
              <div className="row ">
                <div className="col-2">
                  {" "}
                  <strong className="reviewPoint">4.7</strong>{" "}
                </div>
                <div className="col-11">
                  <h2>{cakedetail?.name} </h2>{" "}
                </div>
              </div>
              <br />
              <div className="row  mt-2">
                <div className="col-3">
                  <b>PRICE:</b>
                </div>
                <div className="col-9">{cakedetail?.price}/- Rs Only </div>
              </div>
              <div className="row  mt-2">
                <div className="col-3">
                  <b>INGRIDIENTS:</b>
                </div>
                <div className="col-9">Cake,Cream,Choco Chips </div>
              </div>
              <div className="row  mt-2">
                <div className="col-3">
                  <b>DESCRIPTIONS:</b>
                </div>
                <div className="col-9">{cakedetail?.description} </div>
              </div>
              <div className="row mt-5">
                <div className="col-3"> </div>
                <div className="col-6">
                  <button
                    type="button"
                    onClick={addtocart}
                    className="btn text-uppercase p-2 text-white mr-2 font-weight-bold"
                    style={{ backgroundColor: "#043d76" }}
                  >
                    Add to cart
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger  text-white font-weight-bold"
                  >
                    {heart}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default connect(function (state) {
  return {
    user: state?.user?.name,
  };
})(Cakedetails);

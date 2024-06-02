/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

function PrivateRouter(props) {
  console.log("🚀 ~ PrivateRouter ~ props:", props)
  const isAuth = true;
  return isAuth ? <>{props.children[0]}</> : <>{props.children[1]}</>;
}

export default PrivateRouter;

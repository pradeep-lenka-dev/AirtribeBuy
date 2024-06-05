/* eslint-disable react/prop-types */

function PrivateRouter(props) {
  let isAuth = false;

  if(localStorage.getItem("AuthToken")){
    isAuth = true
  }
  return isAuth ? <>{props.children[0]}</> : <>{props.children[1]}</>;
}

export default PrivateRouter;

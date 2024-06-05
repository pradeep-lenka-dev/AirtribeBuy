/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

import { useModal } from "../context/ModalContext";
import { useEffect } from "react";

function PrivateRouter(props) {
  console.log("🚀 ~ PrivateRouter ~ props:", props)
  let isAuth = false;
  const { showModal } = useModal();
  useEffect(() => {
    if (!isAuth) {
      showModal();
    }
  }, [isAuth, showModal]);
  if(localStorage.getItem("AuthToken")){
    isAuth = true
  }
  return isAuth ? <>{props.children[0]}</> : <>{props.children[1]}</>;
}

export default PrivateRouter;

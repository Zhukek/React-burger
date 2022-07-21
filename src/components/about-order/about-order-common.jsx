import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import AboutOrder from "./about-order";
import { WS_SOCKET_OPEN, WS_SOCKET_CLOSE } from "../../services/actions/wsSocket";

const AboutOrderCommon = ({background}) => {
  const dispatch = useDispatch()
  const {wsConnected} = useSelector(store => store.socket);
  useEffect(() => {
    if (!wsConnected) {
      dispatch({type: WS_SOCKET_OPEN})
    }
    return(() => {
      if (!background) {
        dispatch({type: WS_SOCKET_CLOSE})
      }
    })
  },[])

  return (
    <AboutOrder isPrivate={false}/>
  )
}

export default AboutOrderCommon
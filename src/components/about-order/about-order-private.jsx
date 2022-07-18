import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import AboutOrder from "./about-order";
import { WS_SOCKET_OPEN_PRIVATE, WS_SOCKET_CLOSE } from "../../services/actions/wsSocket";

const AboutOrderPrivate = ({background}) => {
  const dispatch = useDispatch()
  const {wsConnected} = useSelector(store => store.socket);
  useEffect(() => {
    if (!wsConnected) {
      dispatch({type: WS_SOCKET_OPEN_PRIVATE})
    }
    return(() => {
      if (!background) {
        dispatch({type: WS_SOCKET_CLOSE})
      }
    })
  },[])

  return (
    <AboutOrder isPrivate={true}/>
  )
}

export default AboutOrderPrivate
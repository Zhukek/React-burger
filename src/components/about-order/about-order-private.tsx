import React, {FC, useEffect} from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import AboutOrder from "./about-order";
import { WS_SOCKET_OPEN_PRIVATE, WS_SOCKET_CLOSE } from "../../services/actions/wsSocket";
import { IAboutOrderProps } from '../../services/types/index';

const AboutOrderPrivate: FC<IAboutOrderProps> = ({background}) => {
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
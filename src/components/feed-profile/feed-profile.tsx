import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "../../services/hooks";

import Feed from "../feed/feed";
import { WS_SOCKET_OPEN_PRIVATE, WS_SOCKET_CLOSE } from "../../services/actions/wsSocket";

const FeedProfile: FC = () => {
  const dispatch = useDispatch();
  const {error, wsConnected} = useSelector(store => store.socket);

  useEffect(() => {
    if(!wsConnected) {
      dispatch({type: WS_SOCKET_OPEN_PRIVATE})
    }
  },[wsConnected])
  useEffect(() => {
    return() => {
      dispatch({type: WS_SOCKET_CLOSE})}
  },[])

  if (error || !wsConnected) {
    return null
  }

  return (
    <Feed />
  )
}

export default FeedProfile
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileForm from "../components/forms/profile-form";
import ProfileMenu from "../components/profile-menu/profile-menu";

import styles from "./profile.module.css";
import { getUserInfo } from "../services/actions/user";
import { useLocation } from "react-router-dom";

export const ProfilePage = () => {
  const location = useLocation().pathname
  const dispatch = useDispatch();
  const {accessToken} = useSelector(store => store.user)

  useEffect(()=> {
    dispatch(getUserInfo(accessToken))
  },[location])

  return (
    <div className={styles.root}>
      <ProfileMenu />
      <ProfileForm />
    </div>
  )
}
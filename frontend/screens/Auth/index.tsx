import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { AuthDetails, AuthMenu } from "../../components";

const Auth = () => {
  const [authPage, setAuthPage] = useState(0);
  const [detailsPage, setDetailsPage] = useState(false);
  return (
    <View style={styles.container}>
      {detailsPage ? (
        <AuthDetails authPage={authPage} setDetailsPage={setDetailsPage} />
      ) : (
        <AuthMenu
          authPage={authPage}
          setAuthPage={setAuthPage}
          setDetailsPage={setDetailsPage}
        />
      )}
    </View>
  );
};

export default Auth;

import { Suspense } from "react";
import NewPasswordPage from "../_components/NewPasswordPage";

const CreateNewPassword = () => {
  return (
    <Suspense>
      <NewPasswordPage />
    </Suspense>
  );
};

export default CreateNewPassword;

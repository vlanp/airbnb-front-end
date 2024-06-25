import SignForm from "../../components/SignForm";
import ESign from "../../enum/Sign";

const SignUp = () => {
  return <SignForm sign={ESign.SIGNUP} />;
};

export default SignUp;

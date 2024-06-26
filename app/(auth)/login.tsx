import SignForm from "../../components/SignForm";
import ESign from "../../enum/Sign";

const Login = () => {
  return <SignForm sign={ESign.SIGNIN} />;
};

export default Login;

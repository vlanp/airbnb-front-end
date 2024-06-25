import SignForm from "../../components/SignForm";
import Sign from "../../enum/Sign";

const Login = () => {
  return <SignForm sign={Sign.SIGNIN} />;
};

export default Login;

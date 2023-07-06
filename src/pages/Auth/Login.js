import "./Auth.css";

// components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }

    dispatch(login(user));
  };

  // clean auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h1>ORANGERIE</h1>
      <p>Faça login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email || ""} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
        {!loading && <input type="submit" value="ENTRAR" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  )
}

export default Login
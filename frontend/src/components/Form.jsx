import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom"; // Import Link here
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constents";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert("Вы скорее всего еще не зарегистрированы")
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Имя"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
            {/* Link for switching between login and register */}
            <p>
                {method === "login" ? (
                    <span>
                        Не имеете аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
                    </span>
                ) : (
                    <span>
                        У вас уже есть аккаунт? <Link to="/login">Войдите</Link>
                    </span>
                )}
            </p>
        </form>
    );
}

export default Form;

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import '../../static/css/auth.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../state/counter/loginSlice";

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

interface LoginFormInputs {
    username: string;
    password: string;
  }

export default function Auth() {

    const isLoggedOn = useSelector((state: RootState) => state.login.isLoggedOn);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginFormInputs>({
        resolver: yupResolver(validationSchema),
      });

    // const [login_info, setLoginInfo] = useState({userName: "", password: ""});

    useEffect(() => {
        if (isLoggedOn) {
          navigate('/characters'); 
        }
      }, [isLoggedOn, navigate]);

    
    const onSubmit = (data: LoginFormInputs) => {
        dispatch(login(data));
    };
    
    return (
        <div className="auth-card">
            <div className="auth-main">
            
                <div className="auth-text">
                <img src="https://pipedream.com/s.v0/app_mE7hlb/logo/orig" style={{width: '20vw', marginTop: '-70px', height: '20vh'}} alt="logo" />
                    <h1>Sign In</h1>
                    <hr />
                </div>
                
                <div className="form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            placeholder="Username"
                            {...register('username')}
                        />
                        {errors.username && <span className="error-message">{errors.username.message}</span>}
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password')}
                        />
                        {errors.password && <span className="error-message">{errors.password.message}</span>}
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
            
        </div>
    );
}
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import React from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import '../../static/css/auth.css';

// import { increment } from "../state/counter/counterSlice";
// import { decrement } from "../state/counter/counterSlice";
// import { incrementByAmount } from "../state/counter/counterSlice";

export default function Auth() {
    const count = useSelector((state: RootState) => state.login.isLoggedOn);
    const dispatch = useDispatch();
    return (
        // <MDBContainer className="my-5">
        //     <MDBRow>
        //         <MDBCol col='6' className="mb-5">
        //             <div className="d-flex flex-column ms-5">
        //                 <div className="text-center">
        //                 <img src="https://pipedream.com/s.v0/app_mE7hlb/logo/orig"
        //                     style={{width: '300px'}} alt="logo" />
        //                 <h4 className="mt-1 mb-5 pb-1">Star Wars API Browser</h4>
        //                 </div>
        //                 <p><b>Please log in to your account</b></p>
        //                 <MDBInput wrapperClass='mb-4' label='Login' id='form1' type='text' placeholder="abc@mail.com"  />
        //                 <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>
        //                 <div className="text-center pt-1 mb-5 pb-1">
        //                 <MDBBtn className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
        //                 </div>
        //             </div>
        //         </MDBCol>
        //     </MDBRow>
        // </MDBContainer>
        <div className="auth-card">
            <div className="auth-main">
            
                <div className="auth-text">
                <img src="https://pipedream.com/s.v0/app_mE7hlb/logo/orig" style={{width: '20vw', marginTop: '-70px', height: '20vh'}} alt="logo" />
                    <h1>Sign In</h1>
                    <hr />
                </div>
                
                <div className="form">
                    <form>
                        <input
                            type="text"
                            placeholder="Login"
                            
                        />
                        <input
                            type="password"
                            placeholder="Password"
                        />
                        <button>Login</button>
                    </form>
                </div>
            </div>
            
        </div>
    );
}
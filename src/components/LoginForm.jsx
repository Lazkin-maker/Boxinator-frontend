import keycloak from "../keycloak";
import Account from "../pages/Account/Account";
import { Navigate } from "react-router-dom";

function LoginForm() {
    return (
        <>
            <h1>Login Form</h1>
            {/* <section class="bg-blueGray-50">

                <div class="w-full lg:w-4/12 px-4 mx-auto pt-40">
                    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                        <div class="flex-auto px-4 lg:px-10 py-40 pt-2">
                            {!keycloak.authenticated ? (
                                <button class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button" onClick={() => { debugger; keycloak.login() }}>Login with registered account</button>
                            ) : (
                                <div>
                                    <Navigate to="/account" replace={true} />
                                    {localStorage.setItem('keycloakToken', keycloak.token)}
                                </div>
                            )}
                            {!keycloak.authenticated && (
                                <div>
                                    <hr class="mt-6 border-b-1 border-blueGray-300" />
                                    <div class="relative w-full mt-3">
                                        <span class="text-sm">Skip login and log in as </span><a class="text-violet-500 text-sm font-semibold" href="/account">Guest</a>
                                    </div>
                                    <hr class="mt-6 border-b-1 border-blueGray-300" />
                                    <div class="relative w-full mt-3">
                                        <span class="text-sm">Register as new User </span><a class="text-violet-500 text-sm font-semibold" href="/register">Register</a>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}

export default LoginForm
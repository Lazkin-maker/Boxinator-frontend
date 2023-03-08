
const LoginForm = () => {


    return (
        <>
            <section class="bg-blueGray-50">
                <div class="w-full lg:w-4/12 px-4 mx-auto pt-6">
                    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">            
                        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <section className="actions">
                                <div class="text-center mt-6">
                                    <button class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button"> Sign In as registered user </button>
                                </div>
                                <hr class="mt-6 border-b-1 border-blueGray-300" />
                                <div class="relative w-full mt-3">
                                    <span class="text-sm">Skip login and log in as </span><a class="text-blue-500 text-sm font-semibold" href="/account">Guest</a>
                                </div>

                            </section>
                        </div>
                    </div>
                    <div class="bg-blueGray-200 border-0 rounded-lg shadow-lg text-center w-80 py-4">
                        <span class="text-sm">Don't have an account?</span>
                        <a class="text-blue-500 text-sm font-semibold" href="/register">Sign up</a>
                    </div>
                </div>
                <footer class="relative pt-8 pb-6 mt-2">
                    <div class="container mx-auto px-2">
                        <div class="flex flex-wrap items-center md:justify-between justify-center">
                            <div class="w-full md:w-6/12 px-4 mx-auto text-center">
                                <div class="text-sm text-blueGray-500 font-semibold py-1">
                                    Made with <a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" class="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
        </>
    )
}

export default LoginForm
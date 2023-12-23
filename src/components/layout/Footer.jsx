function Footer() {
    return (   
    <>
    <div className="mt-3">
    <footer className="text-center text-lg-start text-white bg-dark">
        <div className="container p-4 pb-0">
        <section className="">
            <div className="row">
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="mb-4 font-weight-bold">ALUMNO: Santiago Risso</h6>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold"><a href="https://fakeapi.platzi.com/" 
                className="link-light link-opacity-50-hover link-underline-opacity-50-hover link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Platzi Fake Store API</a></h6>

            </div>
            </div>
        </section>
        </div>
        <div className="text-center p-3 bg-black">
        © 2023 Informatorio
        </div>
    </footer>
    </div>

        </>
      );
}

export default Footer;
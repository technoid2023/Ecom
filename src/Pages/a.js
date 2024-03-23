<MDBContainer className="my-5">

<Toaster
                position="top-center"
                reverseOrder={false}
                />
        <form onSubmit={userSubmit}>
      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Technoid</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                <MDBInput wrapperClass='mb-4' label='Email address' name='email' type='email' onChange={handleInput} size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Password' name='password' type='password' onChange={handleInput} size="lg"/>

              <MDBBtn className="mb-4 px-5" color='dark' type="submit" size='lg'>Login</MDBBtn>
              <Link className="small text-muted" to="/reset-password">Forgot password?</Link>
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <Link to="/register" style={{color: '#393f81'}}>Register here</Link></p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>
      </form>
    </MDBContainer>
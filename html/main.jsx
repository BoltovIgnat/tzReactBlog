var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;

class Signin extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.state = {
          email:'',
          password:''
        };
    }

    handleEmailChange(e){
        this.setState({email:e.target.value})
    }

    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }

    signIn(){
        axios.post('/signin', {
            email: this.state.email,
            password: this.state.password
          })
          .then(function (response) {
            if(response.data == 'Збс'){
                window.location.assign('http://localhost:7777/home')
            }
          })
          .catch(function (error) {
            console.log(error);
          });            
    }

    render() {
        return (
        <div>
            <form className="form-signin">
                <h2 className="form-signin-heading"> 
                    Вход в систему
                </h2>
                <label for="inputEmail" className="sr-only"> 
                    Email адрес
                </label>
                <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email адрес" required autofocus />
                
                <label for="inputPassword" className="sr-only"> Пароль</label>
                <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Пароль" required />
                
                <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn} type="button">
                    Вход в систему
                </button>
            </form>
            <div>
                <Link to="/signup">{'Зарегистрироватся'}</Link>
            </div>    
        </div>
        )
    }
}

class Signup extends React.Component{
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signUp = this.signUp.bind(this);
        
        this.state = {
            name:'',
            email:'',
            password:''
        };
    }

    signUp(){
        
        axios.post('/signup', {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }    

    handleNameChange(e){
        this.setState({name:e.target.value})
    }
    handleEmailChange(e){
        this.setState({email:e.target.value})
    }   
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }

    render() {
        return (
          <div>
            <form className="form-signin">
              <h2 className="form-signin-heading">Регистрация</h2>
              <label for="inputName" className="sr-only">Имя</label>
              <input type="name" onChange={this.handleNameChange} id="inputName" className="form-control" placeholder="Имя" required autofocus />
              <label for="inputEmail" className="sr-only">Email адрес</label>
              <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email адрес" required autofocus />
              <label for="inputPassword" className="sr-only">Пароль</label>
              <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Пароль" required />
               
              <button className="btn btn-lg btn-primary btn-block" onClick={this.signUp} type="button">Зарегистрироватся</button>
            </form>
            <div>
                <Link to="/">{'Страница входа'}</Link>
            </div>
          </div>
           
        )
      }
  }

ReactDOM.render( 
    <Router history={hashHistory}>
        <Route component={Signin} path="/"></Route>
        <Route component={Signup} path="/signup"></Route>
    </Router>,
    document.getElementById('app')
);
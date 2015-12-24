import React from "react";
import Router from "react-router";
import GameHome from "./lib/components/home";
import Levels from "./lib/components/levels";

var {Route, Link, State, RouteHandler, Redirect} = Router;

class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var _pathname = this.props.state.replace('/', '');
	    return (
	      	<div>
				<header>
					<div className="header">
					  	<h1>Memory Game</h1>
					</div>
					<Levels path={_pathname}/>
				</header>
		        <main className="main">
		          	<RouteHandler path={_pathname} />
		        </main>
		        <footer>
		        	<div className="footer">
		        		@2015-2016
		        	</div>
		        </footer>
	      	</div>
	    )
	}
}

var routes = (
  <Route handler={App}>
	<Route name="level1" pathname="1" path="/level1" handler={GameHome}/>
	<Route name="level2" path="/level2" handler={GameHome}/>
	<Route name="level3" path="/level3" handler={GameHome}/>
	<Redirect from="/" to="/level1" />
  </Route>
);

Router.run(routes, function (Handler, state) {
	React.render(<Handler state={state.pathname} />, document.getElementById('container'));
});
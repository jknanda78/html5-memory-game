import React from "react";

class Levels extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		switch(e.target.name) {
			case "level1":
					this.context.router.transitionTo('/level1');
				break;
			case "level2":
					this.context.router.transitionTo('/level2');
				break;
			case "level3":
					this.context.router.transitionTo('/level3');
				break;
			case "restart":
					this.context.router.refresh();
				break;
		}
	}

	render() {
		return (
			<nav className="levels">
				<ul>
					<li className={(this.props.path === 'level1') ? 'selected':''}><input type="button" name="level1" value="Easy" onClick={this.handleClick} /></li>
					<li className={(this.props.path === 'level2') ? 'selected':''}><input type="button" name="level2" value="Medium" onClick={this.handleClick} /></li>
					<li className={(this.props.path === 'level3') ? 'selected':''}><input type="button" name="level3" value="Hard" onClick={this.handleClick} /></li>
					<li className={(this.props.path === '') ? 'selected':''}><input type="button" name="restart" value="Start Over" onClick={this.handleClick} /></li>
				</ul>
			</nav>
		)
	}
}

Levels.contextTypes = {
	router: React.PropTypes.func.isRequired
}

export default Levels;
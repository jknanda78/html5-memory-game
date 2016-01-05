import React from "react";
import Game from "./game";

class GameHome extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			row: 0,
			col: 0,
			level: 0
		};
	}

	updateRowCol(path) {
		let _row = 0, _col = 0, _level = 0,
			_path = path || this.context.router.getCurrentPath().replace("/", "");
		switch(_path) {
		case "level1":
			_col = 4;
			_row = 2;
			_level = 1;
			break;
		case "level2":
			_col = 5;
			_row = 4;
			_level = 2;
			break;
		case "level3":
			_col = 6;
			_row = 5;
			_level = 3;
			break;
		default:
			break;
		}

		this.setState({
			row: _row,
			col: _col,
			level: _level
		});
	}

	componentWillMount() {
		this.updateRowCol();
	}

	componentWillReceiveProps(nextProps) {
		this.updateRowCol(nextProps.path);
	}

	render() {
		return (
			<section className={`home level${this.state.level}`}>
				<Game row={this.state.row} col={this.state.col} level={this.state.level}/>
			</section>
		);
	}
}

GameHome.contextTypes = {
	router: React.PropTypes.func.isRequired
};

export default GameHome;

import React from "react";
import Tag from "./tag";

const BASEANGLE = Math.PI / 360;

export default class TagCloud extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			speed: this.props.speed || 1,
			R: props.radius || 200,
			angleX: (props.speed || 1) * BASEANGLE,
			angleY: (props.speed || 1) * BASEANGLE,
			tags: [],
			timer: "",
			colors: []，
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tagName.id != this.props.tagName.id) {
			const animation = () => {
				this.rotateX();
				this.rotateY();
				requestAnimationFrame(animation);
			};

			requestAnimationFrame(() => {
				animation();
			});

			this.move(nextProps.tagName);
		}
	}

	componentDidMount() {
		document.addEventListener("mousemove", e => {
			const angleX =
				2 *
				(e.clientX / document.body.getBoundingClientRect().width -
					0.5) *
				this.state.speed *
				BASEANGLE;
			const angleY =
				2 *
				(e.clientY / document.body.getBoundingClientRect().height -
					0.5) *
				this.state.speed *
				BASEANGLE;
			this.setState({
				angleX,
				angleY
			});
		});

		if (this.props.tagName.length === 0) {
			return;
		}

		console.log(22);
		const animation = () => {
			this.rotateX();
			this.rotateY();
			requestAnimationFrame(animation);
		};

		requestAnimationFrame(() => {
			animation();
		});

		this.move(this.props.tagName);
	}

	// handleMouseover(e) {
	// 	const angleY = 2 * (e.clientX / document.body.getBoundingClientRect().width - 0.5) * speed * BASEANGLE;
	// 	const angleX = 2 * (e.clientY / document.body.getBoundingClientRect().height - 0.5) * speed * BASEANGLE;
	// 	this.setState({ angleX, angleY })
	// }

	// handleMouseout() {
	// 	const angleX = this.state.speed * BASEANGLE
	// 	const angleY = this.state.speed * BASEANGLE
	// 	this.setState({ angleX, angleY })
	// }

	move(tagName) {
		const len = tagName.length;

		const tags = tagName.map((tag, i) => {
			const angleA = Math.acos((2 * (i + 1) - 1) / len - 1);
			const angleB = angleA * Math.sqrt(len * Math.PI);

			const z = this.state.R * Math.cos(angleA);
			const y = this.state.R * Math.sin(angleA) * Math.sin(angleB);
			const x = this.state.R * Math.sin(angleA) * Math.cos(angleB);
			const colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#D47F00', '#00FFFF', '#D4FF55', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#7FBF55',
			'#a5c2d5', '#cbab4f', '#76a871', '#a56f8f', '#c12c44', '#9f7961', '#76a871', '#6f83a5', '0f4fb8', '106dcf', '#b3d74c', '#74aae3', '#5cdec6', '#3526de', '#9d65ee', '#a8b3e3', '#6bc1b7', '549ee2', '#6e98d6']

			const num = Math.floor(Math.random()*50);
			var tagProps = {
				x: x,
				y: y,
				z: z,
				tag: tag,
				color: colors[num],
			};

			return tagProps;
		});

		this.setState({ tags: tags });
	}

	rotateX() {
		let cos = Math.cos(this.state.angleX),
			sin = Math.sin(this.state.angleX);

		const tags = this.state.tags.map(tag => {
			let y = tag.y * cos - tag.z * sin;
			let z = tag.z * cos + tag.y * sin;
			tag.y = y;
			tag.z = z;

			return tag;
		});

		this.setState({ tags: tags });
	}

	rotateY() {
		let cos = Math.cos(this.state.angleY);
		let sin = Math.sin(this.state.angleY);

		const tags = this.state.tags.map(tag => {
			let x = tag.x * cos - tag.z * sin;
			let z = tag.z * cos + tag.x * sin;
			tag.x = x;
			tag.z = z;

			return tag;
		});

		this.setState({ tags: tags });
	}

	render() {
		const containerStyle = {
			width: "100%",
			heght: "100%",
			userSelect: "none"
		};

		const wrapperStyle = {
			position: "relative",
			left: "20%",
			top: "100px"
		};

		return (
			<div className="tag-cloud-container" style={containerStyle}>
				<div className="cloudwrapper" style={wrapperStyle}>
					{this.state.tags.map((tag, index) => {
						return (
							<Tag
								key={index}
								{...tag}
								onClick={this.props.onClick}
							>
								{" "}
							</Tag>
						);
					})}
				</div>
			</div>
		);
	}
}

import { useState } from "react";
import "./ParticleButton.css";

const particles = [
	{ x: -45, y: -30, rotate: -125 },
	{ x: -15, y: -55, rotate: -105 },
	{ x: 20, y: -50, rotate: -70 },
	{ x: 50, y: -25, rotate: -30 },
	{ x: 60, y: 10, rotate: 10 },
	{ x: 35, y: 45, rotate: 50 },
	{ x: 0, y: 60, rotate: 90 },
	{ x: -35, y: 45, rotate: 130 },
	{ x: -55, y: 15, rotate: 170 },
];

export const ParticleButton = () => {
	const [explosionId, setExplosionId] = useState(0);

	const handleClick = () => {
		setExplosionId((current) => current + 1);
	};

	return (
		<div className="particleButtonWrapper">
			<button className="particleButton" onClick={handleClick}>
				Add day
			</button>

			<div key={explosionId} className="particleExplosion">
				{particles.map((particle, index) => (
					<span
						key={index}
						className="particle"
						style={
							{
								"--particle-x": `${particle.x}px`,
								"--particle-y": `${particle.y}px`,
								"--particle-rotation": `${particle.rotate}deg`,
								"--particle-delay": `${index * 10}ms`,
							} as React.CSSProperties
						}
					/>
				))}
			</div>
		</div>
	);
};

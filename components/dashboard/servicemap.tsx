"use client";

import { useEffect, useRef } from "react";

export function ServiceMap() {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!mapRef.current) return;

		// This is a placeholder for an actual map implementation
		// In a real application, you would use a library like Mapbox, Google Maps, or Leaflet
		const canvas = document.createElement("canvas");
		canvas.width = mapRef.current.clientWidth;
		canvas.height = mapRef.current.clientHeight;
		mapRef.current.appendChild(canvas);

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Draw a simple placeholder map
		ctx.fillStyle = "#f3f4f6";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw some "roads"
		ctx.strokeStyle = "#d1d5db";
		ctx.lineWidth = 2;

		// Horizontal roads
		for (let y = 50; y < canvas.height; y += 80) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(canvas.width, y);
			ctx.stroke();
		}

		// Vertical roads
		for (let x = 50; x < canvas.width; x += 80) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvas.height);
			ctx.stroke();
		}

		// Draw service hotspots
		const hotspots = [
			{
				x: canvas.width * 0.2,
				y: canvas.height * 0.3,
				size: 30,
				color: "#ef4444",
			}, // High demand (red)
			{
				x: canvas.width * 0.5,
				y: canvas.height * 0.2,
				size: 25,
				color: "#f59e0b",
			}, // Medium demand (yellow)
			{
				x: canvas.width * 0.8,
				y: canvas.height * 0.4,
				size: 20,
				color: "#10b981",
			}, // Low demand (green)
			{
				x: canvas.width * 0.3,
				y: canvas.height * 0.7,
				size: 28,
				color: "#ef4444",
			}, // High demand (red)
			{
				x: canvas.width * 0.7,
				y: canvas.height * 0.6,
				size: 22,
				color: "#f59e0b",
			}, // Medium demand (yellow)
		];

		hotspots.forEach((spot) => {
			ctx.beginPath();
			ctx.arc(spot.x, spot.y, spot.size, 0, Math.PI * 2);
			ctx.fillStyle = spot.color + "40"; // Add transparency
			ctx.fill();
			ctx.strokeStyle = spot.color;
			ctx.lineWidth = 2;
			ctx.stroke();
		});

		// Draw some technician locations
		const technicians = [
			{ x: canvas.width * 0.25, y: canvas.height * 0.35 },
			{ x: canvas.width * 0.45, y: canvas.height * 0.25 },
			{ x: canvas.width * 0.75, y: canvas.height * 0.45 },
			{ x: canvas.width * 0.35, y: canvas.height * 0.65 },
			{ x: canvas.width * 0.65, y: canvas.height * 0.55 },
		];

		technicians.forEach((tech) => {
			ctx.beginPath();
			ctx.arc(tech.x, tech.y, 6, 0, Math.PI * 2);
			ctx.fillStyle = "#3b82f6";
			ctx.fill();
			ctx.strokeStyle = "#ffffff";
			ctx.lineWidth = 2;
			ctx.stroke();
		});

		// Add a simple legend
		ctx.fillStyle = "#1f2937";
		ctx.font = "12px sans-serif";
		ctx.fillText("City Map - Service Requests", 10, 20);

		return () => {
			if (mapRef.current && canvas.parentNode === mapRef.current) {
				mapRef.current.removeChild(canvas);
			}
		};
	}, []);

	return (
		<div ref={mapRef} className="h-full w-full overflow-hidden rounded-md">
			{/* Map will be rendered here */}
		</div>
	);
}

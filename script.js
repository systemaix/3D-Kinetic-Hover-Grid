const grid = document.getElementById('grid');
const tileCount = 150; // Total tiles

// 1. Generate the grid tiles
for (let i = 0; i < tileCount; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    grid.appendChild(tile);
}

const tiles = document.querySelectorAll('.tile');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;

    tiles.forEach(tile => {
        const rect = tile.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 2. Proximity Math
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 3. Transformation Logic
        // The closer the mouse, the higher the tile lifts (Max 100px)
        const maxDist = 300;
        const proximity = Math.max(0, maxDist - distance) / maxDist;
        const transformZ = proximity * 80;
        const rotate = proximity * 25;

        tile.style.transform = `translateZ(${transformZ}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
        
        // 4. Color Feedback
        tile.style.backgroundColor = proximity > 0.5 ? 'var(--accent)' : 'var(--tile-color)';
        tile.style.boxShadow = proximity > 0.5 ? `0 0 20px var(--accent)` : 'none';
    });
});

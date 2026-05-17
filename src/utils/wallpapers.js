// src/utils/wallpapers.js
const modules = import.meta.glob('../assets/wallpapers/*', {
  eager: true,
  query: '?url',
  import: 'default'
});

export const wallpapers = Object.entries(modules).map(([path, url], index) => ({
  id: index + 1,
  src: url,
  thumb: url,
  name: path.split('/').pop().replace(/\.[^.]+$/, ''),
}));

export const defaultWallpaper = wallpapers[0].src; 
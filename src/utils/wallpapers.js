const modules = import.meta.glob('/public/wallpapers/*',{eager: true,query: '?url', import: 'default'});

export const wallpapers = Object.entries(modules).map(([path,url],index)=>({
    id:index+1,
    src:url,
    thumb:url,
    name: path.split('/').pop().replace(/\.[^.]+$/, ''),
}));